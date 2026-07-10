"use client";

import { type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import type { Translations } from "@/lib/i18n";

const ease = [0.16, 1, 0.3, 1] as const;

// Decorative marks for each step: 問 (ask) · 卦 (cast) · 讀 (read).
const cardGlyphs = ["問", "卦", "讀"];

// Line-art anchors drawn in the site's ink-and-gold language, one per step:
// ask = an input field with a caret, cast = the six lines of hexagram 11
// (Tai, three yin over three yang) with one accent line, read = vertical
// text columns in the classical layout. Purely decorative; the card copy
// carries the meaning.
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
    key="cast"
    viewBox="0 0 96 96"
    fill="none"
    stroke="currentColor"
    strokeWidth={3}
    strokeLinecap="round"
    aria-hidden="true"
    className="relative h-24 w-24 transition-transform duration-500 group-hover:scale-105 sm:h-28 sm:w-28"
  >
    <g className="text-foreground/35">
      <path d="M26 23h18M52 23h18" />
      <path d="M26 33h18M52 33h18" />
      <path d="M26 43h18M52 43h18" />
      <path d="M26 63h44" />
      <path d="M26 73h44" />
    </g>
    <path d="M26 53h44" className="text-accent" />
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
];

export function FeatureCards({
  t,
  locale,
}: {
  t: Translations;
  locale: string;
}): ReactNode {
  return (
    <section
      id="features"
      className="bg-background relative w-full scroll-mt-28 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="mb-16 flex flex-col items-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="text-foreground font-serif text-3xl font-medium sm:text-4xl md:text-5xl"
          >
            {t.featureCards.title}
            <br />
            <span className="italic">{t.featureCards.subtitle}</span>
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {t.featureCards.cards.map((card, index) => (
            <motion.a
              key={card.title}
              href={`/${locale}/methodology`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, transition: { duration: 0.25, ease } }}
              whileTap={{ y: -1, transition: { duration: 0.15, ease } }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease }}
              className="group bg-muted/50 border-border hover:border-accent/50 flex flex-col overflow-hidden rounded-sm border transition-[border-color,box-shadow] hover:shadow-lg"
            >
              <div className="from-muted to-background border-border relative flex h-56 items-center justify-center overflow-hidden border-b bg-linear-to-br sm:h-64">
                <span
                  aria-hidden="true"
                  className="text-foreground/[0.07] absolute -right-2 -bottom-6 font-serif text-[7rem] leading-none select-none"
                >
                  {cardGlyphs[index]}
                </span>
                {cardArt[index]}
              </div>
              <div className="flex flex-col p-6">
                <h3 className="text-foreground font-serif text-lg font-medium">
                  {card.title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {card.description}
                </p>
                {/* 可见文字标签让"整卡跳转方法论页"这件事显式化（可发现性 + a11y） */}
                <div className="text-foreground/60 group-hover:text-accent mt-4 flex items-center gap-1 text-sm font-medium transition-colors">
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
