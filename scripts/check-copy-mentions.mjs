#!/usr/bin/env node
/**
 * 对客文案门：参考来源与竞争对手的名字一个不上站。
 *
 * 词表逐字取自 hachimi-ios 的 `scripts/no-reference-mentions.py`，那一份是 iOS
 * 侧 `make check` 的静态门。同一条红线两个仓各有一道门，判据必须是同一张表：
 * 官网与 App 说的是同一个产品，只在一边拦住等于没拦。
 *
 * 作用域是站上的文案真源：`lib/i18n/*.ts` 与 `lib/config.ts`、`lib/metadata.ts`。
 * 组件与文档不扫，那里出现这些词是注释与出处，不是用户看得见的字。
 *
 * 用法：`node scripts/check-copy-mentions.mjs`（退出码非 0 = 有命中）
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const TARGETS = [
  "lib/i18n/zh.ts",
  "lib/i18n/en.ts",
  "lib/i18n/types.ts",
  "lib/config.ts",
  "lib/metadata.ts",
];

// **加词只改这里**，并与 hachimi-ios 的同名词表一起改。简体与正體各列一份。
const BANNED = [
  "文墨",
  "问真",
  "問真",
  "jizhen",
  "对标",
  "對標",
  "对照成品",
  "對照成品",
  "电脑版",
  "電腦版",
];

// 拿表情当图标这件事同样拦下，判据与 iOS 那一份相同的两个区段。
const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu;

const problems = [];

for (const relative of TARGETS) {
  const text = await readFile(path.join(ROOT, relative), "utf8");
  text.split("\n").forEach((line, index) => {
    const where = `${relative}:${index + 1}`;
    for (const word of BANNED) {
      if (line.toLowerCase().includes(word.toLowerCase())) {
        problems.push(`  ${where}：禁词“${word}”\n      ← ${line.trim()}`);
      }
    }
    const marks = [...new Set(line.match(EMOJI) ?? [])];
    if (marks.length > 0) {
      problems.push(
        `  ${where}：表情符号 ${marks.join(" ")}（图标改用 lucide 线图）\n      ← ${line.trim()}`
      );
    }
  });
}

if (problems.length > 0) {
  console.error(`对客文案门未过，${problems.length} 处：`);
  console.error(problems.join("\n"));
  console.error(
    "\n参考来源与竞争对手的名字不上站；词表在本文件顶部，与 hachimi-ios 的 scripts/no-reference-mentions.py 同源。"
  );
  process.exit(1);
}

console.log(
  `对客文案门通过：${TARGETS.length} 份文案真源里没有参考来源的名字，也没有表情符号`
);
