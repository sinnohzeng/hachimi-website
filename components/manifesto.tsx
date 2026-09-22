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

/**
 * 第二节：定位（#what）。整节只有那句品类锚，随滚动逐字点亮。
 *
 * 切分与盘古之白的处理都用 components/reveal-headline.tsx 那两个帮手，逐字动效全
 * 站一套判据。
 *
 * 这一节不按标点归词组、也不加 zh-display：那句话三十来字，最长的一段没有标点也
 * 有十五个字，手机上一整段塞不进一行，按字折才不横向溢出。收尾标点仍并进前一个
 * 字，不会折到行首。
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
  const tokens = tokenizeForReveal(text);

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
            text
          ) : (
            <>
              <span className="sr-only">{text}</span>
              <span aria-hidden="true">
                {tokens.map((token, i) => (
                  <Token
                    key={`${token}-${i}`}
                    token={token}
                    index={i}
                    total={tokens.length}
                    progress={scrollYProgress}
                  />
                ))}
              </span>
            </>
          )}
        </p>
      </div>
    </section>
  );
}
