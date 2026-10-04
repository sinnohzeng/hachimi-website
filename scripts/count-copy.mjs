#!/usr/bin/env node
/**
 * 首页文案字数门。挂在 npm run check 里，超限非零退出。
 *
 * 上限只写在下面的 LIMIT 与 EN_LIMIT 里，口径出处是 specs/005-site-v4-tools/spec.md 的
 * 验收 5 与 spec 007：首屏口号与过桥句各一档，定位、卡面、命例走查三节各一个总数，卡片
 * 展开与 FAQ 答案逐条计。英文上限取简体上限的 0.6 倍向上取整（scripts/lib/count-units.mjs），
 * EN_LIMIT 里的节单独定。
 *
 * 数的是“可见正文”：读者眼睛能看到的那些句子。alt 文本、导航与页脚链接、版权
 * 行、商店徽章的 alt 都不算，它们不是版面上的字，压它们只会伤无障碍。页脚字标
 * 下面那句定位语与版权行同类，也不算（spec 004）。
 *
 * 一处例外：英文首屏那句是 owner 定的原文，比 0.6 倍算出的上限长。spec 同时写着
 * “不送润色”与“0.6 倍”，按更具体的那条办：英文首屏只报数不设门，其余全部照门走。
 *
 * 各节的文字由下面的 SECTIONS 从 i18n 对象里取，卡、步、件加一项就多数一项。直接 import
 * lib/i18n/{zh,en}.ts 读真对象，不正则扒源码，数的就是页面渲染的那一份。
 */
import { countZh, countEn, enCapFor } from "./lib/count-units.mjs";

const { zh } = await import("../lib/i18n/zh.ts");
const { en } = await import("../lib/i18n/en.ts");

/** 每节计入字数的文字。 */
const SECTIONS = {
  /** 首屏口号。 */
  hero: (t) => [t.hero.headline],
  /** 口号下的过桥句，把起卦接到命例上（定稿句 C2）。 */
  bridge: (t) => [t.hero.bridge],
  /** 定位：称呼、记忆锤与每件事的标题与正文。 */
  what: (t) => [
    t.what.eyebrow,
    t.what.title,
    ...t.what.items.flatMap((item) => [item.title, item.body]),
  ],
  /** 卡面：每张卡的名字与一句、学堂与收尾。 */
  surface: (t) => [
    t.tools.title,
    t.tools.hint,
    ...t.tools.cards.flatMap((card) => [card.name, card.line]),
    t.academy.text,
    t.finalCta.headline,
  ],
  /** 命例走查：标题、引言与每一步的标题加正文。 */
  journey: (t) => [
    t.case.title,
    t.case.lead,
    ...t.case.steps.flatMap((step) => [step.title, step.body]),
  ],
};

const LIMIT = {
  hero: 9,
  bridge: 16,
  what: 185,
  surface: 320,
  journey: 240,
  cardDetail: 110,
  faqAnswer: 70,
};

/**
 * 英文上限不按 0.6 倍算的节。定位第二张卡列的是名下有什么：两张盘、每一卦、补记的
 * 结局，英文列举比简体按比例多出一截，这一节单独定。
 */
const EN_LIMIT = { what: 121 };

function sum(dict, section, count) {
  return SECTIONS[section](dict).reduce(
    (total, text) => total + count(text),
    0
  );
}

const failures = [];

// 断行写死的两句：拆开的几行连起来读必须就是整句，改了一边忘了另一边就报红。
// 中文行与行直接相接，英文行与行之间隔一个空格。
for (const [label, dict, join] of [
  ["简体", zh, ""],
  ["英文", en, " "],
]) {
  for (const [name, whole, lines] of [
    ["hero.headlineLines", dict.hero.headline, dict.hero.headlineLines],
    ["what.titleLines", dict.what.title, dict.what.titleLines],
  ]) {
    const joined = lines.join(join);
    if (joined !== whole) {
      failures.push(`${label} ${name} 连起来不是整句：${joined}`);
    }
  }
}

/** 终端按显示宽度对齐：汉字占两列，String.padEnd 只会数字符，得自己补。 */
function pad(label, columns) {
  const width = [...label].reduce(
    (n, ch) => n + (/[　-鿿＀-￯]/.test(ch) ? 2 : 1),
    0
  );
  return label + " ".repeat(Math.max(1, columns - width));
}

function row(label, actual, capText) {
  return `   ${pad(label, 16)}${String(actual).padStart(3)} / ${capText}`;
}

function gate(label, actual, cap) {
  const ok = actual <= cap;
  if (!ok) failures.push(`${label}：${actual}，上限 ${cap}`);
  return (ok ? " " : "！") + row(label, actual, String(cap)).slice(1);
}

const lines = [];

// ---- 简体 ----
lines.push("简体（字，标点不计）");
lines.push(gate("首屏", sum(zh, "hero", countZh), LIMIT.hero));
lines.push(gate("过桥", sum(zh, "bridge", countZh), LIMIT.bridge));
lines.push(gate("定位", sum(zh, "what", countZh), LIMIT.what));
lines.push(gate("卡面", sum(zh, "surface", countZh), LIMIT.surface));
lines.push(gate("命例走查", sum(zh, "journey", countZh), LIMIT.journey));
zh.tools.cards.forEach((card, i) => {
  lines.push(gate(`卡 ${i + 1} 展开`, countZh(card.detail), LIMIT.cardDetail));
});
zh.faq.items.forEach((item, i) => {
  lines.push(gate(`FAQ ${i + 1} 答`, countZh(item.answer), LIMIT.faqAnswer));
});

// ---- 英文 ----
lines.push("");
lines.push(`英文（词，上限为简体的 ${enCapFor(10) / 10} 倍）`);
const enHero = sum(en, "hero", countEn);
lines.push(row("首屏", enHero, "owner 原文，只报数"));
lines.push(gate("过桥", sum(en, "bridge", countEn), enCapFor(LIMIT.bridge)));
lines.push(gate("定位", sum(en, "what", countEn), EN_LIMIT.what));
lines.push(gate("卡面", sum(en, "surface", countEn), enCapFor(LIMIT.surface)));
lines.push(
  gate("命例走查", sum(en, "journey", countEn), enCapFor(LIMIT.journey))
);
en.tools.cards.forEach((card, i) => {
  lines.push(
    gate(`卡 ${i + 1} 展开`, countEn(card.detail), enCapFor(LIMIT.cardDetail))
  );
});
en.faq.items.forEach((item, i) => {
  lines.push(
    gate(`FAQ ${i + 1} 答`, countEn(item.answer), enCapFor(LIMIT.faqAnswer))
  );
});

console.log(lines.join("\n"));

if (failures.length > 0) {
  console.error(`\n字数超限 ${failures.length} 处：`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log("\n字数门通过。");
