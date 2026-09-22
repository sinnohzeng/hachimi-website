"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, type Transition } from "motion/react";
import { Plus } from "lucide-react";
import { keepPanguSpaces } from "@/components/reveal-headline";
import type { Translations } from "@/lib/i18n";
import { useReducedMotion } from "@/lib/motion";
import { DUR, EASE, STAGGER, reveal } from "@/lib/motion-tokens";

/**
 * 第四节：四件工具（#tools）。
 *
 * 卡面只有名字与一句，机制事实藏在展开层里，点开才见。四张卡与展开文字全部来自
 * i18n 的 tools.cards，组件里不写一个字的文案。
 *
 * 开合的可达性：卡本身是 button，带 aria-expanded 与 aria-controls；展开层是
 * role="dialog" 的模态，aria-labelledby 指向卡名，Esc 关闭，关闭后焦点回到原来
 * 那张卡。减弱动态时 layoutId 变形关掉，直接换内容。
 */
const MORPH: Transition = { duration: 0.5, ease: EASE };

/**
 * layoutId 只在动效开着时给：tsconfig 开了 exactOptionalPropertyTypes，传
 * `layoutId={undefined}` 与不传不是一回事，得整条属性有无。
 */
function morphId(enabled: boolean, id: string): { layoutId?: string } {
  return enabled ? { layoutId: id } : {};
}

export function ToolCards({ t }: { t: Translations }): ReactNode {
  const reducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setOpenIndex((current) => {
      if (current !== null) cardRefs.current[current]?.focus();
      return null;
    });
  }, []);

  // Esc 关闭。展开层是模态，页面滚动同时锁住。
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [openIndex, close]);

  const openCard = openIndex === null ? null : t.tools.cards[openIndex];

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
              <motion.button
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-expanded={openIndex === index}
                aria-controls="tool-card-detail"
                {...morphId(!reducedMotion, `tool-card-${index}`)}
                transition={MORPH}
                style={{
                  visibility: openIndex === index ? "hidden" : "visible",
                }}
                className="focus-ring border-foreground/10 bg-background hover:border-foreground/25 flex h-full w-full cursor-pointer flex-col justify-between gap-8 rounded-2xl border p-6 text-left transition-colors"
              >
                <motion.h3
                  {...morphId(!reducedMotion, `tool-card-name-${index}`)}
                  transition={MORPH}
                  className="font-serif text-xl leading-tight font-medium"
                >
                  {card.name}
                </motion.h3>
                <div className="flex items-end justify-between gap-4">
                  <motion.p
                    {...morphId(!reducedMotion, `tool-card-line-${index}`)}
                    transition={MORPH}
                    className="zh-display text-foreground/65 text-sm leading-relaxed"
                  >
                    {keepPanguSpaces(card.line)}
                  </motion.p>
                  <span
                    aria-hidden="true"
                    className="border-foreground/15 text-foreground/70 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border"
                  >
                    <Plus className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                </div>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openCard && openIndex !== null ? (
          <div className="fixed inset-0 z-1005 flex items-center justify-center p-5 sm:p-10">
            {/* 控件名按仓内既有做法写英文（见 header.tsx 的 Close menu），
                它不是版面上的字，不进事实稿也不进字数门。 */}
            <motion.button
              type="button"
              aria-label="Close"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DUR.fast, ease: EASE }}
              className="bg-background/70 absolute inset-0 cursor-default backdrop-blur-xl"
            />
            <motion.div
              id="tool-card-detail"
              role="dialog"
              aria-modal="true"
              aria-labelledby="tool-card-detail-name"
              {...morphId(!reducedMotion, `tool-card-${openIndex}`)}
              transition={MORPH}
              className="border-foreground/10 bg-background relative z-10 w-full max-w-2xl rounded-2xl border p-7 sm:p-10"
            >
              <motion.h3
                id="tool-card-detail-name"
                {...morphId(!reducedMotion, `tool-card-name-${openIndex}`)}
                transition={MORPH}
                className="font-serif text-2xl leading-tight font-medium sm:text-3xl"
              >
                {openCard.name}
              </motion.h3>
              <motion.p
                {...morphId(!reducedMotion, `tool-card-line-${openIndex}`)}
                transition={MORPH}
                className="zh-display text-foreground/65 mt-3 text-sm leading-relaxed"
              >
                {keepPanguSpaces(openCard.line)}
              </motion.p>
              <motion.p
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DUR.fast, delay: 0.16, ease: EASE }}
                className="text-foreground/80 mt-6 leading-relaxed"
              >
                {keepPanguSpaces(openCard.detail)}
              </motion.p>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close"
                className="focus-ring border-foreground/15 text-foreground/70 hover:text-foreground mt-8 inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
              >
                <Plus
                  className="h-4 w-4 rotate-45"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </button>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
