"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/motion";
import { ARTBOARD, BALL_DIAMETER, FRAME, PAPER } from "@/lib/orb/contract";
import { OrbHost } from "@/lib/orb/host";
import { PLACEMENTS, type OrbSurface } from "@/lib/orb/placement";
import manifest from "@/public/brand/orb-source.json";

/** 版本号做缓存键：签名文件换代后浏览器不会照放旧文件。 */
const RIVE_SRC = `/brand/hachimi-orb.riv?v=${manifest.version}`;
/** 同源静帧：标准像，侧望，深色纸底那一档，由 hachimi-orb 的 tools/still.sh 截出。 */
const STILL_SRC = "/brand/orb-still.png";

/** 球径由调用处的 CSS 变量给，例如 `[--orb-d:96px] sm:[--orb-d:112px]`，这里一切尺寸都是它的倍数。 */
const diameters = (k: number): string => `calc(var(--orb-d) * ${k})`;

/**
 * 官网上的哈基米道长。可替换件：换掉它，在场地图与契约名字表不变。
 *
 * 尺寸与 iOS 宿主同一套：版面框 1.7 乘 1.4 个球径，canvas 按 artboard 820 乘 440 等比放到
 * 球径的 820/222 乘 440/222 倍、居中溢出框外，耳与手在框外画；静帧是 canvas 正中那个正方形。
 * 框只管排版与命中，canvas 不吃指针，所以溢出的部分挡不住底下的标题与按钮。
 *
 * 运行时进视口才取，离开视口与页面转后台停帧；减弱动态或运行时装不上时留静帧，
 * 静帧与动画是同一份文件出的同一张脸，换不换得上看不出两个人。
 */
export function CatOrb({
  surface,
  className = "",
}: {
  surface: OrbSurface;
  className?: string;
}): ReactNode {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const orb = useRef<OrbHost | null>(null);
  const reduced = useReducedMotion();
  const placement = PLACEMENTS[surface];

  useEffect(() => {
    const element = host.current;
    const surfaceCanvas = canvas.current;
    if (!element || !surfaceCanvas || reduced) return;
    let disposed = false;
    let visible = false;
    let mounting: Promise<void> | undefined;

    // 在视口里且页面在前台才走帧；停下来时把指针也放掉，回来不会盯着上次离开的位置。
    const sync = (): void => {
      const current = orb.current;
      if (!current) return;
      if (visible && !document.hidden) {
        current.play();
      } else {
        current.release();
        current.pause();
      }
    };
    const mount = (): void => {
      mounting ??= OrbHost.mount({
        canvas: surfaceCanvas,
        src: RIVE_SRC,
        inputs: placement,
      })
        .then((mounted) => {
          if (disposed) {
            mounted.dispose();
            return;
          }
          orb.current = mounted;
          element.dataset.orbReady = "true";
          sync();
        })
        .catch(() => {
          delete element.dataset.orbReady;
        });
    };
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
        if (visible) mount();
        sync();
      },
      { rootMargin: "20% 0px" }
    );
    observer.observe(element);
    const resize = (): void => orb.current?.resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(surfaceCanvas);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", sync);
    return () => {
      disposed = true;
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", sync);
      orb.current?.dispose();
      orb.current = null;
      delete element.dataset.orbReady;
    };
  }, [placement, reduced]);

  const still = diameters(ARTBOARD.height / BALL_DIAMETER);

  return (
    <div
      ref={host}
      className={`group/orb relative cursor-pointer select-none ${className}`}
      style={{ width: diameters(FRAME.width), height: diameters(FRAME.height) }}
      aria-hidden="true"
      data-orb-surface={surface}
      onPointerMove={(event) =>
        orb.current?.track(event.clientX, event.clientY)
      }
      onPointerLeave={() => orb.current?.release()}
      onPointerUp={() => orb.current?.release()}
      onPointerCancel={() => orb.current?.release()}
      onClick={(event) => {
        const current = orb.current;
        if (current?.hits(event.clientX, event.clientY)) current.poke();
      }}
    >
      {/* 纸底卡片：眼睛按纸底色实描，球下面必须是这一格的纸色，不然眼白浮在上面。 */}
      <div
        className="absolute inset-0 rounded-3xl"
        style={{ backgroundColor: PAPER[placement.palette][placement.theme] }}
      />
      <Image
        src={STILL_SRC}
        alt=""
        width={512}
        height={512}
        unoptimized
        className="pointer-events-none absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 group-data-[orb-ready=true]/orb:invisible"
        style={{ width: still, height: still }}
      />
      <canvas
        ref={canvas}
        className="pointer-events-none invisible absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-data-[orb-ready=true]/orb:visible"
        style={{
          width: diameters(ARTBOARD.width / BALL_DIAMETER),
          height: diameters(ARTBOARD.height / BALL_DIAMETER),
        }}
      />
    </div>
  );
}
