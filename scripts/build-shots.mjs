#!/usr/bin/env node
/**
 * 把 hachimi-ios 的走查截图做成站上用的 WebP。
 *
 * 一句话规矩：**站上每张截图都是 1320 × 2868 的比例**，`AppShot` 按这个比例写死
 * 宽高把版面撑住。比例统一是硬要求，命例走查那一节五张图轮流换屏，比例不齐时手机
 * 边框的底色会在矮的那张下面露出一条黑带。
 *
 * 五张都取整屏，底部标签栏压在内容上就是 App 里的样子。要裁的那张给 `cut`：裁到那一行，
 * 再按页面纸色补回 2868，纸色从被裁那一行下方的页边取，浅深两版各取各的。
 *
 * 源在 `../hachimi-ios/build/device-walk/`，文件名取自各自的 manifest.json
 * （suggestedHumanReadableName → exportedFileName）。走查产物会被下一轮覆盖，
 * 所以对应关系写在这里，而不是靠事后翻目录。
 *
 * 第四版五张图都在 iPhone 17 Pro Max 上截：两张盘用署名种子“李小龙”（spec 059），
 * 命例列表与问事面用合成命例库，走 iOS 仓 `DeviceScreenshotPass/testWalkSiteShots`，
 * 浅深各一趟落在 `sim-14-light-v2` 与 `sim-14-dark-v2`；命例问事面那一屏在种子问句去掉“合成问题：”前缀后重拍，落在 `sim-14-light-v3` 与 `sim-14-dark-v3`。起卦结果页的解读由大模型写，
 * 浅深两张必须出自同一卦，所以另走 `testWalkSiteCastShots`：起一卦拍浅色，切外观再拍深色，落在 `sim-14-cast`。
 *
 * 依赖 sharp。它随 Next 装在 node_modules 里，没有单独进 package.json；
 * 这是本机生成素材的工具，不参与 `npm run check`，也不进构建。
 *
 * 用法：`node scripts/build-shots.mjs`（覆盖写 public/screenshots/zh/）
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const WALK = path.resolve(ROOT, "../hachimi-ios/build/device-walk");
const OUT = path.join(ROOT, "public/screenshots/zh");

/** iPhone 17 Pro Max 整屏。走查图按这个尺寸出。 */
const W = 1320;
const H = 2868;

const QUALITY = 80;

/** 走查里的一张 PNG。 */
const walkShot = (dir, id) => path.join(WALK, dir, `${id}.png`);

/**
 * 站上的名字 → 取哪张、出哪几档宽度、有没有深色版。
 *
 * `widths`、`dark` 必须与 `components/app-shot.tsx` 的 SHOTS 表一致：那边决定
 * 页面写出什么 srcSet，这边决定磁盘上真有哪些文件，对不上就是 404。
 *
 * `cut` 是从顶部保留到第几行，缺省不裁。
 */
const SHOTS = {
  "case-list": {
    widths: [660, 1320],
    dark: true,
    light: walkShot("sim-14-light-v2", "AFB24453-B966-4353-B72B-B2EFC967A807"), // L-S4-命例列表
    darkSrc: walkShot("sim-14-dark-v2", "B029E3FF-5A7B-4310-BB13-4830E5DA576F"), // S4-命例列表
  },
  "ziwei-sanhe": {
    widths: [660, 1320],
    dark: true,
    light: walkShot("sim-14-light-v2", "F0283531-1B6F-4233-9ACA-6137EEAD8726"), // L-S2-紫微三合盘
    darkSrc: walkShot("sim-14-dark-v2", "E23CBE03-E3C8-44C7-A292-4D039B6FB4F7"), // S2-紫微三合盘
  },
  "bazi-pillars": {
    widths: [660, 1320],
    dark: true,
    light: walkShot("sim-14-light-v2", "66FB2762-A846-42B8-96CC-7FDF3F3D0BB4"), // L-S3-八字四柱页
    darkSrc: walkShot("sim-14-dark-v2", "4F4B9117-957F-4D9B-A1DE-DFB74831B644"), // S3-八字四柱页
  },
  "cast-result": {
    widths: [660, 1320],
    dark: true,
    light: walkShot("sim-14-cast", "C0F68499-EF1D-4E26-8440-B40C0A07E798"), // L-S1-起卦结果页，地天泰，大吉
    darkSrc: walkShot("sim-14-cast", "0AAFF002-2A03-4215-B3AD-5C2E67F48971"), // L-S1-起卦结果页-深色，同一卦
  },
  "case-casts": {
    widths: [660, 1320],
    dark: true,
    light: walkShot("sim-14-light-v3", "0D41C2FC-52B6-4CE0-B58D-3C546D90984F"), // L-S5-命例问事面
    darkSrc: walkShot("sim-14-dark-v3", "95D3127B-E3D1-446B-AB98-CAA88D8D7989"), // S5-命例问事面
  },
};

/** 取一个像素的颜色。x 取 16 是页边，落在任何卡片外面，取到的就是纸色。 */
async function samplePaper(file, y) {
  const { data } = await sharp(file)
    .extract({ left: 16, top: y, width: 1, height: 1 })
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { r: data[0], g: data[1], b: data[2] };
}

const hex = ({ r, g, b }) =>
  "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");

async function build(name, theme, file, widths, cut) {
  let pipeline = sharp(file);
  let paper = null;
  if (cut) {
    // 裁到切线，再用纸色把高度补回去。补的是页面空白，看着就是这一屏下面没内容了。
    paper = await samplePaper(file, cut + 8);
    pipeline = sharp(file)
      .extract({ left: 0, top: 0, width: W, height: cut })
      .extend({ bottom: H - cut, background: paper });
  }

  const base = await pipeline.png().toBuffer();
  const suffix = theme === "dark" ? "-dark" : "";
  const written = [];
  for (const width of widths) {
    const out = path.join(OUT, `${name}${suffix}-${width}.webp`);
    const buf = await sharp(base)
      .resize({ width })
      .webp({ quality: QUALITY })
      .toBuffer();
    await writeFile(out, buf);
    written.push(`${path.basename(out)} ${(buf.length / 1024).toFixed(1)}KB`);
  }
  console.log(
    `  ${name}${suffix}  ${cut ? `裁到 ${cut}，纸色 ${hex(paper)}` : "整屏"}\n    ${written.join("  ")}`
  );
  return written.length;
}

await mkdir(OUT, { recursive: true });
let count = 0;
for (const [name, spec] of Object.entries(SHOTS)) {
  count += await build(name, "light", spec.light, spec.widths, spec.cut);
  if (spec.dark) {
    count += await build(name, "dark", spec.darkSrc, spec.widths, spec.cut);
  }
}
console.log(`\n共写出 ${count} 个文件，比例统一 ${W} : ${H}`);
