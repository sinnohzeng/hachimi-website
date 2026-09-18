// Port of OrbBehaviorChannels 与 OrbMotionProgram 的逐状态、逐幕参数。
// 这几张表不在 orb-model.json 里：原生导出器只写行为目录与节奏，不写标点通道。
import { awaitingShiver, type Shiver } from "./actions.ts";

/** 一记重音：官网在正弦之上插的那一下。 */
export type Accent = {
  /** 这一记有多宽，秒。 */
  duration: number;
  /** 两记之间隔多久，秒。 */
  interval: [number, number];
  /** 横向位移的幅度，球半径单位。 */
  sway: number;
  /** 侧倾的幅度，度。 */
  roll: number;
};

/** 官网 8 个 SVG 单位，球半径 114.27。 */
const sway = 8 / 114.27;

export const accents: Record<string, Accent> = {
  listening: { duration: 0.38, interval: [1.8, 3.2], sway, roll: 5 },
  curious: { duration: 0.44, interval: [1.6, 2.8], sway, roll: 5 },
  bored: { duration: 0.6, interval: [4, 7], sway, roll: 5 },
};

/** 一记速度冲量。它不改目标值，只踢一脚，球自己荡回原处。 */
export type Impulse = {
  /** 踢给侧倾通道，度每秒。 */
  roll: number;
  /** 踢给竖向通道，球半径每秒。 */
  lift: number;
};

export const impulses: Record<string, Impulse> = {
  suspicious: { roll: 30, lift: 0 },
  confused: { roll: 22, lift: 0 },
  angry: { roll: 0, lift: 1.8 },
};

/** 十二个状态，0.95 到 1.15。 */
export const eyeScales: Record<string, number> = {
  surprised: 1.15,
  excited: 1.12,
  scared: 1.12,
  celebrate: 1.1,
  curious: 1.08,
  laughing: 1.06,
  happy: 1.05,
  proud: 1.02,
  suspicious: 0.97,
  bored: 0.96,
  sad: 0.95,
  drowsy: 0.95,
};

/** 十个状态，0.34 到 1.1。 */
export const lidFloors: Record<string, number> = {
  drowsy: 0.34,
  bored: 0.6,
  sad: 0.7,
  laughing: 0.7,
  suspicious: 0.85,
  shy: 0.85,
  proud: 0.9,
  confused: 0.9,
  scared: 1.05,
  celebrate: 1.1,
};

/** 逐状态的扫视幅度与换目标节奏。 */
export type GlanceSpread = {
  /** 横向幅度的区间，度。方向另抽正负。 */
  yaw: [number, number];
  /** 纵向幅度，度。 */
  pitch: number;
  /** 换目标的间隔，缺省沿用这一档 cadence 自己的。 */
  retarget?: [number, number];
};

/** 闲着的时候眼睛不四处乱瞟，只有头在慢慢晃。 */
const still: GlanceSpread = { yaw: [0, 0], pitch: 0 };
/** 没单列的状态沿用本仓原有的那一档。 */
const common: GlanceSpread = { yaw: [10.5, 10.5], pitch: 6.3 };

const spreads: Record<string, GlanceSpread> = {
  idle: still,
  sleeping: still,
  poweringDown: still,
  curious: { yaw: [9, 15], pitch: 9 },
  happy: { yaw: [0, 10.5], pitch: 5.4 },
  searching: { yaw: [10.5, 15], pitch: 9, retarget: [0.55, 1.15] },
  scared: { yaw: [10.5, 15], pitch: 5.4, retarget: [0.45, 1.05] },
};

export const glanceSpread = (behavior: string): GlanceSpread =>
  spreads[behavior] ?? common;

/**
 * 一幕容得下多长的一记大动作，秒。没列出的不限。
 * 产品面的球贴着文字与表单，转得越久越抢戏。
 */
export const actionCeilings: Record<string, number> = {
  // 放到 4 秒装得下一记晕眩转。5.49 秒的狂转仍够不到首页，它只在 celebrate 发。
  home: 4,
  // 整幕自带颤跳，再插一记大动作就是两条竖向运动打架。
  anticipating: 0,
};

/** 整幕不停的那条底噪。 */
export const shivers: Record<string, Shiver> = { anticipating: awaitingShiver };
