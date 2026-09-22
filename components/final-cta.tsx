"use client";

import { type ReactNode } from "react";
import dynamic from "next/dynamic";
import { motion, type Variants } from "motion/react";
import { ShotScreens, type ShotName } from "@/components/app-shot";
import { RevealHeadline } from "@/components/reveal-headline";
import { StoreBadges } from "@/components/store-badges";
import type { Translations } from "@/lib/i18n";
import { useReducedMotion } from "@/lib/motion";
import { DUR, MARGIN, reveal } from "@/lib/motion-tokens";

// shader 随组件按需加载，不进首屏共享 vendor chunk（LCP 修复，与 hero 同型）。
// 本区块在页面末端，shader 分包加载期间由 section 默认背景顶住，无需渐变兜底。
const FinalCtaShader = dynamic(
  () =>
    import("@/components/final-cta-shader").then((mod) => mod.FinalCtaShader),
  { ssr: false }
);

/**
 * 第九节：收尾（#download）。五张截图扇形、一句 word-mask 标题、商店徽章。
 *
 * 扇形里的五张就是命例走查那五张，纯装饰：alt 留空、整块 aria-hidden，同一批字不
 * 在读屏里念第二遍。减弱动态时扇形直接摆好不飞入，标题整句显示。
 */
const FAN: readonly ShotName[] = [
  "case-list",
  "ziwei-sanhe",
  "cast-result",
  "bazi-pillars",
  "case-casts",
];

/** 每张相对中心的位移与旋转，中间那张正着放。 */
const FAN_LAYOUT = [
  { x: -224, y: 30, r: -13 },
  { x: -112, y: 8, r: -6 },
  { x: 0, y: 0, r: 0 },
  { x: 112, y: 8, r: 6 },
  { x: 224, y: 30, r: 13 },
];

const FAN_CONTAINER: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

function ShotFan({ reducedMotion }: { reducedMotion: boolean }): ReactNode {
  return (
    <motion.div
      {...(reducedMotion
        ? {}
        : {
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true, margin: MARGIN.early },
            variants: FAN_CONTAINER,
          })}
      aria-hidden="true"
      className="relative h-32 w-full origin-top scale-50 sm:h-56 sm:scale-100"
    >
      {FAN.map((name, i) => {
        const layout = FAN_LAYOUT[i] ?? { x: 0, y: 0, r: 0 };
        return (
          <motion.div
            key={name}
            {...(reducedMotion
              ? {
                  style: {
                    transform: `translate(${layout.x}px, ${layout.y}px) rotate(${layout.r}deg)`,
                  },
                }
              : {
                  variants: {
                    hidden: {
                      opacity: 0,
                      y: 48,
                      x: layout.x * 0.25,
                      rotate: 0,
                    },
                    visible: {
                      opacity: 1,
                      x: layout.x,
                      y: layout.y,
                      rotate: layout.r,
                      transition: {
                        type: "spring",
                        stiffness: 220,
                        damping: 22,
                      },
                    },
                  },
                  "data-animate": "",
                })}
            className="border-foreground/10 absolute top-0 left-1/2 -ml-[54px] aspect-[1320/2868] w-[108px] overflow-hidden rounded-xl border shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)]"
          >
            <ShotScreens name={name} alt="" sizes="108px" />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export function FinalCTA({
  locale,
  t,
}: {
  locale: string;
  t: Translations;
}): ReactNode {
  const reducedMotion = useReducedMotion();

  return (
    // id="download"：header 与移动菜单“下载 App”CTA 的落点。
    <section
      id="download"
      className="relative flex w-full scroll-mt-28 items-center justify-center overflow-hidden"
    >
      <FinalCtaShader />
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center sm:px-8 sm:py-32">
        <ShotFan reducedMotion={reducedMotion} />

        <RevealHeadline
          text={t.finalCta.headline}
          className="text-foreground mx-auto mt-12 max-w-md font-serif text-4xl leading-tight font-medium md:text-5xl"
        />

        {/* 第三版撤掉了徽章下面那行补充小字：同样的话 FAQ 已说过一遍。 */}
        <motion.div
          {...reveal(0.2, { duration: DUR.base, margin: MARGIN.early })}
          className="mt-10 flex justify-center"
        >
          <StoreBadges locale={locale} t={t} className="justify-center" />
        </motion.div>
      </div>
    </section>
  );
}
