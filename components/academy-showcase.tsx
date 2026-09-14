"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";
import type { Translations } from "@/lib/i18n";
import { reveal } from "@/lib/motion-tokens";

/**
 * 第五节：学堂。一句，不配图。
 *
 * spec 明写学堂不配图，等学堂改版落地后另起一刀补一张根屏图，到那时把 AppShot 加
 * 回来即可，文案那一句不动。
 */
export function AcademyShowcase({ t }: { t: Translations }): ReactNode {
  return (
    <section
      id="academy"
      className="bg-muted text-foreground w-full scroll-mt-28 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        <motion.p
          {...reveal()}
          className="text-center font-serif text-xl leading-relaxed font-medium text-balance sm:text-2xl md:text-3xl"
        >
          {t.academy.text}
        </motion.p>
      </div>
    </section>
  );
}
