"use client";

import { type ReactNode } from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { CatOrb } from "@/components/cat-orb";
import { AppShot } from "@/components/app-shot";
import { StoreBadges } from "@/components/store-badges";
import type { Translations } from "@/lib/i18n";
import { useReducedMotion } from "@/lib/motion";
import { mountRise } from "@/lib/motion-tokens";

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

/**
 * 这一行是不是以全角标点收尾。居中的中文标题里，逗号与句号各占一个字宽，墨迹却只在左半格，
 * 整行看着就偏左。中文排版的惯例是把行尾标点挤成半宽（W3C《中文排版需求》的标点挤压）；
 * 这里不用负外边距去挤，而是给这一行补 0.5em 的左内边距：效果一样，且不碰行的固有宽度。
 * 负外边距会把 flex 里 shrink-to-fit 的标题量窄半格，行就折了。左对齐时不需要补偿，lg 起还原。
 */
function endsWithFullWidthPunctuation(line: string): boolean {
  return /[，。、！？；：）」』】]$/u.test(line);
}

/**
 * 首屏。第三版只剩三样东西：一句主标题、商店徽章、一张起卦结果图。
 *
 * 撤掉的品类锚、产品说明、差异句与「往下看看」文字链各有新落点：品类锚做了第二节
 * 的标题，差异句独占第三节，产品说明散进第二节三步，往下走由导航接住。加第二句话
 * 之前先看 specs/001-site-v3-concise/spec.md 的七节表，首屏一句是 owner 定的。
 */
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

      <div className="relative flex min-h-dvh items-center justify-center px-6 pt-24 sm:px-8 lg:py-0">
        <div className="relative flex w-full max-w-5xl flex-col items-center gap-12 text-center lg:min-h-dvh lg:flex-row lg:justify-between lg:gap-16 lg:text-left">
          <div className="flex flex-col items-center lg:w-[54%] lg:items-start">
            {/* 球径 96/112 px 是标准档（96 到 160 pt）的下沿：首屏的主角是那一句话，道长只是陪着。
                版面框比球宽 0.7 个球径、球居中，所以框左沿在球左沿左边 0.35 个球径；左对齐那一档
                把框往左挪这么多，球身轮廓的左沿才与标题的左沿对齐（owner 2026-09-22）。 */}
            <CatOrb
              surface="hero"
              className="mb-3 [--orb-d:96px] sm:[--orb-d:112px] lg:ml-[calc(var(--orb-d)*-0.35)]"
            />
            {/* H1 是 LCP 元素：不做挂载后淡入，服务端首帧（含禁 JS）即可见。 */}
            <h1 className="max-w-xl font-serif text-4xl leading-tight font-medium tracking-tight text-balance text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {/* 断行写死在文案里：这一句的停顿就在逗号上，交给浏览器自己折会折在“先起”中间。 */}
              {t.hero.headlineLines.map((line) => (
                <span
                  key={line}
                  className={
                    endsWithFullWidthPunctuation(line)
                      ? "block pl-[0.5em] lg:pl-0"
                      : "block"
                  }
                >
                  {line}
                </span>
              ))}
            </h1>

            <motion.div {...mountRise(0.3)} className="mt-10">
              <StoreBadges
                locale={locale}
                t={t}
                className="min-h-12 justify-center lg:justify-start"
              />
            </motion.div>
          </div>

          <div
            data-hero-device
            className="-mb-20 w-64 shrink-0 sm:w-80 lg:absolute lg:top-[18%] lg:right-0 lg:mb-0 lg:w-[min(27rem,52svh)]"
          >
            <AppShot
              name="cast-result"
              alt={t.hero.shotAlt}
              eager
              sizes="(min-width: 1024px) 432px, (min-width: 640px) 320px, 256px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
