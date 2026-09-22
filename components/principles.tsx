"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";
import type { Translations } from "@/lib/i18n";
import { DUR, STAGGER, reveal } from "@/lib/motion-tokens";

/**
 * 第七节：本机（#offline）。一句加四个标签，关在一只细线框里。
 *
 * 线框是 wireframe 模板那套语言：一圈 1px 边，四角各压一个 7px 的小方块。页脚手写
 * 过同一套，这里就近再写一份，不抽公共件：两处的尺寸与留白并不相同，抽出来反倒要
 * 加参数。
 */
function FrameCorners(): ReactNode {
  return (
    <>
      {[
        "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
        "top-0 right-0 translate-x-1/2 -translate-y-1/2",
        "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
        "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
      ].map((position) => (
        <span
          key={position}
          aria-hidden="true"
          className={`border-foreground/25 bg-background pointer-events-none absolute z-10 h-[7px] w-[7px] border ${position}`}
        />
      ))}
    </>
  );
}

export function Principles({ t }: { t: Translations }): ReactNode {
  return (
    <section
      id="offline"
      className="bg-background text-foreground w-full scroll-mt-28 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <div className="border-foreground/15 relative border px-6 py-16 sm:px-12 sm:py-20">
          <FrameCorners />
          <motion.p
            {...reveal()}
            className="zh-display text-center font-serif text-2xl leading-snug font-medium text-balance sm:text-3xl md:text-4xl"
          >
            {t.offline.text}
          </motion.p>

          <ul className="mt-10 flex flex-wrap justify-center gap-3">
            {t.offline.tags.map((tag, index) => (
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
      </div>
    </section>
  );
}
