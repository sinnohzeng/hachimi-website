import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import {
  ARTBOARD,
  CONTRACT_VERSION,
  ballGeometry,
} from "../lib/orb/contract.ts";

// 形象资产门（spec 003 验收 4 与 5）：官网播的必须是签过名的那一份，wasm 必须从自己的域名取。
// 与 hachimi-ios 的 scripts/orb-asset-gate.py 是同一道门的两端：两边的清单都记同一个 SHA。

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root));
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const manifest = JSON.parse(read("public/brand/orb-source.json"));

test("签名文件与静帧和来源清单同字节", () => {
  assert.equal(manifest.schema, 2);
  for (const [file, hash] of Object.entries(manifest.artifacts)) {
    assert.equal(sha256(read(`public/brand/${file}`)), hash, file);
  }
});

test("清单记的契约版本与宿主名字表一致", () => {
  assert.equal(manifest.contractVersion, CONTRACT_VERSION);
  assert.equal(manifest.artboard, ARTBOARD.name);
});

test("运行时版本三处一致：清单、package.json 的精确钉死、装进来的包", () => {
  const pinned = JSON.parse(read("package.json")).dependencies[
    "@rive-app/webgl2"
  ];
  assert.match(pinned, /^\d+\.\d+\.\d+$/, "运行时要精确钉死，不带 ^ 或 ~");
  const installed = JSON.parse(
    read("node_modules/@rive-app/webgl2/package.json")
  ).version;
  assert.equal(installed, pinned);
  assert.equal(manifest.runtime, `@rive-app/webgl2 ${pinned}`);
});

test("wasm 自托管：public/rive 里的两份与 node_modules 同字节，宿主只指自己的域名", () => {
  for (const name of ["rive.wasm", "rive_fallback.wasm"]) {
    const local = new URL(`public/rive/${name}`, root);
    assert.ok(
      existsSync(local),
      `${name} 没同步，先跑 scripts/sync-rive-wasm.mjs`
    );
    assert.equal(
      sha256(readFileSync(local)),
      sha256(read(`node_modules/@rive-app/webgl2/${name}`)),
      name
    );
  }
  const host = read("lib/orb/host.ts").toString("utf8");
  assert.match(host, /WASM_URL = "\/rive\/rive\.wasm"/);
  assert.match(host, /WASM_FALLBACK_URL = "\/rive\/rive_fallback\.wasm"/);
  for (const file of ["lib/orb/host.ts", "components/cat-orb.tsx"]) {
    const text = read(file).toString("utf8");
    assert.doesNotMatch(text, /jsdelivr|unpkg|cdn\./i, `${file} 不许指向 CDN`);
  }
});

test("几何：canvas 按 contain 等比放，球半径随同一个倍数缩", () => {
  const exact = ballGeometry({ left: 10, top: 20, width: 1640, height: 880 });
  assert.deepEqual(exact, { x: 830, y: 460, radius: 222 });
  const tall = ballGeometry({ left: 0, top: 0, width: 820, height: 880 });
  assert.equal(tall.radius, 111, "高度有余时按宽度缩");
});
