import type { Rive, ViewModelInstance } from "@rive-app/webgl2";
import {
  ARTBOARD,
  POKE_RADIUS_RATIO,
  ballGeometry,
  type OrbInputs,
  type OrbTheme,
} from "./contract";

/**
 * wasm 从自己的域名取，不碰 CDN（spec 003 验收 4）。两份文件由 scripts/sync-rive-wasm.mjs
 * 从 node_modules 复制到 public/rive/，随 predev、prebuild 与 pretest:orb 重出，不入库。
 */
export const WASM_URL = "/rive/rive.wasm";
export const WASM_FALLBACK_URL = "/rive/rive_fallback.wasm";

export interface OrbHostOptions {
  canvas: HTMLCanvasElement;
  /** .riv 的地址，带版本号做缓存键：固定地址会让浏览器在签名文件换代后照放旧文件。 */
  src: string;
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
   * 按需加载运行时：452 KB 的 JS 与 2.2 MB 的 wasm 都不进首屏 bundle，进视口才取。
   * 装好文件、绑好 view model、写完开场输入后才返回；文件里没有可绑定的实例也算失败。
   */
  static async mount(options: OrbHostOptions): Promise<OrbHost> {
    const runtime = await import("@rive-app/webgl2");
    runtime.RuntimeLoader.setWasmUrl(WASM_URL);
    runtime.RuntimeLoader.setWasmFallbackUrl(WASM_FALLBACK_URL);
    return new Promise<OrbHost>((resolve, reject) => {
      const rive = new runtime.Rive({
        src: options.src,
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
          if (!vm) {
            rive.cleanup();
            reject(new Error("Orb view model is missing"));
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
    return this.vm.boolean("isReacting")?.value === true;
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

  /** 戳一下。忙碌与 0.4 秒冷却都由文件裁决，这里只 fire。 */
  poke(): boolean {
    const trigger = this.vm.trigger("poke");
    if (!trigger) return false;
    trigger.trigger();
    return true;
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
        const property = this.vm.boolean(key);
        if (property) property.value = value;
      } else if (typeof value === "number") {
        const property = this.vm.number(key);
        if (property) property.value = value;
      } else {
        const property = this.vm.enum(key);
        if (property) property.value = value;
      }
    }
  }
}

function clamp(value: number): number {
  return Math.max(-1, Math.min(1, value));
}
