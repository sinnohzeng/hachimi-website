"use client";

import { type ReactNode } from "react";
import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";
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

// 解读页截图：陌生人首屏唯一的具象锚点。不包 motion——初始 opacity: 0 会把
// 图片可见性押在 JS 挂载上，禁 JS 与慢网场景下首屏就没了产品长相。
function PhoneShot({
  locale,
  alt,
  className = "",
}: {
  locale: string;
  alt: string;
  className?: string;
}): ReactNode {
  return (
    <div
      className={`overflow-hidden rounded-t-4xl bg-neutral-900 px-1 pt-1 ${className}`}
    >
      <div className="h-full overflow-hidden rounded-t-[1.75rem] bg-neutral-950">
        <img
          src={`/screenshots/${locale}/result.webp`}
          alt={alt}
          width={720}
          height={1565}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="block h-auto w-full select-none"
        />
      </div>
    </div>
  );
}

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
      {/* 移动端内容高过视口、不再靠居中让位，pt 给固定导航让位；lg 回到纯居中。 */}
      <div className="relative flex min-h-dvh items-center justify-center px-6 pt-20 pb-8 sm:px-8 lg:py-0">
        <div className="relative w-full max-w-270 py-10 lg:h-140 lg:py-0">
          {/* 装饰框线单独淡入，H1 等内容不被这层初始 opacity: 0 压住首帧。 */}
          <motion.div
            {...mountFade(0.3)}
            className="pointer-events-none absolute inset-0"
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

          <div className="relative flex h-full w-full flex-col justify-center px-4 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-stretch lg:gap-12 lg:px-10">
            <div className="flex flex-col items-start justify-center lg:py-16">
              {/* 品类锚：首屏第一行先说清这是个什么东西。纯陈述不带链接，
                  "起卦的门道"入口由导航与下方各卡承担。 */}
              <motion.p
                {...mountRise(0.3)}
                className="mb-6 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/85 backdrop-blur-sm sm:text-sm"
              >
                {t.hero.eyebrow}
              </motion.p>

              {/* H1 是 LCP 元素：不做挂载后淡入，服务端首帧（含禁 JS）即可见，
                  避免入场动画把 LCP 推迟到 JS 挂载之后。 */}
              <h1 className="max-w-3xl text-left font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl">
                {t.hero.headline1}
                <br />
                {t.hero.headline2}
              </h1>

              <motion.p
                {...mountRise(0.6)}
                className="mt-5 max-w-xl text-left text-lg text-white/70"
              >
                {t.hero.description}
              </motion.p>

              {/* 差异句：为什么不是随手问个通用 AI。情感承诺放首屏，
                  机制细节归 FAQ。 */}
              <motion.p
                {...mountRise(0.75)}
                className="mt-4 max-w-xl border-l-2 border-amber-200/50 pl-3 text-left text-sm text-amber-200/90 sm:text-base"
              >
                {t.hero.memory}
              </motion.p>

              {/* 主 CTA：官方徽章（按访问平台 CSS 收敛成单徽章，见 store-badges）。
                  "看看怎么玩"降级为次级文字链，留一条先了解再下载的出路。 */}
              <motion.div
                {...mountRise(0.9)}
                className="mt-9 flex w-full flex-col items-start gap-5"
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

              {/* 移动端：手机截图垫底、向下渐隐，首屏就有产品长相。 */}
              <PhoneShot
                locale={locale}
                alt={t.hero.screenshotAlt}
                className="mt-12 h-96 w-60 self-center [mask-image:linear-gradient(to_bottom,black_70%,transparent)] lg:hidden"
              />
            </div>

            {/* 桌面端：截图贴住框线底边被裁掉下半截，只露判词与卦盘。 */}
            <div className="hidden lg:flex lg:h-full lg:items-end">
              <PhoneShot
                locale={locale}
                alt={t.hero.screenshotAlt}
                className="h-116 w-72"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
