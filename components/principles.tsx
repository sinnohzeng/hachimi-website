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
  <Heart key="heart" className="w-12 h-12" strokeWidth={1} />,
  <ShieldCheck key="shield" className="w-12 h-12" strokeWidth={1} />,
  <WifiOff key="offline" className="w-12 h-12" strokeWidth={1} />,
  <Palette key="palette" className="w-12 h-12" strokeWidth={1} />,
];

export function Principles({
  t,
  locale,
}: {
  t: Translations;
  locale: string;
}): ReactNode {
  return (
    <section className="relative w-full bg-muted text-foreground py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
              className="flex items-center gap-2 mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">{t.principles.badge}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="text-3xl sm:text-4xl lg:text-5xl font-medium font-serif leading-tight"
            >
              {t.principles.title1}{" "}
              <span className="italic">{t.principles.title2}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
              className="mt-6 text-foreground/70 leading-relaxed max-w-lg"
            >
              {t.principles.description}
            </motion.p>

            <motion.a
              href={`/${locale}/privacy`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
              className="group inline-flex items-center gap-2 mt-8 px-6 py-3 bg-foreground text-background rounded-full text-sm font-medium w-fit hover:bg-foreground/90 transition-colors"
            >
              {t.principles.cta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.a>
          </div>

          <div className="grid grid-cols-2 gap-2 max-w-md lg:ml-auto">
            {t.principles.cards.map((label, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index, ease }}
                className="aspect-square flex flex-col items-center justify-center bg-foreground/5 rounded-sm"
              >
                <div className="mb-4 text-foreground/80">
                  {principleIcons[index]}
                </div>
                <p className="text-sm text-center text-foreground/80 px-4">
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
