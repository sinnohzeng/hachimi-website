"use client";

import { useRef, type ReactNode } from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { keepPanguSpaces } from "@/components/reveal-headline";
import type { Translations } from "@/lib/i18n";
import { DUR, STAGGER, reveal } from "@/lib/motion-tokens";

/**
 * 第四节：四件工具（#tools）。
 *
 * 卡面只有名字与一句，机制事实在每张卡自己的 `<dialog>` 里。四个 dialog 随页面一起进静态
 * HTML，不开 JS、页内查找与抓取器都读得到；点卡用 `showModal()` 打开：背景 inert、Esc 关、
 * 焦点留在框里、关闭后回到那张卡，页面滚动由 globals.css 的 `html:has(dialog:modal)` 锁住。
 * 四张卡与展开文字全部来自 i18n 的 tools.cards，组件里不写一个字的文案。
 */
export function ToolCards({ t }: { t: Translations }): ReactNode {
  const dialogs = useRef<(HTMLDialogElement | null)[]>([]);

  return (
    <section
      id="tools"
      className="bg-muted text-foreground w-full scroll-mt-28 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <motion.h2
          {...reveal()}
          className="text-center font-serif text-3xl leading-tight font-medium text-balance sm:text-4xl lg:text-5xl"
        >
          {t.tools.title}
        </motion.h2>
        <motion.p
          {...reveal(0.1, { duration: DUR.base })}
          className="zh-display text-foreground/60 mt-4 text-center text-sm"
        >
          {t.tools.hint}
        </motion.p>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.tools.cards.map((card, index) => (
            <motion.div
              key={card.name}
              {...reveal(index * STAGGER.grid, { duration: DUR.base })}
            >
              <button
                type="button"
                onClick={() => dialogs.current[index]?.showModal()}
                aria-haspopup="dialog"
                aria-controls={`tool-card-detail-${index}`}
                className="focus-ring border-foreground/10 bg-background hover:border-foreground/25 flex h-full w-full cursor-pointer flex-col justify-between gap-8 rounded-2xl border p-6 text-left transition-colors"
              >
                <h3 className="font-serif text-xl leading-tight font-medium">
                  {card.name}
                </h3>
                <div className="flex items-end justify-between gap-4">
                  <p className="zh-display text-foreground/65 text-sm leading-relaxed">
                    {keepPanguSpaces(card.line)}
                  </p>
                  <span
                    aria-hidden="true"
                    className="border-foreground/15 text-foreground/70 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border"
                  >
                    <Plus className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {t.tools.cards.map((card, index) => (
        <dialog
          key={card.name}
          ref={(node) => {
            dialogs.current[index] = node;
          }}
          id={`tool-card-detail-${index}`}
          aria-labelledby={`tool-card-detail-name-${index}`}
          className="site-modal border-foreground/10 bg-background text-foreground w-[calc(100%-2.5rem)] max-w-2xl rounded-2xl border p-7 sm:p-10"
          onClick={(event) => {
            // 点在框外（::backdrop 算 dialog 自己）即关。
            if (event.target === event.currentTarget)
              event.currentTarget.close();
          }}
        >
          <h3
            id={`tool-card-detail-name-${index}`}
            className="font-serif text-2xl leading-tight font-medium sm:text-3xl"
          >
            {card.name}
          </h3>
          <p className="zh-display text-foreground/65 mt-3 text-sm leading-relaxed">
            {keepPanguSpaces(card.line)}
          </p>
          <p className="text-foreground/80 mt-6 leading-relaxed">
            {keepPanguSpaces(card.detail)}
          </p>
          <form method="dialog">
            <button
              type="submit"
              aria-label={t.a11y.close}
              className="focus-ring border-foreground/15 text-foreground/70 hover:text-foreground mt-8 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border transition-colors"
            >
              <Plus
                className="h-4 w-4 rotate-45"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </button>
          </form>
        </dialog>
      ))}
    </section>
  );
}
