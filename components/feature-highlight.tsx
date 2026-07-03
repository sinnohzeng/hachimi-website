"use client";

import { type ReactNode } from "react";
import { ArrowRight, Shapes, Sparkles, Smartphone } from "lucide-react";
import { motion } from "motion/react";
import type { Translations } from "@/lib/i18n";

const ease = [0.16, 1, 0.3, 1] as const;

const featureIcons = [
  <Shapes key="cast" className="w-4 h-4" />,
  <Sparkles key="reading" className="w-4 h-4" />,
  <Smartphone key="local" className="w-4 h-4" />,
];

export function FeatureHighlight({
  t,
  locale,
}: {
  t: Translations;
  locale: string;
}): ReactNode {
  return (
    <section className="relative w-full bg-background pb-24 sm:pb-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-stretch">
          <div className="flex flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="text-3xl sm:text-4xl lg:text-5xl font-medium font-serif leading-tight text-foreground"
            >
              {t.featureHighlight.title1}
              <br />
              <span className="italic">{t.featureHighlight.title2}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="mt-6 text-foreground/70 leading-relaxed max-w-lg"
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
                  <span className="shrink-0 mt-0.5 text-foreground/60">
                    {featureIcons[index]}
                  </span>
                  <span className="text-foreground/80">{feature}</span>
                </li>
              ))}
            </motion.ul>

            <motion.a
              href="#features"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
              className="group inline-flex items-center gap-2 mt-10 text-foreground font-medium hover:opacity-70 transition-opacity"
            >
              {t.featureHighlight.cta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="flex justify-center lg:justify-end h-full"
          >
            <div className="relative bg-accent/5 rounded-md border border-accent/10 pt-10 px-16 overflow-hidden h-full flex flex-col">
              <div className="relative w-full max-w-70 mx-auto flex-1 flex flex-col">
                <div className="relative bg-neutral-900 rounded-t-4xl pt-1 px-1 flex-1 flex flex-col">
                  <div className="bg-neutral-950 rounded-t-[1.75rem] flex-1 overflow-hidden min-h-100">
                    <img
                      src={`/screenshots/${locale}/result.webp`}
                      alt={t.featureHighlight.phonePlaceholder}
                      width={720}
                      height={1565}
                      loading="lazy"
                      decoding="async"
                      className="block w-full h-auto object-top select-none"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-accent/5 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
