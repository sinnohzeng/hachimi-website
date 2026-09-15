export type Vec3 = [number, number, number];
export type Eye = [number, number, number, number];
export type Expression = { id: string; gaze: Vec3; split: number; eyes: Eye[] };
export type Behavior = {
  id: string;
  expressions: string[];
  blink: number[];
  expression: number[];
  glance: number[];
  style: string;
  actions: string[];
};
export type Program = {
  loopFrom: number;
  cues: { state: string; duration: number }[];
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
