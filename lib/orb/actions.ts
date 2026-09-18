// Numeric port of OrbMotionAction / OrbMotionAction+Spins / OrbMotionShiver.
import { clamp, type Shiver } from "./types.ts";

/** 一记大动作在某一刻叠给弹簧输出的偏差。 */
export type Offset = {
  yaw: number;
  roll: number;
  y: number;
  /** 自转角速度，弧度每秒。彩虹飘带只读它，不问是谁在转。 */
  spin: number;
  /** 这一记压给眼睑的上限，1 即不压。 */
  lid: number;
};

export const noOffset = (): Offset => ({
  yaw: 0,
  roll: 0,
  y: 0,
  spin: 0,
  lid: 1,
});

const deg = (degrees: number): number => (degrees * Math.PI) / 180;
const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

type Curve = "inOutCubic" | "square" | "linear" | "outCubic";

function curveValue(curve: Curve, r: number): number {
  switch (curve) {
    case "inOutCubic":
      return easeInOutCubic(r);
    case "square":
      return r * r;
    case "linear":
      return r;
    case "outCubic":
      return 1 - Math.pow(1 - r, 3);
  }
}

/** 导数是飘带的唯一判据，所以不许只写值不写斜率。 */
function curveSlope(curve: Curve, r: number): number {
  switch (curve) {
    case "inOutCubic":
      return r < 0.5 ? 12 * r * r : 12 * (1 - r) * (1 - r);
    case "square":
      return 2 * r;
    case "linear":
      return 1;
    case "outCubic":
      return 3 * (1 - r) * (1 - r);
  }
}

/** 晕眩转抽到的圈数区间：整数圈，3 或 4。别的几记忽略它。 */
export const dizzyTurns: [number, number] = [3, 4];
const dizzyWobble = 1.5;
const dizzyAccel = (turns: number): number => 0.55 + 0.16 * turns;

/** 一记有多长，秒。缺省取上界那一档，与幕的时长上限同一把尺。 */
export function actionDuration(action: string, turns = 4): number {
  switch (action) {
    case "spin":
    case "spinConfetti":
      return 0.7;
    case "spinTwice":
      return 1.1;
    case "bounce":
      return 1.329;
    case "spinBounce":
      return 2.029;
    case "spinDizzy":
      return dizzyAccel(turns) + dizzyWobble;
    case "spinWild":
      return 5.49;
    default:
      return 0;
  }
}

export function actionOffset(action: string, t: number, turns = 4): Offset {
  if (t < 0 || t >= actionDuration(action, turns)) return noOffset();
  switch (action) {
    case "spin":
    case "spinConfetti":
      return turn(t, 1, 0.7);
    case "spinTwice":
      return turn(t, 2, 1.1);
    case "bounce":
      return { ...noOffset(), y: hop(t) };
    case "spinBounce":
      return t < 0.7
        ? turn(t, 1, 0.7)
        : { ...noOffset(), yaw: 360, y: hop(t - 0.7) };
    case "spinDizzy":
      return dizzy(t, turns);
    case "spinWild":
      return wild(t);
    default:
      return noOffset();
  }
}

/** 一段单调走完的角度：角与角速度同时给。 */
function turn(t: number, turns: number, span: number): Offset {
  const u = clamp(t / span);
  const total = 360 * turns;
  return {
    ...noOffset(),
    yaw: total * easeInOutCubic(u),
    spin: (deg(total) * curveSlope("inOutCubic", u)) / span,
  };
}

/** 四段衰减抛物线：高 48 / 28 / 14 / 6，时长 0.5 / 0.382 / 0.27 / 0.177 秒。 */
function hop(t: number): number {
  let elapsed = t;
  for (const [duration, height] of [
    [0.5, 48],
    [0.382, 28],
    [0.27, 14],
    [0.177, 6],
  ] as [number, number][]) {
    if (elapsed < duration) {
      const u = elapsed / duration;
      return (-height / 114.5) * 4 * u * (1 - u);
    }
    elapsed -= duration;
  }
  return 0;
}

/**
 * 晕眩转：加速段走纯 r²，之后摇摆段三通道衰减，眼睑压到 0.46 上下再自己睁回来。
 * 衰减除了指数还乘一道随进度归零的斜坡，末帧三条通道都正好回到静止值。
 */
function dizzy(t: number, turns: number): Offset {
  const accel = dizzyAccel(turns);
  const total = 360 * turns;
  if (t < accel) {
    const r = t / accel;
    return {
      ...noOffset(),
      yaw: total * r * r,
      spin: (deg(total) * 2 * r) / accel,
    };
  }
  const u = t - accel;
  if (!(u < dizzyWobble)) return { ...noOffset(), yaw: total };
  const decay = Math.exp(-u * 1.6) * (1 - u / dizzyWobble);
  return {
    yaw: total,
    roll: 10 * Math.sin(u * 10) * decay,
    y: 0.02 * Math.sin(u * 10 + Math.PI / 2) * decay,
    spin: 0,
    lid: Math.max(0.05, 1 - (0.54 - 0.18 * Math.sin(u * 20)) * decay),
  };
}

type Leg = {
  span: number;
  from: number;
  to: number;
  curve: Curve;
  finale?: boolean;
};

/** 五段：蓄力、起速、匀速、收力、收尾。起手先反向蓄力半圈，净走九圈。 */
const wildLegs: Leg[] = [
  { span: 0.55, from: 0, to: -180, curve: "inOutCubic" },
  { span: 1.15, from: -180, to: 720, curve: "square" },
  { span: 1.9, from: 720, to: 2340, curve: "linear" },
  { span: 1, from: 2340, to: 3060, curve: "outCubic" },
  { span: 0.89, from: 3060, to: 3240, curve: "inOutCubic", finale: true },
];

function wild(t: number): Offset {
  let start = 0;
  for (const leg of wildLegs) {
    if (t < start + leg.span) return wildOffset(leg, (t - start) / leg.span);
    start += leg.span;
  }
  return { ...noOffset(), yaw: 3240 };
}

function wildOffset(leg: Leg, r: number): Offset {
  const travel = leg.to - leg.from;
  const out: Offset = {
    ...noOffset(),
    yaw: leg.from + travel * curveValue(leg.curve, r),
    spin: (deg(travel) * curveSlope(leg.curve, r)) / leg.span,
  };
  if (!leg.finale) return out;
  // 收尾的抖动与眼睑随进度归零，末帧侧倾正好落在 1080 度、眼睑回到 1。
  out.roll = 1080 * easeInOutCubic(r) + 12 * Math.sin(r * 26) * (1 - r);
  out.lid = Math.max(0.05, 1 - (0.5 - 0.35 * Math.sin(r * 30)) * (1 - r));
  return out;
}

/**
 * 把这一刻的颤跳叠进那一记动作的偏差里，三条通道各自相加。
 * 跳是连着的半正弦，落地那一下导数不连续，正是弹起来的那一记。
 */
export function blendShiver(out: Offset, shiver: Shiver, t: number): void {
  if (!Number.isFinite(t) || t <= 0) return;
  const tau = Math.PI * 2;
  out.y += -shiver.lift * Math.abs(Math.sin(Math.PI * shiver.hops * t));
  out.yaw += shiver.tremor * Math.sin(tau * shiver.tremors * t);
  // 侧倾比偏航慢一截，两条永不同相。
  out.roll += 0.7 * shiver.tremor * Math.sin(tau * shiver.tremors * 0.83 * t);
}
