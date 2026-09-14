"use client";

import { type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import type { Translations } from "@/lib/i18n";
import {
  DIST,
  MARGIN,
  STAGGER,
  hoverLift,
  reveal,
  tapPress,
} from "@/lib/motion-tokens";

// Decorative marks, one per bottom tab: 問 (ask) · 盤 (chart) · 堂 (academy) ·
// 我 (me).
const cardGlyphs = ["問", "盤", "堂", "我"];

// 每张卡跳到本页对应那一节。这一排卡就是 App 底部四格的目录，卡与锚一一对上。
const cardHrefs = ["#ask", "#chart", "#academy", "#offline"];

// Line-art anchors drawn in the site's ink-and-gold language, one per tab:
// ask = an input field with a caret, chart = a twelve-palace grid with one
// palace lit, academy = vertical text columns in the classical layout,
// me = three setting sliders. Purely decorative; the card copy carries the
// meaning.
const cardArt: ReactNode[] = [
  <svg
    key="ask"
    viewBox="0 0 96 96"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    aria-hidden="true"
    className="relative h-24 w-24 transition-transform duration-500 group-hover:scale-105 sm:h-28 sm:w-28"
  >
    <g className="text-foreground/35">
      <rect x="12" y="34" width="72" height="28" rx="6" />
      <path d="M24 48h24" />
    </g>
    <path d="M56 42v12" className="text-accent" />
  </svg>,
  <svg
    key="chart"
    viewBox="0 0 96 96"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    aria-hidden="true"
    className="relative h-24 w-24 transition-transform duration-500 group-hover:scale-105 sm:h-28 sm:w-28"
  >
    <g className="text-foreground/35">
      <rect x="16" y="16" width="64" height="64" rx="3" />
      <path d="M32 16v64M48 16v64M64 16v64" />
      <path d="M16 32h64M16 48h64M16 64h64" />
    </g>
    <rect x="32" y="32" width="32" height="32" className="text-accent" />
  </svg>,
  <svg
    key="read"
    viewBox="0 0 96 96"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    aria-hidden="true"
    className="relative h-24 w-24 transition-transform duration-500 group-hover:scale-105 sm:h-28 sm:w-28"
  >
    <g className="text-foreground/35">
      <path d="M69 22v52" />
      <path d="M55 22v34" />
      <path d="M41 22v52" />
    </g>
    <path d="M27 22v22" className="text-accent" />
  </svg>,
  <svg
    key="me"
    viewBox="0 0 96 96"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    aria-hidden="true"
    className="relative h-24 w-24 transition-transform duration-500 group-hover:scale-105 sm:h-28 sm:w-28"
  >
    <g className="text-foreground/35">
      <path d="M18 32h60M18 48h60M18 64h60" />
      <circle cx="36" cy="32" r="5" />
      <circle cx="60" cy="64" r="5" />
    </g>
    <circle cx="52" cy="48" r="5" className="text-accent" />
  </svg>,
];

export function FeatureCards({ t }: { t: Translations }): ReactNode {
  return (
    <section
      id="features"
      className="bg-background relative w-full scroll-mt-28 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="mb-16 flex flex-col items-center text-center">
          {/* 抬头与命盘、学堂两节同形：大标题一行，副题压成正文级，
              免得一句列举被排成 5xl 的第二行标题。 */}
          <motion.h2
            {...reveal(0.1)}
            className="text-foreground font-serif text-3xl font-medium sm:text-4xl md:text-5xl"
          >
            {t.featureCards.title}
          </motion.h2>
          <motion.p
            {...reveal(0.15)}
            className="text-muted-foreground mt-4 max-w-xl text-base sm:text-lg"
          >
            {t.featureCards.subtitle}
          </motion.p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.featureCards.cards.map((card, index) => (
            <motion.a
              key={card.title}
              href={cardHrefs[index]}
              {...reveal(index * STAGGER.grid, {
                dist: DIST.lg,
                margin: MARGIN.card,
              })}
              whileHover={hoverLift}
              whileTap={tapPress}
              className="group bg-muted/50 border-border hover:border-accent/50 flex flex-col overflow-hidden rounded-sm border transition-[border-color,box-shadow] hover:shadow-lg"
            >
              <div className="from-muted to-background border-border relative flex h-44 items-center justify-center overflow-hidden border-b bg-linear-to-br sm:h-52">
                <span
                  aria-hidden="true"
                  className="text-foreground/[0.07] absolute -right-2 -bottom-6 font-serif text-[7rem] leading-none select-none"
                >
                  {cardGlyphs[index]}
                </span>
                {cardArt[index]}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-foreground font-serif text-lg font-medium">
                  {card.title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {card.description}
                </p>
                {/* 可见文字标签让"整卡跳转方法论页"这件事显式化（可发现性 + a11y） */}
                <div className="text-foreground/60 group-hover:text-accent mt-auto flex items-center gap-1 pt-4 text-sm font-medium transition-colors">
                  {t.featureCards.readMore}
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
