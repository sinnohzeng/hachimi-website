#!/usr/bin/env node
/**
 * 首页文案字数门。挂在 npm run check 里，超限非零退出。
 *
 * 口径出处是 specs/001-site-v3-concise/spec.md 的验收 3：
 *   - 首屏简体不超过 9 字；
 *   - 全页除 FAQ 的可见正文简体不超过 250 字（首屏那一句计在内）；
 *   - FAQ 五条答案各不超过 60 字；
 *   - 英文上限取简体上限的 0.6 倍，向上取整。
 *
 * 数的是「可见正文」：读者眼睛能看到的那些句子。alt 文本、导航与页脚链接、版权
 * 行、商店徽章的 alt 都不算，它们不是版面上的字，压它们只会伤无障碍。页脚那行
 * 统计小字算，它接住了被删掉的整节 Stats，是正文。
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

/** 第二到第六节加结尾加页脚统计的可见正文，首屏那一句也计在这个总数里。 */
const BODY_KEYS = [
  "whatItIs.title",
  "whatItIs.steps.0",
  "whatItIs.steps.1",
  "whatItIs.steps.2",
  "remembers.text",
  "chart.title",
  "chart.ziwei",
  "chart.bazi",
  "chart.cta",
  "academy.text",
  "principles.text",
  "principles.tags.0",
  "principles.tags.1",
  "principles.tags.2",
  "finalCta.headline",
  "footer.stats",
];

const PAGE_KEYS = [...HERO_KEYS, ...BODY_KEYS];

const LIMIT = { hero: 9, page: 250, faqAnswer: 60 };

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
    (n, ch) => n + (/[\u3000-\u9fff\uff00-\uffef]/.test(ch) ? 2 : 1),
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
lines.push(gate("全页除 FAQ", sum(zh, PAGE_KEYS, countZh), LIMIT.page));
zh.faq.items.forEach((item, i) => {
  lines.push(gate(`FAQ ${i + 1} 答`, countZh(item.answer), LIMIT.faqAnswer));
});

// ---- 英文 ----
const enPageCap = enCapFor(LIMIT.page);
const enFaqCap = enCapFor(LIMIT.faqAnswer);
lines.push("");
lines.push(`英文（词，上限为简体的 ${enCapFor(10) / 10} 倍）`);
const enHero = sum(en, HERO_KEYS, countEn);
lines.push(
  HERO_KEYS.every((key) => EN_UNGATED.has(key))
    ? row("首屏", enHero, "北极星原文，不设门")
    : gate("首屏", enHero, enCapFor(LIMIT.hero))
);
lines.push(gate("全页除 FAQ", sum(en, PAGE_KEYS, countEn), enPageCap));
en.faq.items.forEach((item, i) => {
  lines.push(gate(`FAQ ${i + 1} 答`, countEn(item.answer), enFaqCap));
});

console.log(lines.join("\n"));

if (failures.length > 0) {
  console.error(`\n字数超限 ${failures.length} 处：`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log("\n字数门通过。");
