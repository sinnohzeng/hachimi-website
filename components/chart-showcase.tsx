"use client";

import { type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { AppShot, type ShotName } from "@/components/app-shot";
import type { Translations } from "@/lib/i18n";
import { DUR, STAGGER, reveal } from "@/lib/motion-tokens";

/**
 * 第四节：排一张盘。紫微与八字各一句一图，末尾一条链接进方法页。
 *
 * 第二版这一节有三个 block、九条 bullet、一段 body，讲到了三种盘式、格局规则条数、
 * 安星设置十组这些机制。第三版整节只留两句，机制全部搬去方法页的排盘一节，链接就是
 * 那条通道。要往回加句子先看 specs/001-site-v3-concise/spec.md 的字数账。
 */
export function ChartShowcase({
  locale,
  t,
}: {
  locale: string;
  t: Translations;
}): ReactNode {
  const cells: readonly { shot: ShotName; text: string; alt: string }[] = [
    { shot: "ziwei-sanhe", text: t.chart.ziwei, alt: t.chart.shotAlts.ziwei },
    { shot: "bazi-pillars", text: t.chart.bazi, alt: t.chart.shotAlts.bazi },
  ];

  return (
    <section
      id="chart"
      className="bg-background text-foreground relative w-full scroll-mt-28 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <motion.h2
          {...reveal()}
          className="text-center font-serif text-3xl leading-tight font-medium text-balance sm:text-4xl lg:text-5xl"
        >
          {t.chart.title}
        </motion.h2>
        <motion.p
          {...reveal(0.1, { duration: DUR.base })}
          className="text-foreground/80 mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-balance"
        >
          {t.chart.lead}
        </motion.p>

        <div className="mt-16 grid grid-cols-1 gap-14 sm:mt-20 sm:grid-cols-2 sm:gap-10">
          {cells.map((cell, index) => (
            <motion.div
              key={cell.shot}
              {...reveal(index * STAGGER.grid, { duration: DUR.base })}
              className="flex flex-col items-center"
            >
              <AppShot
                name={cell.shot}
                alt={cell.alt}
                sizes="(min-width: 640px) 240px, 60vw"
                className="w-52 sm:w-60"
              />
              <p className="text-foreground/80 mt-8 max-w-xs text-center leading-relaxed text-balance">
                {cell.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...reveal(0.2, { duration: DUR.base })}
          className="mt-14 text-center"
        >
          <a
            href={`/${locale}/methodology#paipan`}
            className="group text-foreground/70 hover:text-foreground inline-flex items-center gap-1.5 py-3 text-sm font-medium transition-colors"
          >
            {t.chart.cta}
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
