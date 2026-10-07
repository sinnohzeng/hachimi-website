"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { CatOrb } from "@/components/cat-orb";
import { ShaderBackdrop } from "@/components/shader-backdrop";
import { AppShot } from "@/components/app-shot";
import { StoreBadges } from "@/components/store-badges";
import type { Translations } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { mountRise } from "@/lib/motion-tokens";

/**
 * 这一行是不是以全角标点收尾。居中的中文标题里，逗号与句号各占一个字宽，墨迹却只在左半格，
 * 整行看着就偏左。中文排版的惯例是把行尾标点挤成半宽（W3C《中文排版需求》的标点挤压）；
 * 这里不用负外边距去挤，而是给这一行补 0.5em 的左内边距：效果一样，且不碰行的固有宽度。
 * 负外边距会把 flex 里 shrink-to-fit 的标题量窄半格，行就折了。左对齐时不需要补偿，lg 起还原。
 */
function endsWithFullWidthPunctuation(line: string): boolean {
  return /[，。、！？；：）」』】]$/u.test(line); // prose-style-ignore：字符类里是行尾标点
}

/**
 * 首屏四样东西：口号、过桥句、商店徽章、一张起卦结果图。
 *
 * 口号是 owner 定的，把人领进“慌的时候”这个场景；过桥句紧跟着，把高频的起卦接到
 * 沉淀下来的命例上（hachimi-ios docs/product-thesis.md 第三节）。两句都在定稿句表里，
 * 改字先改 hachimi-ios docs/copy-canon.md，npm run check:canon 核对。
 */
export function Hero({
  locale,
  t,
}: {
  locale: Locale;
  t: Translations;
}): ReactNode {
  return (
    <section className="relative min-h-dvh w-full overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <ShaderBackdrop palette="amber" />
      </div>

      <div className="relative flex min-h-dvh items-center justify-center px-6 pt-24 sm:px-8 lg:py-0">
        <div className="relative flex w-full max-w-5xl flex-col items-center gap-12 text-center lg:min-h-dvh lg:flex-row lg:justify-between lg:gap-16 lg:text-left">
          <div className="flex flex-col items-center lg:w-[54%] lg:items-start">
            {/* 球径 96/112 px 是标准档（96 到 160 pt）的下沿：首屏的主角是那一句话，道长只是陪着。
                版面框比球宽 0.7 个球径、球居中，所以框左沿在球左沿左边 0.35 个球径；左对齐那一档
                把框往左挪这么多，球身轮廓的左沿才与标题的左沿对齐。 */}
            <CatOrb
              surface="hero"
              className="mb-3 [--orb-d:96px] lg:ml-[calc(var(--orb-d)*-0.35)]"
            />
            {/* H1 是 LCP 元素：不做挂载后淡入，服务端首帧（含禁 JS）即可见。 */}
            <h1 className="text-foreground max-w-xl font-serif text-4xl leading-tight font-medium tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl">
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

            <motion.p
              {...mountRise(0.15)}
              className="text-foreground/75 zh-display mt-6 max-w-md text-lg leading-relaxed text-balance sm:text-xl"
            >
              {t.hero.bridge}
            </motion.p>

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
              sizes="(min-width: 1024px) 386px, (min-width: 640px) 286px, 229px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
