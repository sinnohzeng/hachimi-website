"use client";

import { type ReactNode } from "react";
import { ShaderCanvas } from "@/components/shader-canvas";

/**
 * 首屏的光束背景，琥珀调。
 *
 * 只是 ShaderCanvas 加一套调色板，单独留一个文件是为了保住 hero 那边的
 * next/dynamic（ssr: false）切点：ogl 随本文件分包，不进首屏 bundle。帧预算、
 * 离屏停帧、减弱动态与明暗切换都在 ShaderCanvas 里，这里不重复一遍。分包加载
 * 期间由 hero 的 ShaderFallback 静态渐变顶住。
 */
export function HeroShader(): ReactNode {
  return <ShaderCanvas palette="amber" />;
}
