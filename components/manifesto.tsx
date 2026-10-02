"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  keepPanguSpaces,
  tokenizeForReveal,
} from "@/components/reveal-headline";
import type { Translations } from "@/lib/i18n";
import { useReducedMotion } from "@/lib/motion";
import { DUR, STAGGER, reveal } from "@/lib/motion-tokens";

/**
 * 第二节：定位（#what）。首屏一过先说给谁用，再讲三件事：录一次生辰两张盘一起出、
 * 命例的同步与备份、盘式与六柱。第一句随滚动逐字点亮，三件事各一张小卡在下面进场。
 *
 * 切分与盘古之白的处理都用 components/reveal-headline.tsx 那两个帮手，逐字动效全
 * 站一套判据。
 *
 * 第一句逐字点亮，单位就是字，收尾标点并进前一个字，不会折到行首。断行写死在
 * 文案的 titleLines 里：每行是一只行内块，块里不折，宽屏上几块并排成一行，窄屏上
 * 只在块与块之间换行，不会把“命理爱好者”折成两半。英文只有一块，块比屏宽时在词
 * 与词之间折。三张小卡的标题走 zh-display，只在标点处折。
 *
 * 减弱动态直接整句显示；动效开着时正文交给 sr-only，动的那份 aria-hidden，读屏
 * 读到的永远是完整一句。
 */
function Token({
  token,
  index,
  total,
  progress,
}: {
  token: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}): ReactNode {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block whitespace-pre">
      {token}
    </motion.span>
  );
}

export function Manifesto({ t }: { t: Translations }): ReactNode {
  const ref = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });

  const text = keepPanguSpaces(t.what.title);
  const lines = t.what.titleLines.map((line) => keepPanguSpaces(line));
  const lineTokens = lines.map((line) => tokenizeForReveal(line));
  const total = lineTokens.reduce((n, tokens) => n + tokens.length, 0);
  const offsets = lineTokens.map((_, li) =>
    lineTokens.slice(0, li).reduce((n, tokens) => n + tokens.length, 0)
  );

  return (
    <section
      id="what"
      className="bg-background relative w-full scroll-mt-28 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <p
          ref={ref}
          className="text-foreground mx-auto max-w-3xl text-center font-serif text-2xl leading-snug font-medium text-balance sm:text-3xl md:text-4xl"
        >
          {reducedMotion ? (
            lines.map((line) => (
              <span key={line} className="inline-block">
                {line}
              </span>
            ))
          ) : (
            <>
              <span className="sr-only">{text}</span>
              <span aria-hidden="true">
                {lineTokens.map((tokens, li) => (
                  <span key={lines[li]} className="inline-block">
                    {tokens.map((token, i) => (
                      <Token
                        key={`${token}-${i}`}
                        token={token}
                        index={(offsets[li] ?? 0) + i}
                        total={total}
                        progress={scrollYProgress}
                      />
                    ))}
                  </span>
                ))}
              </span>
            </>
          )}
        </p>

        <ul className="mt-16 grid gap-8 sm:mt-20 sm:grid-cols-3 sm:gap-6">
          {t.what.items.map((item, index) => (
            <motion.li
              key={item.title}
              {...reveal(index * STAGGER.tight, { duration: DUR.base })}
              className="border-foreground/15 border-t pt-6"
            >
              <h3 className="zh-display font-serif text-xl leading-snug font-medium sm:text-2xl">
                {keepPanguSpaces(item.title)}
              </h3>
              <p className="text-foreground/70 mt-3 text-base leading-relaxed">
                {keepPanguSpaces(item.body)}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
