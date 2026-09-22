"use client";

import { Mesh, Program, Renderer, Triangle } from "ogl";
import { useTheme } from "next-themes";
import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/motion";
import { observeVisibility } from "@/lib/visibility";
import {
  SHADER_PALETTES,
  type RGB,
  type ShaderPaletteName,
  type ShaderTone,
} from "@/lib/shader-palettes";

const VERT = `
attribute vec2 position;
varying vec2 v;
void main(){
  v = position;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;
varying vec2 v;
uniform float t;
uniform vec2 r;
uniform vec2 c;
uniform float ci;

uniform vec3 u_pal_base;
uniform vec3 u_pal_warm;
uniform vec3 u_pal_mid;
uniform vec3 u_pal_cool;
uniform vec3 u_pal_cursor;
uniform vec3 u_pal_rgScale;
uniform float u_brightness;

float h(vec2 p){
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float n(vec2 u){
  vec2 i = floor(u);
  vec2 f = fract(u);
  f = f*f*(3.0 - 2.0*f);
  float a = h(i);
  float b = h(i + vec2(1.0, 0.0));
  float c = h(i + vec2(0.0, 1.0));
  float d = h(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float m(vec2 u){
  return (n(u)*0.5 + n(u*2.0)*0.25) * 1.06667;
}

void main(){
  vec2 uv = (v * 0.5 + 0.5) * r / r.x;

  vec2 cn = c / r.x;
  vec2 toC = uv - cn;
  float dC = length(toC);
  float fall = exp(-dC * 9.0) * ci;

  vec2 sh = vec2(
    n(uv * 6.0 + vec2(t * 0.9,  0.0)),
    n(uv * 6.0 + vec2(0.0, t * 1.1))
  ) - 0.5;
  vec2 disp = sh * fall * 0.55;

  uv = uv * 5.0 + disp * 5.0;

  vec2 d1 = vec2( 0.18,  0.07) * t;
  vec2 d2 = vec2(-0.13,  0.21) * t;
  vec2 d3 = vec2( 0.09, -0.16) * t;

  float a = m(uv + d1);
  vec3 col = mix(u_pal_base, u_pal_warm, a * 2.5);

  float b = m(uv + a * 2.4 + d2);
  col = mix(col, u_pal_mid, b * 1.5);

  float dd = m(uv + b * 3.5 + d3);
  col = mix(col, u_pal_cool, dd);

  col += u_pal_cursor * fall;

  col *= u_pal_rgScale;
  gl_FragColor = vec4(col * u_brightness, 1.0);
}
`;

/** 设备像素比上限。再高只烧 GPU，噪声本身看不出分辨率。 */
const DPR_CAP = 1.5;
/** 60 fps 节流。高刷屏上白画的帧对这种慢噪声没有增益。 */
const FRAME_MS = 1000 / 60;
/** 减弱动态时定格在这一秒的画面，比 t=0 的种子图好看。 */
const STILL_TIME = 6;
/** 明暗切换的插值时长，逐帧走完，不重建 context，所以不会白闪。 */
const THEME_FADE_MS = 320;

type ShaderMode = "light" | "dark";

interface Props {
  /** 取哪一套调色板，见 lib/shader-palettes.ts */
  palette: ShaderPaletteName;
  className?: string;
  /** 渲染分辨率相对 CSS 像素的比例，掉帧时压到 0.5 */
  resScale?: number;
}

function lerp3(out: number[], a: RGB, b: RGB, k: number): void {
  out[0] = a[0] + (b[0] - a[0]) * k;
  out[1] = a[1] + (b[1] - a[1]) * k;
  out[2] = a[2] + (b[2] - a[2]) * k;
}

function easeInOut(k: number): number {
  return k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
}

/**
 * 全屏光束 shader。首屏与收尾共用这一个组件，差别只在 palette。
 *
 * 帧预算上的四道闸：DPR 封顶 1.5、60 fps 节流、离开视口或页面转后台即停 rAF、
 * 开了减弱动态只画一帧。明暗跟 next-themes 的 resolvedTheme 走，切换时在同一个
 * WebGL context 里把 uniform 逐帧插过去，不销毁重建，所以中间没有白闪。
 *
 * 光标只在指针设备（pointer: fine）上接：触屏没有悬停态，pointermove 只会在点击
 * 时炸一下，接了反而是噪声。
 */
