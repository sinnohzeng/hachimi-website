export type Vec3 = [number, number, number];
export type Eye = [number, number, number, number];
export type Expression = { id: string; gaze: Vec3; split: number; eyes: Eye[] };
/** 一记重音：官网在正弦之上插的那一下。位移以球半径为单位，侧倾以度为单位。 */
export type Accent = {
  duration: number;
  interval: number[];
  sway: number;
  roll: number;
};
/** 一记速度冲量。它不改目标值，只踢一脚，球自己荡回原处。 */
export type Impulse = { roll: number; lift: number };
/** 逐状态的扫视幅度与换目标节奏。`retarget` 缺席即沿用这一档 cadence 自己的。 */
export type GlanceSpread = {
  yaw: number[];
  pitch: number;
  retarget?: number[];
};
/** 一幕从起到撤一直在的颤跳，不进动作池、不占排期、不衰减。 */
export type Shiver = {
  hops: number;
  lift: number;
  tremor: number;
  tremors: number;
};
export type Behavior = {
  id: string;
  expressions: string[];
  blink: number[];
  expression: number[];
  glance: number[];
  style: string;
  actions: string[];
  eyeScale: number;
  lidFloor: number;
  glanceSpread: GlanceSpread;
  accent?: Accent;
  impulse?: Impulse;
};
export type Program = {
  loopFrom: number;
  cues: { state: string; duration: number }[];
  /** 这一幕容得下多长的一记大动作，秒。缺席即不限。 */
  actionCeiling?: number;
  shiver?: Shiver;
};
export type OrbModel = {
  schema: number;
  radius: number;
  halfViewBox: number;
  ears: { position: number[]; radius: number[]; front: number[] };
  whiskers: Vec3[][];
  expressions: Expression[];
  behaviors: Behavior[];
  programs: Record<string, Program>;
};
export type Frame = {
  gaze: Vec3;
  center: number[];
  stretch: number[];
  eyes: number[][];
};
export type Pointer = { x: number; y: number };

export function item<T>(list: readonly T[], index: number): T {
  const value = list[index];
  if (value === undefined) throw new Error(`Missing Orb asset entry ${index}`);
  return value;
}
export const clamp = (v: number, low = 0, high = 1): number =>
  Math.min(high, Math.max(low, v));
export const lerp = (a: number, b: number, t: number): number =>
  a + (b - a) * t;
export const radians = (a: number): number => (a * Math.PI) / 180;

export function spin(u: Vec3, v: Vec3, angle: number): [Vec3, Vec3] {
  const c = Math.cos(angle),
    s = Math.sin(angle);
  return [
    u.map((x, i) => x * c + item(v, i) * s) as Vec3,
    v.map((x, i) => x * c - item(u, i) * s) as Vec3,
  ];
}

export function basis(gaze: Vec3): { forward: Vec3; right: Vec3; down: Vec3 } {
  let forward: Vec3 = [0, 0, 1],
    right: Vec3 = [1, 0, 0],
    down: Vec3 = [0, 1, 0];
  [forward, right] = spin(forward, right, radians(gaze[0]));
  [down, forward] = spin(down, forward, radians(gaze[1]));
  [right, down] = spin(right, down, radians(gaze[2]));
  return { forward, right, down };
}
