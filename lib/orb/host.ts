import type { Rive, ViewModelInstance } from "@rive-app/webgl2";
import runtimePackage from "@rive-app/webgl2/package.json";
import manifest from "../../public/brand/orb-source.json";
import {
  ARTBOARD,
  POKE_RADIUS_RATIO,
  VIEW_MODEL_PROPERTIES,
  ballGeometry,
  type OrbInputs,
  type OrbTheme,
} from "./contract";

/**
 * wasm 从自己的域名取，不碰 CDN（spec 003 验收 4）。两份文件由 scripts/sync-rive-wasm.mjs
 * 从 node_modules 复制到 public/rive/，随 predev、prebuild 与 pretest:orb 重出，不入库。
 *
 * 三份文件都带版本号做缓存键，public/_headers 给它们一年的 immutable：wasm 跟运行时的版本，
 * .riv 跟签名文件的版本，换代即换网址。
 */
const WASM_URL = `/rive/rive.wasm?v=${runtimePackage.version}`;
const WASM_FALLBACK_URL = `/rive/rive_fallback.wasm?v=${runtimePackage.version}`;
const RIVE_SRC = `/brand/hachimi-orb.riv?v=${manifest.version}`;

/** 算作“人来了”的输入：指针、触摸、滚轮、滚动与按键。 */
const ENGAGE_EVENTS = [
  "pointerdown",
  "pointermove",
  "touchstart",
  "wheel",
  "scroll",
  "keydown",
] as const;

/**
 * 页面 load 之后、且访客动过一次（指针、触摸、滚轮、滚动或按键）才跑。load 之前就动过的，
 * load 一到就跑。球的运行时、wasm 与 .riv 合计一兆多，装好后每帧还要在主线程上走十几毫秒，
 * 访客没动之前由静帧顶着，首屏的截图、字体与水合脚本不跟它抢带宽与主线程。返回取消函数。
 */
export function afterLoadAndEngage(callback: () => void): () => void {
  let loaded = document.readyState === "complete";
  let engaged = false;
  let done = false;
  const detach = (): void => {
    window.removeEventListener("load", onLoad);
    for (const type of ENGAGE_EVENTS) {
      window.removeEventListener(type, onEngage, true);
    }
  };
  const maybeRun = (): void => {
    if (done || !loaded || !engaged) return;
    done = true;
    detach();
    callback();
  };
  function onLoad(): void {
    loaded = true;
    maybeRun();
  }
  function onEngage(): void {
    engaged = true;
    maybeRun();
  }
  if (!loaded) window.addEventListener("load", onLoad, { once: true });
  for (const type of ENGAGE_EVENTS) {
    window.addEventListener(type, onEngage, { capture: true, passive: true });
  }
  return () => {
    done = true;
    detach();
  };
}

export interface OrbHostOptions {
  canvas: HTMLCanvasElement;
  inputs: OrbInputs;
}

type Writable = Record<string, string | number | boolean>;

/**
 * 一台 Rive 宿主，只做契约里的三件事：写输入、读输出、播放。
 *
 * 交互期间同一个实例、同一个 view model，只 fire trigger；不为点击重建实例，
 * 当前姿态与速度由文件内部持有。忙闲读 isReacting，宿主不自己计时。
 */
export class OrbHost {
  private constructor(
    private readonly rive: Rive,
    private readonly vm: ViewModelInstance,
    private readonly canvas: HTMLCanvasElement
  ) {}

