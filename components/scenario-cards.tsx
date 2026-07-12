"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";
import type { Translations } from "@/lib/i18n";
import { DIST, MARGIN, STAGGER, hoverLift, reveal } from "@/lib/motion-tokens";

// Decorative marks for each heart-matter: 尋 (seek) · 緣 (bond) · 擇 (choose).
const cardGlyphs = ["尋", "緣", "擇"];

export function ScenarioCards({ t }: { t: Translations }): ReactNode {
  return (
    <section
      id="scenarios"
      className="bg-muted/40 relative w-full scroll-mt-28 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="mb-16 flex flex-col items-center text-center">
          <motion.h2
            {...reveal(0.1)}
            className="text-foreground font-serif text-3xl font-medium sm:text-4xl md:text-5xl"
          >
            {t.scenarioCards.title}
          </motion.h2>
          <motion.p
            {...reveal(0.2)}
            className="text-muted-foreground mt-4 text-base sm:text-lg"
          >
            {t.scenarioCards.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {t.scenarioCards.cards.map((card, index) => (
            <motion.div
              key={card.name}
              {...reveal(index * STAGGER.grid, {
                dist: DIST.lg,
                margin: MARGIN.card,
              })}
              whileHover={hoverLift}
              className="group bg-background border-border hover:border-foreground/20 relative flex flex-col overflow-hidden rounded-sm border p-6 transition-[border-color,box-shadow] hover:shadow-lg sm:p-8"
            >
              <span
                aria-hidden="true"
                className="text-foreground/[0.06] pointer-events-none absolute -top-3 -right-2 font-serif text-8xl select-none"
              >
                {cardGlyphs[index]}
              </span>
              <h3 className="text-foreground relative font-serif text-xl font-medium">
                {card.name}
              </h3>
              <p className="text-foreground/70 relative mt-1 text-sm font-medium">
                {card.blurb}
              </p>
              <p className="text-muted-foreground relative mt-5 text-base leading-relaxed italic">
                {card.line}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...reveal(0.3, { margin: MARGIN.card })}
          className="border-border bg-background/50 mt-6 flex flex-col gap-2 rounded-sm border border-dashed px-6 py-5 text-center sm:flex-row sm:items-center sm:gap-4 sm:text-left"
        >
          <span className="text-foreground font-serif text-lg font-medium">
            {t.scenarioCards.openName}
          </span>
          <span className="text-muted-foreground text-sm">
            {t.scenarioCards.openBlurb}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
