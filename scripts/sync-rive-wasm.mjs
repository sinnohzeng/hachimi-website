#!/usr/bin/env node
/**
 * 把 Rive 运行时的两份 wasm 从 node_modules 复制到 public/rive/。
 *
 * 官网从自己的域名取 wasm，不碰 jsdelivr 与 unpkg（spec 003 验收 4）：运行时缺省会去 CDN 取，
 * 一是多一跳、一是国内访客未必到得了。public/rive/ 不入库，它是 node_modules 的派生物，
 * 随 predev、prebuild 与 pretest:orb 重出；Cloudflare Pages 跑 `npm run build` 时 prebuild 一样会跑。
 *
 * 用法：`node scripts/sync-rive-wasm.mjs`
 */

import { copyFile, mkdir } from "node:fs/promises";

const FILES = ["rive.wasm", "rive_fallback.wasm"];
const from = new URL("../node_modules/@rive-app/webgl2/", import.meta.url);
const to = new URL("../public/rive/", import.meta.url);

await mkdir(to, { recursive: true });
for (const name of FILES) {
  await copyFile(new URL(name, from), new URL(name, to));
}
console.log(`rive wasm 已同步到 public/rive/：${FILES.join("、")}`);
