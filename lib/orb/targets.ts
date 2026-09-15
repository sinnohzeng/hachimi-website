// Numeric port of OrbMotionTargets / OrbMotionAction; native golden tests guard drift.
export type Targets = {
  yaw: number;
  pitch: number;
  roll: number;
  y: number;
  squash: number;
  lid: number;
};

export function targets(style: string, t: number): Targets {
  const s = Math.sin,
    exp = Math.exp;
  const out = {
    yaw: 0,
    pitch: 0,
    roll: 1.5 * s(0.5 * t) + 0.6 * s(0.17 * t),
    y: 0.012 * s(0.85 * t),
    squash: 1 + 0.007 * s(1.2 * t),
    lid: 1,
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

export const durations: Record<string, number> = {
  spin: 0.7,
  bounce: 1.329,
  spinBounce: 2.029,
  spinDizzy: 3.5,
  spinWild: 5.8,
};

function hop(t: number): number {
  for (const [duration, height] of [
    [0.5, 48],
    [0.382, 28],
    [0.27, 14],
    [0.177, 6],
  ] as [number, number][]) {
    if (t < duration) {
      const u = t / duration;
      return (-height / 114.5) * 4 * u * (1 - u);
    }
    t -= duration;
  }
  return 0;
}

export function actionOffset(
  action: string,
  t: number
): { yaw: number; roll: number; y: number } {
  const out = { yaw: 0, roll: 0, y: 0 };
  if (t < 0 || t >= (durations[action] ?? 0)) return out;
  const ease = (u: number): number => u * u * (3 - 2 * u);
  switch (action) {
    case "spin":
      out.yaw = 360 * ease(t / 0.7);
      break;
    case "bounce":
      out.y = hop(t);
      break;
    case "spinBounce":
      out.yaw = t < 0.7 ? 360 * ease(t / 0.7) : 360;
      out.y = t < 0.7 ? 0 : hop(t - 0.7);
      break;
    case "spinDizzy":
      out.yaw = t < 2 ? 1080 * ease(t / 2) : 1080;
      out.roll =
        t < 2 ? 0 : 18 * Math.sin((t - 2) * 15) * Math.exp(-(t - 2) * 3);
      break;
    case "spinWild":
      out.yaw = 3240 * ease(t / 5.8);
      out.y = -0.12 * Math.sin((t / 5.8) * Math.PI);
      break;
  }
  return out;
}

export class Spring {
  value: number;
  velocity = 0;
  constructor(value = 0) {
    this.value = value;
  }
  step(target: number, omega = 13): void {
    const dt = 1 / 120;
    this.velocity +=
      (-2 * omega * this.velocity - omega * omega * (this.value - target)) * dt;
    this.value += this.velocity * dt;
  }
}

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
  interval(range: number[]): number {
    const lo = range[0] ?? 0,
      hi = range[1] ?? lo;
    return lo + this.next() * (hi - lo);
  }
}
