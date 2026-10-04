#!/usr/bin/env node
/**
 * 分享卡的字体子集：app/[locale]/opengraph-image.tsx 在构建期用它排卡面，next/og 就不必
 * 在构建时向 Google Fonts 现取缺的字形，取不到也不会静默出豆腐块。
 *
 *   node scripts/build-og-font.mjs           按卡面文字向 Google Fonts 取一份子集，写进 assets/og/
 *   node scripts/build-og-font.mjs --check   不联网：卡面上的每个字都要在子集里，缺字就报红
 *
 * 卡面文字取品牌名与各语言的首屏口号（lib/config.ts、lib/i18n/）。口号改了跑一次本脚本，
 * 把新的 card-font.ttf 与 card-font.json 一并提交。字体是 Noto Serif SC Bold，SIL OFL 1.1。
 */
import { readFile, writeFile } from "node:fs/promises";

const { siteConfig } = await import("../lib/config.ts");
const { zh } = await import("../lib/i18n/zh.ts");
const { en } = await import("../lib/i18n/en.ts");

const FAMILY = "Noto Serif SC";
const WEIGHT = 700;
const FONT = new URL("../assets/og/card-font.ttf", import.meta.url);
const META = new URL("../assets/og/card-font.json", import.meta.url);

/** 卡面上会出现的每一个字，去重排序，空白不算。 */
const glyphs = [
  ...new Set(
    [siteConfig.name, siteConfig.nameZh, zh.hero.headline, en.hero.headline]
      .join("")
      .replace(/\s/g, "")
  ),
]
  .sort()
  .join("");

if (process.argv.includes("--check")) {
  const meta = JSON.parse(await readFile(META, "utf8"));
  const missing = [...glyphs].filter((ch) => !meta.text.includes(ch));
  if (missing.length > 0) {
    console.error(
      `分享卡字体缺 ${missing.length} 个字：${missing.join("")}\n先跑 node scripts/build-og-font.mjs 重取子集，再把 assets/og/ 一并提交。`
    );
    process.exit(1);
  }
  console.log(`分享卡字体门通过：卡面 ${glyphs.length} 个字都在子集里`);
  process.exit(0);
}

const css = await fetch(
  `https://fonts.googleapis.com/css2?family=${encodeURIComponent(FAMILY)}:wght@${WEIGHT}&text=${encodeURIComponent(glyphs)}`,
  // 老 UA 拿到的是 truetype，Satori 不认 woff2。
  { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1)" } }
).then((response) => response.text());
const url = css.match(/src: url\((.+?)\) format\('truetype'\)/)?.[1];
if (!url) throw new Error(`Google Fonts 没给 truetype 地址：\n${css}`);
const font = Buffer.from(await (await fetch(url)).arrayBuffer());
await writeFile(FONT, font);
await writeFile(
  META,
  `${JSON.stringify({ family: FAMILY, weight: WEIGHT, license: "SIL OFL 1.1", text: glyphs }, null, 2)}\n`
);
console.log(
  `已写 assets/og/card-font.ttf（${font.length} 字节，${glyphs.length} 个字）`
);
