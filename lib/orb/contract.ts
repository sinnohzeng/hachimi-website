/**
 * 宿主契约第十三版在官网这一侧的名字表。真源是 hachimi-orb 仓的 contract.md，
 * 这里只有属性名、取值与 artboard 的几何常数，与 iOS 的 OrbRiveContract 一一对应。
 *
 * 动作逻辑、节拍与随机全在 .riv 文件里，官网一个节拍常数都不写。三端同源说的就是这一点：
 * 官网、iOS 与 Android 播的是同一份签名文件，宿主只喂输入、读输出、播放。
 */

export const CONTRACT_VERSION = 13;

/** 文件里的入口。主画板、缺省状态机与 view model 的名字都写死在契约里。 */
export const ARTBOARD = {
  name: "Orb",
  stateMachine: "Main",
  width: 820,
  height: 440,
  /** 球半径。换算指针与判命中的那把尺。 */
  radius: 111,
} as const;

/** 球径。canvas 按它等比放大，宽是它的 820/222 倍，高是 440/222 倍。 */
export const BALL_DIAMETER = ARTBOARD.radius * 2;

/**
 * 版面上给一颗球留的框，按球径的倍数，与 iOS 宿主同一比例。
 * 耳、手与飘带在框外画，框只管排版与命中：canvas 比框大，溢出的部分不吃指针。
 */
export const FRAME = { width: 1.7, height: 1.4 } as const;

/** 命中圆的半径，球径的六成，与 iOS 的 OrbPoke 同一判据：手指落点与人眼看到的球心差得不少。 */
export const POKE_RADIUS_RATIO = 0.6;

export type OrbMood = "calm" | "lively" | "loading";
/** 产品只用这两个形态（角色系统第八节），其余固定形态不进官网。 */
export type OrbState = "idle" | "wide";
export type OrbFacing = "rest" | "front";
export type OrbTheme = "light" | "dark" | "dim";
export type OrbPalette =
  "amber" | "ziwei" | "vermilion" | "pine" | "ochre" | "ink" | "rouge";

/** 一颗球此刻的样子，与契约同构的三格。戳球是事件，不在这里。 */
export interface OrbLook {
  mood: OrbMood;
  state: OrbState;
  facing: OrbFacing;
}

/** 宿主开场一次写全的输入。指针三格与 poke 是宿主的方法，不在这里。 */
export interface OrbInputs extends OrbLook {
  theme: OrbTheme;
  palette: OrbPalette;
  /** 节目单与飘带的随机种子。同屏两颗球必须不同，不然同一时刻做同一个动作。 */
  seed: number;
}

export interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
}

/** 球在页面坐标里的圆心与半径。contain 把 artboard 等比塞进 canvas，球半径随同一个倍数缩。 */
export function ballGeometry(box: Box): {
  x: number;
  y: number;
  radius: number;
} {
  const scale = Math.min(
    box.width / ARTBOARD.width,
    box.height / ARTBOARD.height
  );
  return {
    x: box.left + box.width / 2,
    y: box.top + box.height / 2,
    radius: Math.max(scale * ARTBOARD.radius, 1),
  };
}
