"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";
import type { Translations } from "@/lib/i18n";
import { DUR, STAGGER, reveal } from "@/lib/motion-tokens";

/**
 * 第二节：这是什么。
 *
 * 标题是品类锚，首屏原来那一句挪到了这里；正文是起一卦的三步，一步一格。
 * 序号是装饰，用 aria-hidden 藏掉，读屏软件读到的就是三句话本身。
 */
export function WhatItIs({ t }: { t: Translations }): ReactNode {
  return (
    <section
      id="what"
      className="bg-background relative w-full scroll-mt-28 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <motion.h2
          {...reveal()}
          className="text-foreground mx-auto max-w-3xl text-center font-serif text-2xl leading-snug font-medium text-balance sm:text-3xl md:text-4xl"
        >
          {t.whatItIs.title}
        </motion.h2>

        <ol className="mt-16 grid grid-cols-1 gap-10 sm:mt-20 sm:grid-cols-3 sm:gap-8">
          {t.whatItIs.steps.map((step, index) => (
            <motion.li
              key={step}
              {...reveal(index * STAGGER.grid, { duration: DUR.base })}
              className="flex flex-col items-center text-center sm:items-start sm:text-left"
            >
              <span
                aria-hidden="true"
                className="text-accent font-serif text-4xl leading-none font-medium sm:text-5xl"
              >
                {index + 1}
              </span>
              <p className="text-foreground/80 mt-5 text-lg leading-relaxed">
                {step}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
