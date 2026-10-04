#!/usr/bin/env node
/**
 * 对客文案门：参考来源与竞争对手的名字一个不上站。
 *
 * 词表只有一份，在 hachimi-ios 的 `scripts/no-reference-mentions.py`（`BANNED`），本门
 * 运行时从兄弟仓读它：官网与 App 说的是同一个产品，判据必须是同一张表。兄弟仓不在旁就报红，
 * 与 legal:check、check:canon 同一个前提。
 *
 * 作用域是站上的文案真源：`lib/i18n/*.ts`、`lib/config.ts`、`lib/metadata.ts`，
 * 以及 `content/legal/` 下隐私政策与使用条款的镜像。
 * 组件与文档不扫，那里出现这些词是注释与出处，不是用户看得见的字。
 *
 * 用法：`node scripts/check-copy-mentions.mjs`（退出码非 0 = 有命中）
 */

import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = path.resolve(
  ROOT,
  "../hachimi-ios/scripts/no-reference-mentions.py"
);

const { legalFiles } = await import("../lib/legal-files.ts");

const TARGETS = [
  "lib/i18n/zh.ts",
  "lib/i18n/en.ts",
  "lib/i18n/types.ts",
  "lib/config.ts",
  "lib/metadata.ts",
  ...Object.values(legalFiles).flatMap((byLocale) =>
    Object.values(byLocale).map((name) => `content/legal/${name}`)
  ),
];

if (!existsSync(SOURCE)) {
  console.error(
    `对客文案门：找不到词表 ${SOURCE}。hachimi-ios 要与本仓放在同一个父目录下。`
  );
  process.exit(1);
}

/** @type {string[]} */
const BANNED = JSON.parse(
  execFileSync(
    "python3",
    [
      "-c",
      [
        "import importlib.util, json, os, sys",
        "sys.path.insert(0, os.path.dirname(sys.argv[1]))",
        "spec = importlib.util.spec_from_file_location('mentions', sys.argv[1])",
        "module = importlib.util.module_from_spec(spec)",
        "spec.loader.exec_module(module)",
        "print(json.dumps(list(module.BANNED), ensure_ascii=False))",
      ].join("\n"),
      SOURCE,
    ],
    { encoding: "utf8" }
  )
);

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
    "\n参考来源与竞争对手的名字不上站；词表在 hachimi-ios 的 scripts/no-reference-mentions.py。"
  );
  process.exit(1);
}

console.log(
  `对客文案门通过：${TARGETS.length} 份文案真源里没有词表上的 ${BANNED.length} 个词，也没有表情符号`
);
