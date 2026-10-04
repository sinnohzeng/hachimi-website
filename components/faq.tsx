"use client";

import type { ReactNode } from "react";
import { Plus, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { keepPanguSpaces } from "@/components/reveal-headline";
import { siteConfig } from "@/lib/config";
import type { Translations } from "@/lib/i18n";
import { DUR, STAGGER, reveal } from "@/lib/motion-tokens";

/**
 * 第六节：常见问题（#faq）。
 *
 * 原生 `<details name="faq">` 手风琴：同名的几条互斥，答案常驻静态 HTML，不开 JS、页内查找
 * 与抓取器都读得到，与 FaqStructuredData 标注的是同一份字。展开动画由 globals.css 的
 * `.faq-item::details-content` 做，浏览器不支持时直接开合。条目全部来自 i18n。
 */
export function FAQ({ t }: { t: Translations }): ReactNode {
  return (
    <section
      id="faq"
      className="bg-background relative w-full scroll-mt-28 overflow-hidden py-24 sm:py-32"
    >
      <div className="relative mx-auto max-w-7xl px-0 xl:px-12">
        <div className="px-8 sm:px-12">
          <div className="mb-12 max-w-2xl">
            <motion.h2
              {...reveal()}
              className="text-foreground font-serif text-3xl leading-tight font-medium sm:text-4xl lg:text-5xl"
            >
              {t.faq.title}
            </motion.h2>
          </div>

          <div className="border-foreground/10 border-t">
            {t.faq.items.map((item, index) => (
              <motion.div
                key={item.question}
                {...reveal(index * STAGGER.grid, { duration: DUR.base })}
                className="border-foreground/10 border-b"
              >
                <details name="faq" className="faq-item group">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-6 text-left [&::-webkit-details-marker]:hidden">
                    <span className="text-foreground pr-8 text-base font-medium sm:text-lg">
                      {item.question}
                    </span>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center">
                      <Plus
                        className="text-foreground/60 group-hover:text-foreground h-5 w-5 transition-[color,rotate] duration-200 group-open:rotate-45"
                        aria-hidden="true"
                      />
                    </span>
                  </summary>
                  <p className="text-foreground/60 max-w-2xl pb-6 leading-relaxed">
                    {keepPanguSpaces(item.answer)}
                  </p>
                </details>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...reveal(0.2, { duration: DUR.base })}
            className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <p className="text-foreground/60">{t.faq.stillHaveQuestions}</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="group text-foreground inline-flex items-center gap-2 font-medium transition-opacity hover:opacity-70"
            >
              {t.faq.contact}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
