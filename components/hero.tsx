"use client";

import { type ReactNode } from "react";
import dynamic from "next/dynamic";
import { ChevronDown, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { StoreBadges } from "@/components/store-badges";
import type { Translations } from "@/lib/i18n";
import { useReducedMotion } from "@/lib/motion";
import { mountFade, mountRise } from "@/lib/motion-tokens";

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

export function Hero({
  locale,
  t,
}: {
  locale: string;
  t: Translations;
}): ReactNode {
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
            {...mountFade(0.3)}
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
            {/* 方法论引流条：首屏最顶端的视觉位留给"起卦的门道"入口，
                已上架的信度交给下方双徽章承担，不重复宣告。 */}
            <motion.a
              href={`/${locale}/methodology`}
              {...mountRise(0.3)}
              className="mb-6 flex items-center gap-2 rounded-full bg-white py-1.5 pr-3 pl-4 transition-opacity duration-150 hover:opacity-90"
            >
              <span className="text-xs font-medium text-black">
                {t.hero.badge}
              </span>
              <ChevronRight className="h-3 w-3 text-black/50" />
            </motion.a>

            {/* H1 是 LCP 元素：不做挂载后淡入，服务端首帧（含禁 JS）即可见，
                避免入场动画把 LCP 推迟到 JS 挂载之后。 */}
            <h1 className="max-w-3xl text-left font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl lg:text-center">
              {t.hero.headline1}
              <br />
              {t.hero.headline2}
            </h1>

            <motion.p
              {...mountRise(0.7)}
              className="mt-5 max-w-xl text-left text-lg text-white/70 lg:text-center"
            >
              {t.hero.description}
            </motion.p>

            {/* 主 CTA：官方双徽章（与副标题同档入场，主 CTA 不排到最后）。
                "看看怎么玩"降级为次级文字链，留一条先了解再下载的出路。 */}
            <motion.div
              {...mountRise(0.7)}
              className="mt-10 flex w-full flex-col items-start gap-5 lg:items-center"
            >
              <StoreBadges locale={locale} t={t} className="min-h-12" />
              <a
                href="#features"
                className="flex items-center gap-1 text-sm text-white/60 transition-colors duration-150 hover:text-white"
              >
                {t.hero.cta}
                <ChevronDown className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