  /**
   * 按需加载运行时：452 KB 的 JS 与 2.2 MB 的 wasm 都不进首屏 bundle，页面 load 之后、访客动过一次且进了视口才取。
   * 装好文件、绑好 view model、写完开场输入后才返回。文件里没有可绑定的实例，或缺了
   * VIEW_MODEL_PROPERTIES 里的任何一个属性，都算失败，错误里带缺的属性名。
   */
  static async mount(options: OrbHostOptions): Promise<OrbHost> {
    const runtime = await import("@rive-app/webgl2");
    runtime.RuntimeLoader.setWasmUrl(WASM_URL);
    runtime.RuntimeLoader.setWasmFallbackUrl(WASM_FALLBACK_URL);
    return new Promise<OrbHost>((resolve, reject) => {
      const rive = new runtime.Rive({
        src: RIVE_SRC,
        canvas: options.canvas,
        artboard: ARTBOARD.name,
        stateMachine: ARTBOARD.stateMachine,
        autoBind: true,
        autoplay: false,
        layout: new runtime.Layout({
          fit: runtime.Fit.Contain,
          alignment: runtime.Alignment.Center,
        }),
        onLoad: () => {
          const vm = rive.viewModelInstance;
          const missing = vm ? missingProperties(vm) : ["instance"];
          if (!vm || missing.length > 0) {
            rive.cleanup();
            reject(
              new Error(`Orb view model is missing ${missing.join(", ")}`)
            );
            return;
          }
          rive.resizeDrawingSurfaceToCanvas();
          const host = new OrbHost(rive, vm, options.canvas);
          host.write({
            ...options.inputs,
            background: false,
            corner: false,
            reaction: "none",
            pointerActive: false,
          });
          resolve(host);
        },
        onLoadError: (event) => {
          reject(new Error(String(event.data ?? "Orb runtime failed to load")));
        },
      });
    });
  }

  /** 正在表演或等飘带散尽。文件说了算，宿主不猜。 */
  get busy(): boolean {
    return required(this.vm.boolean("isReacting"), "isReacting").value;
  }

  /** 指针落在页面坐标 (x, y)。按当前球半径换算成球心为 0 的 -1 到 1，超出球外钳位。 */
  track(x: number, y: number): void {
    const ball = ballGeometry(this.canvas.getBoundingClientRect());
    this.write({
      pointerX: clamp((x - ball.x) / ball.radius),
      pointerY: clamp((y - ball.y) / ball.radius),
      pointerActive: true,
    });
  }

  /** 站点换了明暗。文件自己做 200 毫秒交叉淡入，不重建实例。 */
  theme(theme: OrbTheme): void {
    this.write({ theme });
  }

  /** 手指或鼠标离场，眼睛自己收回去。 */
  release(): void {
    this.write({ pointerActive: false });
  }

  /** 页面坐标 (x, y) 在不在命中圆里。命中判定归宿主，文件不负责点击区域。 */
  hits(x: number, y: number): boolean {
    const ball = ballGeometry(this.canvas.getBoundingClientRect());
    const reach = ball.radius * 2 * POKE_RADIUS_RATIO;
    return Math.hypot(x - ball.x, y - ball.y) <= reach;
  }

  /** 戳一下。受不受理由文件裁决（忙时拒收），宿主不计时、不冷却，这里只 fire。 */
  poke(): void {
    required(this.vm.trigger("poke"), "poke").trigger();
  }

  play(): void {
    this.rive.play();
  }

  pause(): void {
    this.rive.pause();
  }

  /** CSS 尺寸或像素比变了，重设绘制面，不然高分屏上发糊。 */
  resize(): void {
    this.rive.resizeDrawingSurfaceToCanvas();
  }

  dispose(): void {
    this.rive.cleanup();
  }

  private write(values: Writable): void {
    for (const [key, value] of Object.entries(values)) {
      if (typeof value === "boolean") {
        required(this.vm.boolean(key), key).value = value;
      } else if (typeof value === "number") {
        required(this.vm.number(key), key).value = value;
      } else {
        required(this.vm.enum(key), key).value = value;
      }
    }
  }
}

type PropertyKind = keyof typeof VIEW_MODEL_PROPERTIES;

function lookup(vm: ViewModelInstance, kind: PropertyKind, name: string) {
  switch (kind) {
    case "boolean":
      return vm.boolean(name);
    case "number":
      return vm.number(name);
    case "enum":
      return vm.enum(name);
    case "trigger":
      return vm.trigger(name);
  }
}

function missingProperties(vm: ViewModelInstance): string[] {
  return (Object.keys(VIEW_MODEL_PROPERTIES) as PropertyKind[]).flatMap(
    (kind) =>
      VIEW_MODEL_PROPERTIES[kind].filter((name) => !lookup(vm, kind, name))
  );
}

/** 装文件时已核过全表，这里取不到说明调用方用了表外的名字。 */
function required<T>(property: T | null, name: string): T {
  if (property === null) {
    throw new Error(`Orb view model is missing ${name}`);
  }
  return property;
}

function clamp(value: number): number {
  return Math.max(-1, Math.min(1, value));
}