export function ShaderCanvas({
  palette,
  className,
  resScale = 1,
}: Props): ReactNode {
  const hostRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const applyToneRef = useRef<((tone: ShaderTone) => void) | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const tones = SHADER_PALETTES[palette];
    // 首帧的明暗从 html 的类名读，不等 next-themes 的 resolvedTheme：它在挂载后
    // 才有值，而阻塞脚本早就把类名写好了，读类名才不会先画错一版再改过来。
    const initialMode: ShaderMode = document.documentElement.classList.contains(
      "dark"
    )
      ? "dark"
      : "light";

    const uniforms = {
      t: { value: 0 },
      r: { value: [1, 1] as number[] },
      c: { value: [0, 0] as number[] },
      ci: { value: 0 },
      u_pal_base: { value: [0, 0, 0] as number[] },
      u_pal_warm: { value: [0, 0, 0] as number[] },
      u_pal_mid: { value: [0, 0, 0] as number[] },
      u_pal_cool: { value: [0, 0, 0] as number[] },
      u_pal_cursor: { value: [0, 0, 0] as number[] },
      u_pal_rgScale: { value: [1, 1, 1] as number[] },
      u_brightness: { value: 1 },
    };

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        premultipliedAlpha: false,
        powerPreference: "high-performance",
        dpr: 1,
      });
    } catch {
      // 拿不到 WebGL context：什么都不挂，由父组件的静态兜底顶住。
      return;
    }

    const gl = renderer.gl;
    const canvas = gl.canvas;
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.display = "block";
    host.appendChild(canvas);

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      depthTest: false,
      depthWrite: false,
      cullFace: false,
      uniforms,
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    renderer.dpr =
      Math.min(window.devicePixelRatio || 1, DPR_CAP) *
      Math.min(Math.max(resScale, 0.25), 1);

    // ---- 调色板：当前值、目标值与两者之间的插值 ----
    let fromTone: ShaderTone = tones[initialMode];
    let toTone: ShaderTone = fromTone;
    let fadeFrom = 0;
    let fading = false;

    const writeTone = (a: ShaderTone, b: ShaderTone, k: number): void => {
      lerp3(uniforms.u_pal_base.value, a.base, b.base, k);
      lerp3(uniforms.u_pal_warm.value, a.warm, b.warm, k);
      lerp3(uniforms.u_pal_mid.value, a.mid, b.mid, k);
      lerp3(uniforms.u_pal_cool.value, a.cool, b.cool, k);
      lerp3(uniforms.u_pal_cursor.value, a.cursor, b.cursor, k);
      lerp3(uniforms.u_pal_rgScale.value, a.rgScale, b.rgScale, k);
      uniforms.u_brightness.value =
        a.brightness + (b.brightness - a.brightness) * k;
    };

    const readVec = (v: number[]): RGB => [v[0] ?? 0, v[1] ?? 0, v[2] ?? 0];
    const snapshotTone = (): ShaderTone => ({
      base: readVec(uniforms.u_pal_base.value),
      warm: readVec(uniforms.u_pal_warm.value),
      mid: readVec(uniforms.u_pal_mid.value),
      cool: readVec(uniforms.u_pal_cool.value),
      cursor: readVec(uniforms.u_pal_cursor.value),
      rgScale: readVec(uniforms.u_pal_rgScale.value),
      brightness: uniforms.u_brightness.value,
    });

    writeTone(fromTone, fromTone, 1);

    // ---- 渲染循环 ----
    let raf = 0;
    let running = false;
    let last = 0;
    let elapsed = reducedMotion ? STILL_TIME : 0;

    const target: [number, number] = [0, 0];
    const current: [number, number] = [0, 0];
    let targetCi = 0;
    let currentCi = 0;

    const draw = (): void => {
      uniforms.t.value = elapsed;
      renderer.render({ scene: mesh });
    };

    const loop = (): void => {
      raf = requestAnimationFrame(loop);
      const now = performance.now();
      const dt = now - last;
      if (dt < FRAME_MS - 1) return;
      const step = dt - (dt % FRAME_MS);
      last = now - (dt % FRAME_MS);
      elapsed += step * 0.001;

      // 光标位置与强度各自平滑追随，强度慢一档，进出时不会一跳。
      const k = 1 - Math.pow(1 - 0.12, step / FRAME_MS);
      current[0] += (target[0] - current[0]) * k;
      current[1] += (target[1] - current[1]) * k;
      const ki = 1 - Math.pow(1 - 0.06, step / FRAME_MS);
      currentCi += (targetCi - currentCi) * ki;
      uniforms.c.value[0] = current[0];
      uniforms.c.value[1] = current[1];
      uniforms.ci.value = currentCi;

      if (fading) {
        const p = Math.min(1, (now - fadeFrom) / THEME_FADE_MS);
        writeTone(fromTone, toTone, easeInOut(p));
        if (p >= 1) {
          fading = false;
          fromTone = toTone;
        }
      }

      draw();
    };

    const start = (): void => {
      if (running || reducedMotion) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };

    const stop = (): void => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    // ---- 尺寸 ----
    let resizeRaf = 0;
    let lastW = 0;
    let lastH = 0;
    const resize = (): void => {
      const rect = host.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      if (w === lastW && h === lastH) return;
      lastW = w;
      lastH = h;
      renderer.setSize(w, h);
      // setSize 会把 canvas 的行内宽高写成 px，改回百分比，两次 resize 之间由
      // 浏览器拉伸顶住，不会露出底色。
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      uniforms.r.value[0] = gl.canvas.width;
      uniforms.r.value[1] = gl.canvas.height;
      draw();
    };
    const queueResize = (): void => {
      if (resizeRaf) return;
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = 0;
        resize();
      });
    };
    resize();

    const ro = new ResizeObserver(queueResize);
    ro.observe(host);

    // ---- 光标 ----
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const onMove = (e: PointerEvent): void => {
      const rect = canvas.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        targetCi = 0;
        return;
      }
      target[0] = (e.clientX - rect.left) * (gl.canvas.width / rect.width);
      target[1] =
        gl.canvas.height -
        (e.clientY - rect.top) * (gl.canvas.height / rect.height);
      targetCi = 1;
    };
    const onLeave = (): void => {
      targetCi = 0;
    };
    const pointerBound = finePointer && !reducedMotion;
    if (pointerBound) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave, { passive: true });
      window.addEventListener("blur", onLeave);
    }

    // ---- 可见性：离屏与页面转后台都停 ----
    const unobserve = observeVisibility(host, (active) => {
      if (active) start();
      else stop();
    });

    // 显卡复位时别让整页跟着炸：拦下默认行为并停循环，画面定格在最后一帧。
    const onContextLost = (e: Event): void => {
      e.preventDefault();
      stop();
    };
    canvas.addEventListener("webglcontextlost", onContextLost);

    applyToneRef.current = (next: ShaderTone): void => {
      if (next === toTone) return;
      fromTone = snapshotTone();
      toTone = next;
      if (running) {
        fadeFrom = performance.now();
        fading = true;
        return;
      }
      // 循环没跑（减弱动态、离屏或后台）：直接切到位再补一帧。
      fading = false;
      writeTone(toTone, toTone, 1);
      fromTone = toTone;
      draw();
    };

    return () => {
      applyToneRef.current = null;
      stop();
      cancelAnimationFrame(resizeRaf);
      unobserve();
      ro.disconnect();
      if (pointerBound) {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerleave", onLeave);
        window.removeEventListener("blur", onLeave);
      }
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.remove();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [palette, resScale, reducedMotion]);

  useEffect(() => {
    if (resolvedTheme !== "light" && resolvedTheme !== "dark") return;
    applyToneRef.current?.(SHADER_PALETTES[palette][resolvedTheme]);
  }, [palette, resolvedTheme]);

  return (
    <div
      ref={hostRef}
      className={className}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    />
  );
}
