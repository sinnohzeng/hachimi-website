"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";
import type { ShowcaseBlock } from "@/lib/i18n/types";
import { DIST, DUR, MARGIN, STAGGER, reveal } from "@/lib/motion-tokens";

/**
 * 站上每张 App 截图都是 iPhone 17 Pro 的整屏 1206 × 2622，浅色深色各一份。
 *
 * 尺寸统一不是洁癖：`ShotRow` 是 flex 行，行内高度不齐时手机边框的底色会在矮的
 * 那张下面露出一条黑带。八字两屏底部有施工中的占位行，裁掉之后由
 * `scripts/build-shots.mjs` 用页面纸色补回同一高度。
 */
const SHOT_W = 1206;
const SHOT_H = 2622;

/** 站上有哪几张截图。名字即 `public/screenshots/zh/` 里的文件名前缀。 */
export type ShotName =
  | "ziwei-sanhe"
  | "ziwei-sihua"
  | "ziwei-feixing"
  | "ziwei-fortune"
  | "ziwei-geju"
  | "ziwei-glossary"
  | "bazi-pillars"
  | "bazi-sixpillars"
  | "academy-home"
  | "academy-book"
  | "academy-reading";

function Screen({
  base,
  alt,
  sizes,
  eager,
  className,
}: {
  base: string;
  alt: string;
  sizes: string;
  eager: boolean;
  className: string;
}): ReactNode {
  return (
    <img
      src={`${base}-1206.webp`}
      srcSet={`${base}-603.webp 603w, ${base}-1206.webp 1206w`}
      sizes={sizes}
      alt={alt}
      width={SHOT_W}
      height={SHOT_H}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      className={`block h-auto w-full select-none ${className}`}
    />
  );
}

/**
 * 一张 App 截图，套在手机边框里。浅色深色两份字节，跟着 `html.dark` 换。
 *
 * 两张 img 叠着放、各由 `dark:` 决定显隐。被 `display: none` 的那张既不进
 * 无障碍树，浏览器也不会去取（懒加载的图没有可见框就不触发），所以看着是两张、
 * 实际只下一张。唯独首屏那张要 eager：eager 绕开懒加载，深色下会白取一次浅色
 * 版；只有首屏一张，换来 LCP 不被推迟，这笔划得来。
 *
 * 截图拍的是中文界面，en 页暂时共用同一批文件，所以路径不带 locale：一套字节
 * 服务两种语言，别为了对称复制一份。英文界面截图补拍之后再按 locale 分流。
 */
export function AppShot({
  name,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 220px, 45vw",
  eager = false,
}: {
  name: ShotName;
  alt: string;
  className?: string;
  sizes?: string;
  eager?: boolean;
}): ReactNode {
  const base = `/screenshots/zh/${name}`;
  return (
    <div
      className={`overflow-hidden rounded-t-[1.6rem] bg-neutral-900 px-1 pt-1 ${className}`}
    >
      <div className="overflow-hidden rounded-t-[1.35rem] bg-neutral-950">
        <Screen
          base={base}
          alt={alt}
          sizes={sizes}
          eager={eager}
          className="dark:hidden"
        />
        <Screen
          base={`${base}-dark`}
          alt={alt}
          sizes={sizes}
          eager={false}
          className="hidden dark:block"
        />
      </div>
    </div>
  );
}

/**
 * 一排截图。窄屏横着滑（负边距出血到屏幕边，滚动条自己吃掉溢出，页面不横滚），
 * sm 起收回栏内平分。三张图在 390 宽上平分只剩 100 出头，那样谁也看不清。
 */
function ShotRow({
  shots,
  alts,
}: {
  shots: readonly ShotName[];
  alts: string[];
}): ReactNode {
  return (
    <div className="scrollbar-hide -mx-6 overflow-x-auto px-6 sm:mx-0 sm:overflow-visible sm:px-0">
      <div className="flex w-max gap-4 sm:w-full sm:justify-center">
        {shots.map((name, index) => (
          <AppShot
            key={name}
            name={name}
            alt={alts[index] ?? ""}
            className="w-40 shrink-0 sm:w-auto sm:max-w-52 sm:min-w-0 sm:flex-1"
          />
        ))}
      </div>
    </div>
  );
}

/**
 * 产品区块的共享版式：小节抬头加若干「一段文字 + 一排截图」的行，行与行左右交替。
 * 命盘深讲与学堂两节共用这一份，两节的差别只在数据。
 */
export function Showcase({
  id,
  kicker,
  title,
  subtitle,
  blocks,
  shots,
  tinted = false,
}: {
  id: string;
  kicker: string;
  title: string;
  subtitle: string;
  blocks: ShowcaseBlock[];
  /** 每个 block 用哪几张截图，顺序与 block.shotAlts 一一对应。 */
  shots: readonly (readonly ShotName[])[];
  tinted?: boolean;
}): ReactNode {
  return (
    <section
      id={id}
      className={`${tinted ? "bg-muted/40" : "bg-background"} relative w-full scroll-mt-28 py-24 sm:py-32`}
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <motion.span
            {...reveal()}
            className="text-accent text-sm font-medium tracking-wide"
          >
            {kicker}
          </motion.span>
          <motion.h2
            {...reveal(0.05)}
            className="text-foreground mt-4 font-serif text-3xl font-medium sm:text-4xl md:text-5xl"
          >
            {title}
          </motion.h2>
          <motion.p
            {...reveal(0.1, { duration: DUR.base })}
            className="text-muted-foreground mt-4 max-w-xl text-base sm:text-lg"
          >
            {subtitle}
          </motion.p>
        </div>

        {blocks.map((block, index) => (
          <div
            key={block.body}
            className="mt-16 grid grid-cols-1 gap-10 sm:mt-20 lg:grid-cols-2 lg:items-center lg:gap-16"
          >
            <motion.div
              {...reveal(0, { duration: DUR.base, margin: MARGIN.early })}
              className={index % 2 === 1 ? "lg:order-2" : undefined}
            >
              {/* 只有一行的小节（学堂）把抬头留给 section 头部，这里传空串跳过，
                  免得同一句话上下印两遍。 */}
              {block.kicker ? (
                <span className="text-foreground/50 text-sm font-medium tracking-wide">
                  {block.kicker}
                </span>
              ) : null}
              {block.title ? (
                <h3 className="text-foreground mt-3 font-serif text-2xl leading-snug font-medium sm:text-3xl">
                  {block.title}
                </h3>
              ) : null}
              <p
                className={`text-foreground/70 leading-relaxed ${block.title ? "mt-5" : ""}`}
              >
                {block.body}
              </p>
              <ul className="mt-6 space-y-3">
                {block.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="bg-accent mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    />
                    <span className="text-foreground/70 text-sm leading-relaxed">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              {...reveal(index * STAGGER.tight, {
                dist: DIST.lg,
                duration: DUR.slower,
                margin: MARGIN.card,
              })}
              className={index % 2 === 1 ? "lg:order-1" : undefined}
            >
              <ShotRow shots={shots[index] ?? []} alts={block.shotAlts} />
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
