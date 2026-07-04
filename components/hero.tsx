"use client";

import { type ReactNode } from "react";
import dynamic from "next/dynamic";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import type { Translations } from "@/lib/i18n";
import { useReducedMotion } from "@/lib/motion";

const ease = [0.16, 1, 0.3, 1] as const;

// 与 shader 首帧观感接近的静态深墨渐变：shader 分包加载期间与 reduced motion
// 场景共用，避免首屏闪白。
function ShaderFallback(): ReactNode {
  return (
    <div
      className="absolute inset-0"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(85% 60% at 50% 100%, rgba(180, 95, 45, 0.28) 0%, rgba(60, 30, 60, 0.18) 45%, rgba(5, 5, 15, 0) 75%), linear-gradient(to bottom, #050510 0%, #08081a 70%, #120d20 100%)",
      }}
    />
  );
}

// three.js 只随本组件在客户端按需加载，不进首屏 bundle（LCP 修复主因之一）。
const HeroShader = dynamic(
  () => import("@/components/hero-shader").then((mod) => mod.HeroShader),
  { ssr: false, loading: () => <ShaderFallback /> }
);

export function Hero({ t }: { t: Translations }): ReactNode {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-dvh w-full overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        {reducedMotion ? <ShaderFallback /> : <HeroShader />}
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 sm:px-8">
        <div className="relative w-full max-w-270 py-8 lg:h-112 lg:py-0">
          {/* 装饰框线单独淡入，H1 等内容不被这层初始 opacity: 0 压住首帧。 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease }}
            className="absolute inset-0"
            aria-hidden="true"
          >
            <div className="absolute top-0 right-0 left-0 h-px bg-white/10" />
            <div className="absolute right-0 bottom-0 left-0 h-px bg-white/10" />
            <div className="absolute top-0 bottom-0 left-0 w-px bg-white/10" />
            <div className="absolute top-0 right-0 bottom-0 w-px bg-white/10" />

            <div className="absolute -top-0.75 -left-0.75 h-1.5 w-1.5 bg-white" />
            <div className="absolute -top-0.75 -right-0.75 h-1.5 w-1.5 bg-white" />
            <div className="absolute -bottom-0.75 -left-0.75 h-1.5 w-1.5 bg-white" />
            <div className="absolute -right-0.75 -bottom-0.75 h-1.5 w-1.5 bg-white" />

            <div className="absolute top-0 right-full h-px w-screen bg-white/10" />
            <div className="absolute top-0 left-full h-px w-screen bg-white/10" />
            <div className="absolute right-full bottom-0 h-px w-screen bg-white/10" />
            <div className="absolute bottom-0 left-full h-px w-screen bg-white/10" />

            <div className="absolute bottom-full left-0 h-screen w-px bg-white/10" />
            <div className="absolute top-full left-0 h-screen w-px bg-white/10" />
            <div className="absolute right-0 bottom-full h-screen w-px bg-white/10" />
            <div className="absolute top-full right-0 h-screen w-px bg-white/10" />
          </motion.div>

          <div className="pointer-events-auto relative flex h-full w-full flex-col items-start justify-center px-4 lg:items-center lg:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              className="mb-6 flex cursor-pointer items-center gap-2 rounded-full bg-white py-1.5 pr-3 pl-4"
            >
              <span className="text-xs font-medium text-black">
                {t.hero.badge}
              </span>
              <ChevronRight className="h-3 w-3 text-black/50" />
            </motion.div>

            {/* H1 是 LCP 元素：不做挂载后淡入，服务端首帧（含禁 JS）即可见，
                避免入场动画把 LCP 推迟到 JS 挂载之后。 */}
            <h1 className="max-w-3xl text-left font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl lg:text-center">
              {t.hero.headline1}
              <br />
              {t.hero.headline2}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease }}
              className="mt-5 max-w-xl text-left text-lg text-white/70 lg:text-center"
            >
              {t.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9, ease }}
              className="mt-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
            >
              <a
                href="#features"
                className="flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-medium whitespace-nowrap text-black transition-all duration-150 hover:bg-white/90 active:scale-[0.97]"
              >
                {t.hero.cta}
                <ChevronRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
