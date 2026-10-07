#!/usr/bin/env node
/**
 * 站上 Geist 两款字体的子集：lib/fonts.ts 从 assets/fonts/ 取。切的码位就是那边各自
 * 写的 unicode-range，从那份文件读出，范围外的字落到字体栈里的系统字体。中文本来就走
 * 系统字体，正文只要拉丁段，等宽只排步骤编号，只要数字。
 *
 *   node scripts/build-web-fonts.mjs    从 geist 包的可变字体切子集，覆盖写 assets/fonts/
 *
 * 切子集用 fontTools 的 pyftsubset，经 uvx 临时取用，不进 package.json；这是本机生成素材的
 * 工具，不参与 `npm run check`，也不进构建。升 geist 包后跑一次，把新的 woff2 一并提交。
 * 字体是 SIL OFL 1.1，许可证随文件放在 assets/fonts/OFL.txt。
 */
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const fontsSource = await readFile(
  new URL("../lib/fonts.ts", import.meta.url),
  "utf8"
);

/** lib/fonts.ts 里每个 localFont 的文件名与它的 unicode-range。 */
const targets = [
  ...fontsSource.matchAll(
    /src: "\.\.\/assets\/fonts\/([^"]+)"[\s\S]*?prop: "unicode-range",\s*value:\s*"([^"]+)"/g
  ),
].map((match) => ({ target: match[1], range: match[2] }));

/** geist 包的 dist 目录：包只导出字体入口，woff2 源文件按入口所在目录定位。 */
const GEIST_DIST = new URL(".", import.meta.resolve("geist/font/sans"));

/** 子集文件名 → geist 包里的源文件。 */
const SOURCES = {
  "Geist-Variable-latin.woff2": "geist-sans/Geist-Variable.woff2",
  "GeistMono-Variable-digits.woff2": "geist-mono/GeistMono-Variable.woff2",
};

if (targets.length !== Object.keys(SOURCES).length) {
  throw new Error(
    `lib/fonts.ts 里读到 ${targets.length} 个带 unicode-range 的字体，应为 ${Object.keys(SOURCES).length} 个`
  );
}

for (const { target, range } of targets) {
  const source = SOURCES[target];
  if (!source)
    throw new Error(`不认得 ${target}，先在 SOURCES 里登记它的源文件`);
  const input = fileURLToPath(new URL(`fonts/${source}`, GEIST_DIST));
  const output = fileURLToPath(
    new URL(`../assets/fonts/${target}`, import.meta.url)
  );
  execFileSync(
    "uvx",
    [
      "--from",
      "fonttools[woff]",
      "pyftsubset",
      input,
      `--unicodes=${range}`,
      "--flavor=woff2",
      "--layout-features=*",
      `--output-file=${output}`,
    ],
    { stdio: "inherit" }
  );
  console.log(`写出 assets/fonts/${target}`);
}
