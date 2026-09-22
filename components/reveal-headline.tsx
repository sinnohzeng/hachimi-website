"use client";

import { type ReactNode } from "react";
import { motion, type Variants } from "motion/react";
import type { Translations } from "@/lib/i18n";
import { useReducedMotion } from "@/lib/motion";
import { DUR, EASE, MARGIN } from "@/lib/motion-tokens";

/**
 * 逐字揭示的大标题，外加两个中文排版的字串帮手。
 *
 * 帮手放在这里是因为逐字切分本来就是这个文件的活，manifesto 那一节只是同一件事
 * 的另一种用法，两处共用一份，省得两边各写一遍再漂掉。
 */

/** 收尾标点：不能出现在行首（GB/T 15834 的避头尾）。 */
const NO_BREAK_BEFORE = /[，。、！？；：）〕】｝」』〉》”’·…%,.!?;:)\]}]/u;

/**
 * 盘古之白换成不换行空格。
 *
 * 中文与拉丁、数字之间那个空格是排版留白，不是断行机会：“154 本古籍”折成两行就
 * 读成了两个东西。英文词与词之间的空格照旧可断。
 */
export function keepPanguSpaces(text: string): string {
  return text
    .replace(/(?<=[㐀-䶿一-鿿]) +(?=[A-Za-z0-9])/g, " ")
    .replace(/(?<=[A-Za-z0-9]) +(?=[㐀-䶿一-鿿])/g, " ");
}

/**
 * 逐字动效的切分。连续拉丁串或数字算一个单位，其余一字一个：中文没有空格，按字切
 * 才是人读的单位；英文按同一条规则自然落成按词。
 *
 * 两处并单位：收尾标点并进前一个，不然它会折到行首；不换行空格连同它两边的字一起
 * 并成一个，不然“154”与“本古籍”之间照样断得开——每个单位各是一只行内盒子，浏
 * 览器可以在任意两只之间折行，CSS 的 keep-all 与 nbsp 都管不到盒子之间。
 */
export function tokenizeForReveal(text: string): string[] {
  const raw = text.match(/[A-Za-z0-9]+|\s|./gu) ?? [];
  const merged: string[] = [];

  for (let i = 0; i < raw.length; i += 1) {
    const unit = raw[i] ?? "";
    const last = merged.length - 1;

    if (last >= 0 && NO_BREAK_BEFORE.test(unit)) {
      merged[last] = (merged[last] ?? "") + unit;
      continue;
    }
    if (unit === " ") {
      const next = raw[i + 1] ?? "";
      if (last >= 0) {
        merged[last] = (merged[last] ?? "") + unit + next;
        i += 1;
        continue;
      }
    }
    merged.push(unit);
  }

  return merged;
}

/**
 * 按标点把单位归成不折行的词组：一句话只在逗号、句号、顿号与英文空格处折。
 *
 * 一组塞不下整行时就不归组，让它按字折，宁可断得不讲究也不横向溢出。
 */
const MAX_NOWRAP_UNITS = 12;

function groupForReveal(units: string[]): string[][] {
  const groups: string[][] = [];
  let current: string[] = [];

  for (const unit of units) {
    current.push(unit);
    const closes = NO_BREAK_BEFORE.test(unit.slice(-1)) || /^\s$/.test(unit);
    if (closes) {
      groups.push(current);
      current = [];
    }
  }
  if (current.length > 0) groups.push(current);

  return groups.flatMap((group) =>
    group.length > MAX_NOWRAP_UNITS ? group.map((unit) => [unit]) : [group]
  );
}

const CONTAINER: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const TOKEN: Variants = {
  hidden: { y: "110%" },
  visible: { y: 0, transition: { duration: DUR.slow, ease: EASE } },
};

/**
 * 逐字（英文逐词）从遮罩下抬起的大标题。道长记得那一句与收尾那一句共用它。
 *
 * 动的是字本身而不是盖在字上的挡板：挡板方案在 JS 失效时会一直盖着，字永远出不
 * 来；抬字方案带 data-animate，globals.css 的无 JS 救援把 transform 清零即还原。
 */
export function RevealHeadline({
  text,
  as: Tag = "h2",
  className = "",
  id,
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  id?: string;
}): ReactNode {
  const reducedMotion = useReducedMotion();
  const spaced = keepPanguSpaces(text);

  if (reducedMotion) {
    return (
      <Tag id={id} className={className}>
        {spaced}
      </Tag>
    );
  }

  return (
    <Tag id={id} className={className}>
      <span className="sr-only">{spaced}</span>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: MARGIN.early }}
        variants={CONTAINER}
        className="inline"
      >
        {groupForReveal(tokenizeForReveal(spaced)).map((group, gi) => (
          <span
            key={`${group.join("")}-${gi}`}
            className="inline-flex align-baseline whitespace-nowrap"
          >
            {group.map((unit, i) => (
              <span
                key={`${unit}-${i}`}
                className="-mb-[0.14em] inline-flex overflow-hidden pb-[0.14em]"
              >
                <motion.span
                  variants={TOKEN}
                  data-animate=""
                  className="inline-block whitespace-pre"
                >
                  {unit}
                </motion.span>
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/**
 * 第五节：道长记得。整节只有这一句差异句，全站唯一一处讲“凭什么不是通用 AI”。
 *
 * 节高按 spec 压在一屏三分之一以内：一行正文加上下内边距。要加东西先算这笔账，
 * 别让它长回一节图文。
 */
export function RemembersReveal({ t }: { t: Translations }): ReactNode {
  return (
    <section className="bg-muted text-foreground w-full py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        <RevealHeadline
          text={t.remembers.text}
          className="text-center font-serif text-xl leading-relaxed font-medium text-balance sm:text-2xl md:text-3xl"
        />
      </div>
    </section>
  );
}
