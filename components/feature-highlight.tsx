"use client";

import { type ReactNode } from "react";
import { ArrowRight, Shapes, Sparkles, Smartphone } from "lucide-react";
import { motion } from "motion/react";
import type { Translations } from "@/lib/i18n";

const ease = [0.16, 1, 0.3, 1] as const;

const featureIcons = [
  <Shapes key="cast" className="h-4 w-4" />,
  <Sparkles key="reading" className="h-4 w-4" />,
  <Smartphone key="local" className="h-4 w-4" />,
];

export function FeatureHighlight({
  t,
  locale,
}: {
  t: Translations;
  locale: string;
}): ReactNode {
  return (
    <section className="bg-background relative w-full overflow-hidden pb-24 sm:pb-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid grid-cols-1 items-stretch gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="text-foreground font-serif text-3xl leading-tight font-medium sm:text-4xl lg:text-5xl"
            >
              {t.featureHighlight.title1}{" "}
              <span className="italic">{t.featureHighlight.title2}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="text-foreground/70 mt-6 max-w-lg leading-relaxed"
            >
              {t.featureHighlight.description}
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
              className="mt-8 space-y-4"
            >
              {t.featureHighlight.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-foreground/60 mt-0.5 shrink-0">
                    {featureIcons[index]}
                  </span>
                  <span className="text-foreground/80">{feature}</span>
                </li>
              ))}
            </motion.ul>

            <motion.a
              href={`/${locale}/methodology`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
              className="group text-foreground mt-10 inline-flex items-center gap-2 font-medium transition-opacity hover:opacity-70"
            >
              {t.featureHighlight.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="flex h-full justify-center lg:justify-end"
          >
            <div className="bg-accent/5 border-accent/10 relative flex h-full flex-col overflow-hidden rounded-md border px-16 pt-10">
              <div className="relative mx-auto flex w-full max-w-70 flex-1 flex-col">
                <div className="relative flex flex-1 flex-col rounded-t-4xl bg-neutral-900 px-1 pt-1">
                  <div className="min-h-100 flex-1 overflow-hidden rounded-t-[1.75rem] bg-neutral-950">
                    <img
                      src={`/screenshots/${locale}/result.webp`}
                      alt={t.featureHighlight.phonePlaceholder}
                      width={720}
                      height={1565}
                      loading="lazy"
                      decoding="async"
                      className="block h-auto w-full object-top select-none"
                    />
                  </div>
                </div>
              </div>
              <div className="from-accent/5 pointer-events-none absolute right-0 bottom-0 left-0 h-16 bg-linear-to-t to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
