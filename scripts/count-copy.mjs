#!/usr/bin/env node
/**
 * 首页文案字数门。挂在 npm run check 里，超限非零退出。
 *
 * 口径出处是 specs/005-site-v4-tools/spec.md 的验收 5，四档：
 *   - 首屏简体不超过 9 字；
 *   - 定位句、四张卡的卡面、道长记得、学堂、本机与收尾合计不超过 320 字；
 *   - 命例走查（标题、引言与五步）合计不超过 240 字；
 *   - 每张卡展开不超过 110 字，FAQ 每条答案不超过 70 字；
 *   - 英文上限取简体上限的 0.6 倍，向上取整。
 *
 * 第三版是「全页除 FAQ 一个总数」，第四版拆成四档：命例走查与卡面展开是两块深度
 * 不同的文字，压在同一个预算里，一块长了另一块就得无谓地砍。
 *
 * 数的是「可见正文」：读者眼睛能看到的那些句子。alt 文本、导航与页脚链接、版权
 * 行、商店徽章的 alt 都不算，它们不是版面上的字，压它们只会伤无障碍。页脚字标
 * 下面那句定位语与版权行同类，也不算（spec 004）。
 *
 * 一处例外，且只有一处：英文首屏那句是 owner 定的北极星原文，7 词，比 0.6 倍算
 * 出来的 6 词上限多一个词。spec 同时写着「不送润色」与「0.6 倍」，这一句上两条撞
 * 车，按更具体的那条办：北极星不动，英文首屏只报数不设门，其余全部照门走。
 *
 * 直接 import lib/i18n/{zh,en}.ts 读真对象，不正则扒源码：Node 26 能剥类型直接跑
 * TypeScript，少一层「扒出来的和页面渲染的不是一个东西」的风险。
 */
import { countZh, countEn, enCapFor } from "./lib/count-units.mjs";

const { zh } = await import("../lib/i18n/zh.ts");
const { en } = await import("../lib/i18n/en.ts");

/** 首屏。整节只有这一句。 */
const HERO_KEYS = ["hero.headline"];

/** 定位与卡面：一句定位、四张卡的卡面、道长记得、学堂、本机与收尾。 */
const SURFACE_KEYS = [
  "what.title",
  "tools.title",
  "tools.hint",
  "tools.cards.0.name",
  "tools.cards.0.line",
  "tools.cards.1.name",
  "tools.cards.1.line",
  "tools.cards.2.name",
  "tools.cards.2.line",
  "tools.cards.3.name",
  "tools.cards.3.line",
  "remembers.text",
  "academy.text",
  "offline.text",
  "offline.tags.0",
  "offline.tags.1",
  "offline.tags.2",
  "offline.tags.3",
  "finalCta.headline",
];

/** 命例走查：标题、引言与五步的标题加正文。 */
const JOURNEY_KEYS = [
  "case.title",
  "case.lead",
  "case.steps.0.title",
  "case.steps.0.body",
  "case.steps.1.title",
  "case.steps.1.body",
  "case.steps.2.title",
  "case.steps.2.body",
  "case.steps.3.title",
  "case.steps.3.body",
  "case.steps.4.title",
  "case.steps.4.body",
];

const LIMIT = {
  hero: 9,
  surface: 320,
  journey: 240,
  cardDetail: 110,
  faqAnswer: 70,
};

/** 英文首屏不设门的那一句，见文件头。 */
const EN_UNGATED = new Set(["hero.headline"]);

function at(obj, path) {
  const value = path
    .split(".")
    .reduce((node, part) => (node == null ? node : node[part]), obj);
  if (typeof value !== "string") {
    throw new Error(`lib/i18n 里取不到字符串：${path}`);
  }
  return value;
}

function sum(dict, keys, count) {
  return keys.reduce((total, key) => total + count(at(dict, key)), 0);
}

const failures = [];

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
lines.push(gate("首屏", sum(zh, HERO_KEYS, countZh), LIMIT.hero));
lines.push(gate("定位与卡面", sum(zh, SURFACE_KEYS, countZh), LIMIT.surface));
lines.push(gate("命例走查", sum(zh, JOURNEY_KEYS, countZh), LIMIT.journey));
zh.tools.cards.forEach((card, i) => {
  lines.push(gate(`卡 ${i + 1} 展开`, countZh(card.detail), LIMIT.cardDetail));
});
zh.faq.items.forEach((item, i) => {
  lines.push(gate(`FAQ ${i + 1} 答`, countZh(item.answer), LIMIT.faqAnswer));
});

// ---- 英文 ----
lines.push("");
lines.push(`英文（词，上限为简体的 ${enCapFor(10) / 10} 倍）`);
const enHero = sum(en, HERO_KEYS, countEn);
lines.push(
  HERO_KEYS.every((key) => EN_UNGATED.has(key))
    ? row("首屏", enHero, "北极星原文，不设门")
    : gate("首屏", enHero, enCapFor(LIMIT.hero))
);
lines.push(
  gate("定位与卡面", sum(en, SURFACE_KEYS, countEn), enCapFor(LIMIT.surface))
);
lines.push(
  gate("命例走查", sum(en, JOURNEY_KEYS, countEn), enCapFor(LIMIT.journey))
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
