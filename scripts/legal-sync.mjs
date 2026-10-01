#!/usr/bin/env node
/**
 * 法律件镜像：隐私政策与使用条款的真源在 hachimi-ios 的 docs/legal/，官网
 * content/legal/ 逐字镜像那四份 Markdown，/privacy 与 /terms 在构建时渲染它们。
 *
 *   node scripts/legal-sync.mjs           从兄弟仓 ../hachimi-ios/docs/legal/ 复制过来
 *   node scripts/legal-sync.mjs --check   逐字节比对，再核对 lib/config.ts 的
 *                                         pageDates.privacy 与 pageDates.terms 等于
 *                                         各文件“最后更新”那一行的日期
 *
 * --check 挂在 npm run check 里：找不到兄弟仓、任何一份不一致、日期对不上，
 * 都打印是哪一份并以非 0 退出。
 */
import { copyFile, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_DIR = path.resolve(ROOT, "../hachimi-ios/docs/legal");
const MIRROR_DIR = path.join(ROOT, "content/legal");

const { legalFiles, lastUpdatedOf } = await import("../lib/legal-files.ts");
const { pageDates } = await import("../lib/config.ts");

const check = process.argv.includes("--check");
const problems = [];

async function read(file) {
  try {
    return await readFile(file);
  } catch {
    return null;
  }
}

for (const [kind, files] of Object.entries(legalFiles)) {
  for (const name of Object.values(files)) {
    const source = path.join(SOURCE_DIR, name);
    const mirror = path.join(MIRROR_DIR, name);
    const sourceBytes = await read(source);
    if (sourceBytes === null) {
      problems.push(
        `找不到真源 ${path.relative(ROOT, source)}（兄弟仓 hachimi-ios 要在本仓旁边）`
      );
      continue;
    }
    if (!check) {
      await copyFile(source, mirror);
      console.log(`已同步 content/legal/${name}`);
      continue;
    }
    const mirrorBytes = await read(mirror);
    if (mirrorBytes === null) {
      problems.push(`content/legal/${name} 不存在`);
    } else if (!mirrorBytes.equals(sourceBytes)) {
      problems.push(
        `content/legal/${name} 与 hachimi-ios docs/legal/${name} 不一致`
      );
    }
    const date = lastUpdatedOf(sourceBytes.toString("utf8"));
    if (date === null) {
      problems.push(`docs/legal/${name} 里找不到“最后更新”那一行`);
    } else if (date !== pageDates[kind]) {
      problems.push(
        `pageDates.${kind} 是 ${pageDates[kind]}，docs/legal/${name} 的最后更新是 ${date}`
      );
    }
  }
}

if (problems.length > 0) {
  console.error(`法律件镜像门未过，${problems.length} 处：`);
  for (const problem of problems) console.error(`  - ${problem}`);
  console.error(
    "\n先在 hachimi-ios 改 docs/legal/，再跑 npm run legal:sync，lib/config.ts 的 pageDates 改成同一天。"
  );
  process.exit(1);
}

if (check) {
  console.log(
    "法律件镜像门通过：四份与 hachimi-ios docs/legal/ 逐字节一致，日期与 pageDates 对得上"
  );
}
