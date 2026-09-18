// Port of OrbMotionEngine+Ribbons 与 OrbConfetti。
// 画笔还不画这两样，但它们与动作调度共用同一条随机序列，也决定大动作能不能接着发，
// 所以逐步抽样必须与原生一致，不能省。
import type { Random } from "./targets.ts";
import { clamp } from "./types.ts";

/** 转身彩虹飘带的常数。 */
const ribbonSpec = {
  tilt: [0.16, 0.5] as [number, number],
  /** 弧长，弧度。 */
  arc: [2.2, 3.4] as [number, number],
  /** 跟随本体自转的比例。 */
  follow: [0.74, 0.94] as [number, number],
  hueSpan: [45, 95] as [number, number],
  /** 色相漂移，度每秒。 */
  hueDrift: [18, 42] as [number, number],
  /** 相邻两条出现的间隔，秒。 */
  stagger: [0.055, 0.105] as [number, number],
  /** 线宽，球半径单位。 */
  width: [0.105, 0.15] as [number, number],
  /** 自走角速度，弧度每秒。 */
  lamVel: [0.5, 1.1] as [number, number],
  count: [3, 5] as [number, number],
  /** 布轨道与发射的两档角速度，弧度每秒。 */
  lay: 0.9,
  fire: 5,
  fadeOut: 0.4,
};

type Ribbon = {
  hue: number;
  hueSpan: number;
  hueDrift: number;
  /** 轨道倾角，弧度。 */
  tilt: number;
  /** 轨道在屏幕上的滚转，弧度。 */
  roll: number;
  arc: number;
  follow: number;
  width: number;
  /** 当前经度，弧度。 */
  lam: number;
  lamVel: number;
  bornAt: number;
};

type Lane = { tilt: number; roll: number };
type Emission = { at: number; index: number; count: number };

/**
 * 按自转角速度发飘带。判据只有角速度，没有动作名：谁把球转过 5 弧度每秒，飘带就跟谁。
 */
export class RibbonField {
  private ribbons: Ribbon[] = [];
  private lanes: Lane[] = [];
  private queue: Emission[] = [];
  private turning = false;
  private fired = false;
  private releasedAt: number | null = null;
  private base = 0;

  /** 还在转、还有没发完的、或者还没散尽。 */
  get busy(): boolean {
    return this.ribbons.length > 0 || this.queue.length > 0;
  }

  step(spin: number, time: number, dt: number, random: Random): void {
    const spinning = Math.abs(spin) >= ribbonSpec.lay;
    if (spinning && !this.turning) this.lay(random);
    if (!spinning && this.turning) {
      this.queue = [];
      this.fired = false;
    }
    this.turning = spinning;
    if (spinning && !this.fired && Math.abs(spin) >= ribbonSpec.fire) {
      this.schedule(time, random);
      this.fired = true;
    }
    if (spinning) this.releasedAt = null;
    else if (this.releasedAt === null && this.ribbons.length > 0)
      this.releasedAt = time;
    this.land(time, random);
    this.drift(spin, dt);
    this.sweep(time);
  }

  /** 过 0.9 弧度每秒时先布的轨道。布好不等于看得见，过 5 才发。 */
  private lay(random: Random): void {
    this.lanes = [
      {
        tilt: random.interval(ribbonSpec.tilt),
        roll: random.interval([-0.85, 0.85]),
      },
    ];
    this.base = random.next() * 360;
    this.fired = false;
  }

  private schedule(time: number, random: Random): void {
    const count = Math.round(random.interval(ribbonSpec.count));
    let at = time;
    this.queue = [];
    for (let index = 0; index < count; index++) {
      this.queue.push({ at, index, count });
      at += random.interval(ribbonSpec.stagger);
    }
  }

  private land(time: number, random: Random): void {
    for (;;) {
      const first = this.queue[0];
      if (!first || first.at > time) return;
      this.queue.shift();
      this.ribbons.push(this.make(first, time, random));
    }
  }

  private make(emission: Emission, time: number, random: Random): Ribbon {
    const lane = this.lanes[0] ?? { tilt: 0.3, roll: 0 };
    const share = emission.index / emission.count;
    return {
      hue: this.base + 360 * share + random.interval([-14, 14]),
      hueSpan: random.interval(ribbonSpec.hueSpan) * random.sign(),
      hueDrift: random.interval(ribbonSpec.hueDrift) * random.sign(),
      tilt: clamp(
        lane.tilt + random.interval([-0.04, 0.04]),
        ribbonSpec.tilt[0],
        ribbonSpec.tilt[1]
      ),
      roll: lane.roll + random.interval([-0.05, 0.05]),
      arc: random.interval(ribbonSpec.arc),
      follow: random.interval(ribbonSpec.follow),
      width: random.interval(ribbonSpec.width),
      lam: Math.PI * 2 * share + random.interval([-0.2, 0.2]),
      lamVel: random.interval(ribbonSpec.lamVel) * random.sign(),
      bornAt: time,
    };
  }

  private drift(spin: number, dt: number): void {
    for (const ribbon of this.ribbons)
      ribbon.lam += (ribbon.follow * spin + ribbon.lamVel) * dt;
  }

  private sweep(time: number): void {
    if (this.releasedAt === null) return;
    if (time - this.releasedAt < ribbonSpec.fadeOut) return;
    this.ribbons = [];
    this.lanes = [];
    this.releasedAt = null;
  }
}

/** 外抛式撒花的常数。 */
const confettiSpec = {
  /** 一颗的寿命，秒。 */
  life: 0.9,
  /** 抛出速度，球半径每秒。 */
  speed: [0.9, 1.6] as [number, number],
  /** 颗粒半径，球半径单位。 */
  size: [0.035, 0.06] as [number, number],
  /** 出金星的概率。 */
  starChance: 0.18,
  /** 唤醒入场撒几颗。 */
  wake: [9, 13] as [number, number],
  /** 第五记反应撒几颗。 */
  poke: 16,
};

export const wakeBurstCount = confettiSpec.wake;
export const pokeBurstCount = confettiSpec.poke;

type Piece = {
  angle: number;
  speed: number;
  size: number;
  star: boolean;
  /** 自转，度每秒。圆点看不出来，金星看得出来。 */
  spin: number;
  bornAt: number;
};

/** 撒花那一格状态。粒子最多十六颗。 */
export class ConfettiField {
  private pieces: Piece[] = [];

  get busy(): boolean {
    return this.pieces.length > 0;
  }

  burst(count: number, time: number, random: Random): void {
    for (let index = 0; index < count; index++)
      this.pieces.push(this.make(index, count, time, random));
  }

  sweep(time: number): void {
    this.pieces = this.pieces.filter(
      (piece) => time - piece.bornAt < confettiSpec.life
    );
  }

  private make(
    index: number,
    count: number,
    time: number,
    random: Random
  ): Piece {
    const star = random.next() < confettiSpec.starChance;
    return {
      angle: (Math.PI * 2 * index) / count + random.interval([-0.3, 0.3]),
      speed: random.interval(confettiSpec.speed),
      size: random.interval(confettiSpec.size),
      star,
      spin: random.interval([-420, 420]),
      bornAt: time,
    };
  }
}
