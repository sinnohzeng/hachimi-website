#!/usr/bin/env node
/**
 * 把 hachimi-ios 的走查截图做成站上用的 WebP。
 *
 * 一句话规矩：**站上每张截图都是 1206 × 2622 的比例**，`AppShot` 按这个比例写死
 * 宽高把版面撑住。比例统一是硬要求，`ChartShowcase` 那两格并排，比例不齐时手机
 * 边框的底色会在矮的那张下面露出一条黑带。
 *
 * 八字那屏底部一枚“紫微 / 八字”胶囊压在原局那张卡上，裁到四柱卡收尾处。裁掉之后高度不足，
 * 按页面纸色补回 2622：纸色不写死，从被裁那一行下方的页边取，浅深两版各取各的。
 *
 * 源在 `../hachimi-ios/build/device-walk/`，文件名取自各自的 manifest.json
 * （suggestedHumanReadableName → exportedFileName）。走查产物会被下一轮覆盖，
 * 所以对应关系写在这里，而不是靠事后翻目录。
 *
 * 第三版全站只用三张图，都是 iOS 仓 `DeviceScreenshotPass/testWalkSiteShots` 用署名种子
 * “李小龙”在 iPhone 17 Pro 上截的（spec 059），浅深各一份，落在 `sim-13-light` 与
 * `sim-13-dark` 两个目录。
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

/** iPhone 17 Pro 整屏。走查图按这个尺寸出。 */
const W = 1206;
const H = 2622;

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
  "cast-result": {
    widths: [603, 1206],
    dark: true,
    light: walkShot("sim-13-light", "A8A3A91D-F558-4A85-9065-4EFFDDB3911E"), // L-S1-起卦结果页
    darkSrc: walkShot("sim-13-dark", "36F35D14-D905-411E-ADD4-88A84E9761A2"), // S1-起卦结果页
  },
  "ziwei-sanhe": {
    widths: [603, 1206],
    dark: true,
    light: walkShot("sim-13-light", "83922CDE-200D-4BAE-9226-24641F0D27F3"), // L-S2-紫微三合盘
    darkSrc: walkShot("sim-13-dark", "E7BE5371-429D-44E9-B03A-F1EF943C2B3D"), // S2-紫微三合盘
  },
  // 神煞那张卡的下沿收在 2241，原局那张卡从 2278 起。切在 2260，正落在两张卡的空当里。
  "bazi-pillars": {
    widths: [603, 1206],
    dark: true,
    light: walkShot("sim-13-light", "BFD776EF-16D8-4A84-8C7D-5A82C217F7DB"), // L-S3-八字四柱页
    darkSrc: walkShot("sim-13-dark", "7C9E0E55-74D4-4325-82E1-3C7930659743"), // S3-八字四柱页
    cut: 2260,
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
