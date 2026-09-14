"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";
import type { Translations } from "@/lib/i18n";
import { reveal } from "@/lib/motion-tokens";

/**
 * 第三节：道长记得。整节只有一句差异句，这是全站唯一一处讲“凭什么不是通用 AI”。
 *
 * 节高按 spec 压在一屏三分之一以内：一行正文加上下内边距，1440 × 900 下约 240px，
 * 390 × 844 下约 220px。要加东西先算这笔账，别让它长回一节图文。
 */
export function Remembers({ t }: { t: Translations }): ReactNode {
  return (
    <section className="bg-muted text-foreground w-full py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        <motion.p
          {...reveal()}
          className="text-center font-serif text-xl leading-relaxed font-medium text-balance sm:text-2xl md:text-3xl"
        >
          {t.remembers.text}
        </motion.p>
      </div>
    </section>
  );
}
