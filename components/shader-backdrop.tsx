"use client";

import type { CSSProperties, ReactNode } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "@/lib/motion";
import type { ShaderPaletteName } from "@/lib/shader-palettes";

// 光束 shader 只在客户端按需加载，ogl 随它分包，不进首屏 bundle。
const ShaderCanvas = dynamic(
  () => import("@/components/shader-canvas").then((mod) => mod.ShaderCanvas),
  { ssr: false }
);

/**
 * 与 shader 首帧观感接近的静态渐变，明暗各一版，与 lib/shader-palettes.ts 的同名调色板
 * 同源：shader 分包加载期间与减弱动态时都是它。首屏那一套顶着 LCP，必须有；收尾在页面末端，
 * 由 section 的底色顶住。
 */
const STILL: Partial<
  Record<ShaderPaletteName, { light: string; dark: string }>
> = {
  amber: {
    light:
      "radial-gradient(85% 60% at 50% 100%, rgba(245, 158, 11, 0.16) 0%, rgba(232, 214, 184, 0.35) 45%, rgba(244, 239, 230, 0) 75%), linear-gradient(to bottom, #F4EFE6 0%, #F1EADC 70%, #EBE2D0 100%)",
    dark: "radial-gradient(85% 60% at 50% 100%, rgba(180, 95, 45, 0.28) 0%, rgba(60, 30, 60, 0.18) 45%, rgba(5, 5, 15, 0) 75%), linear-gradient(to bottom, #050510 0%, #08081a 70%, #120d20 100%)",
  },
};

/**
 * 首屏与收尾的光束背景。减弱动态时不加载 shader，只留静态渐变；偏好中途改变，
 * shader 随之卸下或装上。shader 画布不透明，装好后盖住底下的渐变。
 */
export function ShaderBackdrop({
  palette,
  className,
}: {
  palette: ShaderPaletteName;
  className?: string;
}): ReactNode {
  const reducedMotion = useReducedMotion();
  const still = STILL[palette];

  return (
    <>
      {still ? (
        <div
          className="absolute inset-0 bg-[image:var(--still-light)] dark:bg-[image:var(--still-dark)]"
          aria-hidden="true"
          style={
            {
              "--still-light": still.light,
              "--still-dark": still.dark,
            } as CSSProperties
          }
        />
      ) : null}
      {reducedMotion ? null : (
        <ShaderCanvas palette={palette} {...(className ? { className } : {})} />
      )}
    </>
  );
}
