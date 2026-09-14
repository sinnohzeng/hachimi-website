#!/usr/bin/env node
/**
 * 把 hachimi-ios 的走查截图做成站上用的 WebP。
 *
 * 一句话规矩：**站上每张截图都是 1206 × 2622 的比例**，`AppShot` 按这个比例写死
 * 宽高把版面撑住。比例统一是硬要求，`ChartShowcase` 那两格并排，比例不齐时手机
 * 边框的底色会在矮的那张下面露出一条黑带。
 *
 * 八字那屏底部有「等内核第四刀」的占位行，不能当对客素材。裁掉之后高度不足，
 * 按页面纸色补回 2622：纸色不写死，从被裁那一行下方的页边取，浅深两版各取各的。
 *
 * 源在 `../hachimi-ios/build/device-walk/`，文件名取自各自的 manifest.json
 * （suggestedHumanReadableName → exportedFileName）。走查产物会被下一轮覆盖，
 * 所以对应关系写在这里，而不是靠事后翻目录。
 *
 * 第三版全站只用三张图。起卦结果那张目前还是旧的匿名图，署名「李小龙」的三张由
 * iOS 仓另产（spec 059），落到 `build/device-walk/site-v3/` 之后把 `cast-result`
 * 的 source 换过去、widths 补成两档、加上 dark 一份即可。
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

/** iPhone 17 Pro 整屏。走查图按这个尺寸出，占位图按同一比例出。 */
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
  // 占位图：旧的匿名起卦结果页，720 × 1565，与整屏同比例（2.174）。只出一档宽度、
  // 没有深色版，换成署名图之后这三项一起补齐。源不放 public，免得跟着构建出门。
  "cast-result": {
    widths: [603],
    dark: false,
    light: path.join(ROOT, "assets/shots/cast-result-placeholder.webp"),
  },
  "ziwei-sanhe": {
    widths: [603, 1206],
    dark: true,
    light: walkShot("device-12-light", "17C9FC85-8897-4427-B01B-3816E2B08943"), // L-Z3-本命盘
    darkSrc: walkShot("device-12-dark", "82D2D094-CE89-43BA-909E-A581D1372652"), // Z3-本命盘
  },
  // 神煞那张卡的下沿收在 2034，占位卡从 2064 起。切在 2045，正落在两张卡的空当里。
  "bazi-pillars": {
    widths: [603, 1206],
    dark: true,
    light: walkShot("device-6-light", "39D5A675-BBE8-44A7-943C-3FE1F1B5990B"), // L-B1-基本排盘与底部一枚胶囊
    darkSrc: walkShot("device-6-dark", "B388D6E6-4680-44DF-BAA3-FDF4833FCE6D"), // B1-基本排盘与底部一枚胶囊
    cut: 2045,
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
