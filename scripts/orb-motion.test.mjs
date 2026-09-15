import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import test from "node:test";
import { OrbMotion } from "../lib/orb/motion.ts";

const model = JSON.parse(
  readFileSync(new URL("../public/brand/orb-model.json", import.meta.url))
);
const fixtures = JSON.parse(
  readFileSync(new URL("../public/brand/orb-golden.json", import.meta.url))
);

test("generated assets match the native export manifest", () => {
  const manifest = JSON.parse(
    readFileSync(new URL("../public/brand/orb-source.json", import.meta.url))
  );
  for (const [file, hash] of Object.entries(manifest.artifacts)) {
    const bytes = readFileSync(
      new URL(`../public/brand/${file}`, import.meta.url)
    );
    assert.equal(createHash("sha256").update(bytes).digest("hex"), hash, file);
  }
});

function close(a, b, path = "frame") {
  if (typeof a === "number") {
    assert.ok(Math.abs(a - b) < 1e-6, `${path}: ${a} != ${b}`);
    return;
  }
  assert.deepEqual(Object.keys(a).sort(), Object.keys(b).sort(), path);
  for (const key of Object.keys(a)) close(a[key], b[key], `${path}.${key}`);
}

test("all 35 behaviors match frames exported by the native renderer", () => {
  assert.equal(fixtures.length, 35);
  for (const fixture of fixtures) {
    const motion = new OrbMotion(model, fixture.state, 1);
    let tick = 0;
    for (const [i, target] of fixture.ticks.entries()) {
      while (tick < target) {
        motion.advance(1 / 120);
        tick++;
      }
      close(motion.frame(), fixture.frames[i], `${fixture.state}@${target}`);
    }
  }
});

test("display refresh rate does not change the choreography", () => {
  const a = new OrbMotion(model, "hero", 19);
  const b = new OrbMotion(model, "hero", 19);
  for (let i = 0; i < 900; i++) a.advance(1 / 30);
  for (let i = 0; i < 3600; i++) b.advance(1 / 120);
  assert.deepEqual(a.frame(), b.frame());
});

test("input is bounded, invalid time is ignored and release is smooth", () => {
  const motion = new OrbMotion(model, "idle", 1);
  const before = motion.frame();
  for (const dt of [0, -1, NaN, Infinity]) motion.advance(dt);
  assert.deepEqual(motion.frame(), before);
  motion.pointer = { x: 100, y: -100 };
  for (let i = 0; i < 240; i++) motion.advance(1 / 120);
  assert.ok(motion.pointerOffset.x <= 8.001);
  assert.ok(motion.pointerOffset.y <= 5.001);
  motion.pointer = null;
  for (let i = 0; i < 240; i++) motion.advance(1 / 120);
  assert.ok(Math.abs(motion.pointerOffset.x) < 0.01);
});
