"use client";

import { type ReactNode } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import type { Translations } from "@/lib/i18n";
import { MARGIN, STAGGER, reveal } from "@/lib/motion-tokens";

// 本页统一走共享 reveal()，长文页用更早的 -80px 视口提前量。
function fade(delay = 0) {
  return reveal(delay, { margin: MARGIN.early });
}

/**
 * 排盘的规矩（/{locale}/methodology）：页首一段，下面逐条讲各家软件最容易排得不一样
 * 的几处，收尾一句加一枚指向 /{locale}/get 的按钮。
 */
export function Methodology({
  t,
  locale,
}: {
  t: Translations;
  locale: string;
}): ReactNode {
  const m = t.methodology;

  return (
    <div className="relative w-full">
      {/* ---- Hero ---- */}
      <section className="bg-background relative w-full overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div
          aria-hidden="true"
          className="from-accent/[0.07] pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b to-transparent"
        />
        <div className="relative mx-auto max-w-3xl px-6 sm:px-8">
          <motion.div {...fade()} className="flex items-center gap-2">
            <Sparkles className="text-accent h-4 w-4" strokeWidth={1.5} />
            <span className="text-foreground/60 text-sm font-medium">
              {m.badge}
            </span>
          </motion.div>
          <motion.h1
            {...fade(0.05)}
            className="text-foreground mt-6 font-serif text-4xl leading-tight font-medium sm:text-5xl"
          >
            {/* 全角标点自带字宽，后面不再补空格。 */}
            {m.title1}
            {/[，。、；：]$/u.test(m.title1) ? "" : " "}
            <span className="italic">{m.title2}</span>
          </motion.h1>
          <motion.p
            {...fade(0.1)}
            className="text-foreground/70 mt-6 text-base leading-relaxed sm:text-lg"
          >
            {m.intro}
          </motion.p>
          {/* 可见"最后更新"：与 lib/config.ts 的 pageDates.methodology 保持一致
              （AI 引擎信息保鲜的日期信号，页面可见文本与机器可读日期须相同）。 */}
          <motion.p {...fade(0.15)} className="text-foreground/40 mt-6 text-sm">
            {m.lastUpdated}
          </motion.p>
        </div>
      </section>

      {/* ---- 逐条的规矩 ---- */}
      <section className="border-border bg-muted/40 relative w-full border-t py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <div className="space-y-8">
            {m.points.map((p, i) => (
              <motion.div
                key={p.term}
                {...fade(0.1 + i * STAGGER.list)}
                className="flex gap-4"
              >
                <span
                  aria-hidden="true"
                  className="bg-accent mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                />
                <div>
                  <h2 className="text-foreground font-serif text-lg font-medium sm:text-xl">
                    {p.term}
                  </h2>
                  <p className="text-foreground/65 mt-1.5 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Closing ---- */}
      <section className="border-border bg-background relative w-full border-t py-20 sm:py-28">
        <div className="mx-auto max-w-2xl px-6 text-center sm:px-8">
          <motion.p
            {...fade()}
            className="text-foreground font-serif text-xl leading-relaxed font-medium sm:text-2xl"
          >
            {m.closing.text}
          </motion.p>
          <motion.div {...fade(0.1)} className="mt-8 flex justify-center">
            <a
              href={`/${locale}/get`}
              className="group bg-foreground text-background hover:bg-foreground/85 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors"
            >
              {m.closing.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
