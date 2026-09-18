// Numeric port of OrbMotionTargets / OrbMotionSpring / OrbMotionRandom；黄金帧对拍看着它不漂。
export type Targets = {
  yaw: number;
  pitch: number;
  roll: number;
  y: number;
  /** 横向位移，球半径单位。重音那一记走这条。 */
  x: number;
  squash: number;
  lid: number;
  /** 眼睛缩放，1 即原尺寸。 */
  eyeScale: number;
};

export function targets(style: string, t: number): Targets {
  const s = Math.sin,
    exp = Math.exp;
  const out: Targets = {
    yaw: 0,
    pitch: 0,
    roll: 1.5 * s(0.5 * t) + 0.6 * s(0.17 * t),
    y: 0.012 * s(0.85 * t),
    x: 0,
    squash: 1 + 0.007 * s(1.2 * t),
    lid: 1,
    eyeScale: 1,
  };
  switch (style) {
    case "sleep":
      out.lid = 0.02;
      out.pitch = -6;
      out.squash = 1 + 0.018 * s(t * 1.3);
      break;
    case "wake":
      out.lid = Math.min(1, Math.max(0.02, (t - 0.5) / 1.2));
      out.pitch = -8 * exp(-t * 2);
      break;
    case "attentive":
      out.pitch = 3 * s(t * 1.8);
      out.roll = 2 * s(t);
      break;
    case "ponder":
      out.yaw = 8 * s(t * 0.7);
      out.roll = 5 * s(t * 0.9);
      break;
    case "scan":
      out.yaw = 16 * s(t * 1.4);
      out.pitch = 5 * Math.cos(t * 0.9);
      break;
    case "tilt":
      out.roll = 10 + 6 * s(t * 0.7);
      out.yaw = 5 * s(t * 0.6);
      out.y = -0.02 + 0.015 * s(t * 0.9);
      out.squash = 1.01;
      break;
    case "tremble":
      out.yaw = 2 * s(t * 18);
      out.roll = 2 * s(t * 23);
      break;
    case "nod":
      out.pitch = 6 * s(t * 0.9);
      break;
    case "bounce":
      out.y = -0.03 * Math.abs(s(2.4 * t));
      out.squash = 1 + 0.02 * s(2.4 * t);
      out.roll = 3 * s(1.2 * t);
      break;
    case "work":
      out.y = -0.02 * Math.abs(s(3 * t));
      out.roll = 3 * s(2 * t);
      out.pitch = -3 + 2 * s(t * 2.2);
      break;
    case "sway":
      out.roll = 7 * s(t * 1.4);
      out.y = -0.025 * s(t * 1.2);
      break;
    case "shrink":
      out.squash = 1 - 0.07 * exp(-t * 0.8);
      out.y = 0.03 * s(t * 0.8);
      break;
    case "spin":
      out.yaw = 25 * s(t * 0.8);
      out.y = 0.05 * s(t * 1.6);
      break;
  }
  return out;
}

/** 固定步长、阻尼比可调。速度也属于状态，目标变化不会重启一段 easing。 */
export class Spring {
  value: number;
  velocity = 0;
  constructor(value = 0) {
    this.value = value;
  }
  step(target: number, omega = 13, zeta = 1): void {
    const dt = 1 / 120;
    this.velocity +=
      (-2 * zeta * omega * this.velocity -
        omega * omega * (this.value - target)) *
      dt;
    this.value += this.velocity * dt;
  }
  /** 一记速度冲量。它与改目标值不是一回事：目标值把球拉到新位置，冲量只踢一脚。 */
  kick(impulse: number): void {
    this.velocity += impulse;
  }
}

/** Mulberry32，只在事件边界抽样。 */
export class Random {
  seed: number;
  constructor(seed: number) {
    this.seed = seed >>> 0;
  }
  next(): number {
    this.seed = (this.seed + 0x6d2b79f5) >>> 0;
    let t = this.seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  interval(range: readonly number[]): number {
    const lo = range[0] ?? 0,
      hi = range[1] ?? lo;
    return lo + this.next() * (hi - lo);
  }
  /** ±1 的随机符号。 */
  sign(): number {
    return this.next() < 0.5 ? -1 : 1;
  }
}
