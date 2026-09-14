#!/usr/bin/env node
/**
 * 把 hachimi-ios 的走查截图做成站上用的 WebP。
 *
 * 一句话规矩：**站上每张截图都是 1206 × 2622**，浅色深色各一份，两档宽度。
 * 尺寸统一是硬要求——`ShotRow` 是 flex 行，行内高度不齐时手机边框的底色会
 * 在矮的那张下面露出一条黑带。
 *
 * 八字两屏底部有「等内核第四刀」的占位行，不能当对客素材。裁掉之后高度不足，
 * 按页面纸色补回 2622：纸色不写死，从被裁那一行下方的页边取，浅深两版各取各的。
 *
 * 源在 `../hachimi-ios/build/device-walk/`，文件名取自各自的 manifest.json
 * （suggestedHumanReadableName → exportedFileName）。走查产物会被下一轮覆盖，
 * 所以对应关系写在这里，而不是靠事后翻目录。
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

/** iPhone 17 Pro 整屏。站上所有截图都按这个尺寸出，不许有例外。 */
const W = 1206;
const H = 2622;

/** 1206 给二倍屏，603 给窄屏一倍宽，`AppShot` 的 srcSet 在这两档里挑。 */
const WIDTHS = [1206, 603];

const QUALITY = 80;

/**
 * 站上的名字 → 走查里的那一张。
 *
 * 紫微与学堂取走查 12（真机，明暗同一轮同一命例，切主题时盘面数据对得上）。
 * 八字走查 12 没拍，取走查 6，同样明暗成对。
 *
 * `cut` 是从顶部保留到第几行；缺省不裁。走查 12 的 Z3 本命盘与 Z13 限流面板
 * 七层字节相同（md5 一致，走查 1 也是这个毛病），限流那张改取 Z4。
 */
const SHOTS = {
  "ziwei-sanhe": {
    light: ["device-12-light", "17C9FC85-8897-4427-B01B-3816E2B08943"], // L-Z3-本命盘
    dark: ["device-12-dark", "82D2D094-CE89-43BA-909E-A581D1372652"], // Z3-本命盘
  },
  "ziwei-sihua": {
    light: ["device-12-light", "65FE8EB3-B8FB-4D6D-BFF3-6F03515DE038"], // L-Z11-四化盘
    dark: ["device-12-dark", "E9D62B94-2BCE-4833-BD12-C0E1C6811717"], // Z11-四化盘
  },
  "ziwei-feixing": {
    light: ["device-12-light", "C4D768E5-33EB-47FD-ADF9-34F2B64E3752"], // L-Z10-飞星盘
    dark: ["device-12-dark", "A79719BA-4BAB-4D18-BB4C-D704BDAD1F25"], // Z10-飞星盘
  },
  "ziwei-fortune": {
    light: ["device-12-light", "B8BC4D72-F0FC-4F9D-8316-26FE8D13314A"], // L-Z4-限流盘
    dark: ["device-12-dark", "F89474FD-C11C-4358-A04A-8DEBEC591E69"], // Z4-限流盘
  },
  "ziwei-geju": {
    light: ["device-12-light", "14082592-D27C-4156-AE9D-1E601EA77DFD"], // L-Z13-格局分析列表
    dark: ["device-12-dark", "98916B47-FE39-4E7A-A0A0-6CF7C42E7409"], // Z13-格局分析列表
  },
  "ziwei-glossary": {
    light: ["device-12-light", "DC0C4634-7381-47F3-ADCA-C6790AFAF1D8"], // L-Z15-盘面锚点长按升起词条卡片
    dark: ["device-12-dark", "92376F27-6F30-4AB0-9A57-5F9A235566FC"], // Z15-盘面锚点长按升起词条卡片
  },
  "academy-home": {
    light: ["device-12-light", "0911E965-D037-4774-9C72-48F6DF32B5CD"], // L-A1-学堂根屏与四格标签栏
    dark: ["device-12-dark", "BB0E3CD4-E33A-452A-8408-30E8795200C8"], // A1-学堂根屏与四格标签栏
  },
  "academy-book": {
    light: ["device-12-light", "4BA29163-E7A2-4D13-8465-6EF25EFD2F35"], // L-A8-书那一页的目录
    dark: ["device-12-dark", "F82F49B5-EB09-4C97-8A49-E38B8C24BD40"], // A8-书那一页的目录
  },
  "academy-reading": {
    light: ["device-12-light", "CEC65489-17FA-49FB-A64C-667BD30AD824"], // L-A9b-阅读页图文按序
    dark: ["device-12-dark", "EFAD0234-332B-4FF0-805D-435453A14BA6"], // A9b-阅读页图文按序
  },
  // 神煞那张卡的下沿收在 2034，占位卡从 2064 起。切在 2045，正落在两张卡的空当里。
  "bazi-pillars": {
    light: ["device-6-light", "39D5A675-BBE8-44A7-943C-3FE1F1B5990B"], // L-B1-基本排盘与底部一枚胶囊
    dark: ["device-6-dark", "B388D6E6-4680-44DF-BAA3-FDF4833FCE6D"], // B1-基本排盘与底部一枚胶囊
    cut: 2045,
  },
  // 六柱表这屏神煞卡收在 2127，再往下是起运卡，占位行夹在卡中间切不干净，整卡不要。
  "bazi-sixpillars": {
    light: ["device-6-light", "1A168F67-E8D7-41B3-AD23-445457BF1E2B"], // L-B3d-胎命身续出三列
    dark: ["device-6-dark", "E237D865-2208-4942-BCDC-4092F4A5FB75"], // B3d-胎命身续出三列
    cut: 2135,
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

async function build(name, theme, source, cut) {
  const [dir, id] = source;
  const file = path.join(WALK, dir, `${id}.png`);

  let pipeline = sharp(file);
  let paper = null;
  if (cut) {
    // 裁到切线，再用纸色把高度补回去。补的是页面空白，看着就是这一屏下面没内容了。
    paper = await samplePaper(file, cut + 8);
    pipeline = sharp(file)
      .extract({ left: 0, top: 0, width: W, height: cut })
      .extend({ bottom: H - cut, background: paper });
  }

  const png = await pipeline.png().toBuffer();
  const suffix = theme === "dark" ? "-dark" : "";
  const written = [];
  for (const width of WIDTHS) {
    const out = path.join(OUT, `${name}${suffix}-${width}.webp`);
    const buf = await sharp(png)
      .resize({ width })
      .webp({ quality: QUALITY })
      .toBuffer();
    await writeFile(out, buf);
    written.push(`${path.basename(out)} ${(buf.length / 1024).toFixed(1)}KB`);
  }
  console.log(
    `  ${name}${suffix}  ${dir}  ${cut ? `裁到 ${cut}，纸色 ${hex(paper)}` : "整屏"}\n    ${written.join("  ")}`
  );
  return written.length;
}

await mkdir(OUT, { recursive: true });
let count = 0;
for (const [name, spec] of Object.entries(SHOTS)) {
  for (const theme of ["light", "dark"]) {
    count += await build(name, theme, spec[theme], spec.cut);
  }
}
console.log(
  `\n共写出 ${count} 个文件，统一 ${W} × ${H}，两档宽度 ${WIDTHS.join(" / ")}`
);
