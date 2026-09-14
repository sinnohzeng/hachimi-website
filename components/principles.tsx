"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";
import type { Translations } from "@/lib/i18n";
import { DUR, STAGGER, reveal } from "@/lib/motion-tokens";

/**
 * 第六节：本机算。一句加三个标签。
 *
 * 第二版这里是四张带图标的方块加一段说明加一个进隐私政策的按钮。第三版只留一句与
 * 三个词，隐私政策的入口页脚已经有了，不必在这里再设一个。
 */
export function Principles({ t }: { t: Translations }): ReactNode {
  return (
    <section
      id="offline"
      className="bg-background text-foreground w-full scroll-mt-28 py-24 sm:py-32"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center sm:px-8">
        <motion.p
          {...reveal()}
          className="font-serif text-2xl leading-snug font-medium text-balance sm:text-3xl md:text-4xl"
        >
          {t.principles.text}
        </motion.p>

        <ul className="mt-10 flex flex-wrap justify-center gap-3">
          {t.principles.tags.map((tag, index) => (
            <motion.li
              key={tag}
              {...reveal(index * STAGGER.tight, { duration: DUR.base })}
              className="border-foreground/15 text-foreground/70 rounded-full border px-4 py-2 text-sm"
            >
              {tag}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
