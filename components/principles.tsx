"use client";

import { type ReactNode } from "react";
import {
  Sparkles,
  Heart,
  ShieldCheck,
  WifiOff,
  Palette,
  ArrowRight,
} from "lucide-react";
import { motion } from "motion/react";
import type { Translations } from "@/lib/i18n";

const ease = [0.16, 1, 0.3, 1] as const;

const principleIcons = [
  <Heart key="heart" className="h-12 w-12" strokeWidth={1} />,
  <ShieldCheck key="shield" className="h-12 w-12" strokeWidth={1} />,
  <WifiOff key="offline" className="h-12 w-12" strokeWidth={1} />,
  <Palette key="palette" className="h-12 w-12" strokeWidth={1} />,
];

export function Principles({
  t,
  locale,
}: {
  t: Translations;
  locale: string;
}): ReactNode {
  return (
    <section className="bg-muted text-foreground relative w-full py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
              className="mb-6 flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">{t.principles.badge}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="font-serif text-3xl leading-tight font-medium sm:text-4xl lg:text-5xl"
            >
              {t.principles.title1}{" "}
              <span className="italic">{t.principles.title2}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
              className="text-foreground/70 mt-6 max-w-lg leading-relaxed"
            >
              {t.principles.description}
            </motion.p>

            <motion.a
              href={`/${locale}/privacy`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
              className="group bg-foreground text-background hover:bg-foreground/90 mt-8 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors"
            >
              {t.principles.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </motion.a>
          </div>

          <div className="grid max-w-md grid-cols-2 gap-2 lg:ml-auto">
            {t.principles.cards.map((label, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index, ease }}
                className="bg-foreground/5 flex aspect-square flex-col items-center justify-center rounded-sm"
              >
                <div className="text-foreground/80 mb-4">
                  {principleIcons[index]}
                </div>
                <p className="text-foreground/80 px-4 text-center text-sm">
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
