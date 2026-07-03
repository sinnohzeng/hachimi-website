"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";
import type { Translations } from "@/lib/i18n";

const ease = [0.16, 1, 0.3, 1] as const;

// Decorative marks for each heart-matter: 尋 (seek) · 緣 (bond) · 擇 (choose).
const cardGlyphs = ["尋", "緣", "擇"];

export function ScenarioCards({ t }: { t: Translations }): ReactNode {
  return (
    <section
      id="scenarios"
      className="relative w-full scroll-mt-28 bg-muted/40 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="text-3xl sm:text-4xl md:text-5xl font-medium font-serif text-foreground"
          >
            {t.scenarioCards.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="mt-4 text-base sm:text-lg text-muted-foreground"
          >
            {t.scenarioCards.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.scenarioCards.cards.map((card, index) => (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease }}
              className="group relative flex flex-col bg-background border border-border rounded-sm p-6 sm:p-8 hover:border-foreground/20 hover:shadow-lg transition-[border-color,box-shadow] overflow-hidden"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 -top-3 font-serif text-8xl text-foreground/[0.06] select-none"
              >
                {cardGlyphs[index]}
              </span>
              <h3 className="relative text-xl font-medium font-serif text-foreground">
                {card.name}
              </h3>
              <p className="relative mt-1 text-sm font-medium text-foreground/70">
                {card.blurb}
              </p>
              <p className="relative mt-5 text-base text-muted-foreground leading-relaxed italic">
                {card.line}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="mt-6 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 rounded-sm border border-dashed border-border bg-background/50 px-6 py-5 text-center sm:text-left"
        >
          <span className="font-serif text-lg font-medium text-foreground">
            {t.scenarioCards.openName}
          </span>
          <span className="text-sm text-muted-foreground">
            {t.scenarioCards.openBlurb}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
