"use client";

import { type ReactNode } from "react";
import { ShaderCanvas } from "@/components/shader-canvas";

/**
 * 收尾那一节的光束背景，墨调加一点金。
 *
 * 与 hero-shader 同型：ogl 随本文件分包，由 final-cta 的 next/dynamic
 * （ssr: false）按需加载。本区块在页面末端，加载时机远在 LCP 之后，由 section
 * 的默认背景顶住，不需要静态兜底。
 */
export function FinalCtaShader(): ReactNode {
  return <ShaderCanvas palette="ink" className="z-0" />;
}
