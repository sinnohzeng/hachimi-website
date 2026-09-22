/**
 * 光束 shader 的调色板。两套：amber 给首屏，ink 给收尾，各带明暗。
 *
 * 颜色都从 app/globals.css 的品牌 token 推出来，不另起色。换色请回那里改 token
 * 再按下面的换算改这里的数，别就地调出第三种琥珀。
 *
 * 换算口径：十六进制除以 255 得 0 到 1 的分量，再乘一个压暗系数，注释里写成
 * 「#xxxxxx ×k」。片元最后还要乘 brightness，所以单看某一项的数值不等于屏幕上
 * 的颜色，实际观感见下面每套的落点说明。
 *
 * 片元的配色链路（见 components/shader-canvas.tsx 的 FRAG）：
 *   col = mix(base, warm, a*2.5) → mix(col, mid, b*1.5) → mix(col, cool, dd)
 *   col = col * rgScale * brightness
 * a、b、dd 是三层噪声，各自均值约 0.4。所以 warm 是光束的峰值色，mid 与 cool 决
 * 定底色，base 只在最暗的窝里露脸。四个色的权重大致是 warm 0.24、mid 0.36、
 * cool 0.40。
 */

export type RGB = readonly [number, number, number];

/** 一套明或暗的完整取色。字段名对应片元里的 u_pal_* uniform。 */
export interface ShaderTone {
  /** 最暗处的底 */
  readonly base: RGB;
  /** 光束峰值色 */
  readonly warm: RGB;
  /** 中间层 */
  readonly mid: RGB;
  /** 最外层，压住整体色温 */
  readonly cool: RGB;
  /** 光标处叠加的高光，按指针强度淡入 */
  readonly cursor: RGB;
  /** 三通道各自的缩放，用来整体偏冷或偏暖 */
  readonly rgScale: RGB;
  /** 最终亮度倍率 */
  readonly brightness: number;
}

export interface ShaderPalette {
  readonly light: ShaderTone;
  readonly dark: ShaderTone;
}

export const SHADER_PALETTES = {
  /**
   * amber：首屏。深色从夜蓝 #0D1B2A 一路暖到品牌琥珀（--accent 深色档
   * #f59e0b）；浅色是纸色 #F4EFE6 上淡淡的暖光，暖光偏向 --accent 浅色档
   * #d97706 的色相。
   *
   * 落点（离线模拟 1440 宽整屏）：深色中位亮度约 0.11，最暗的窝是夜蓝，最亮的
   * 光束到 #3d2a18 一线的琥珀；浅色中位亮度约 0.93，通篇在纸色上下浮动。
   */
  amber: {
    dark: {
      // #0D1B2A ×0.38，夜蓝压到最深，只在噪声的窝里露出来
      base: [0.018, 0.04, 0.07],
      // #f59e0b ×0.708，品牌琥珀，光束的峰值
      warm: [0.68, 0.44, 0.03],
      // #0D1B2A ×0.95，夜蓝的本色，撑住底子的冷调
      mid: [0.045, 0.1, 0.16],
      // #0D1B2A ×0.38，最外层再压一档，让边缘沉下去
      cool: [0.018, 0.04, 0.068],
      // #f59e0b ×0.145，光标处的一点琥珀余晖
      cursor: [0.14, 0.08, 0.012],
      // 绿 ×0.9 蓝 ×1.3：琥珀与夜蓝在中间调相遇会发橄榄绿，压绿抬蓝把它拉回
      // 琥珀配夜蓝。琥珀峰值的蓝本来就近零，抬蓝动不到它。
      rgScale: [1.0, 0.9, 1.3],
      brightness: 0.78,
    },
    light: {
      // #F4EFE6 往暖里压一档的赭色，纸的暗面
      base: [0.9, 0.83, 0.72],
      // 纸色被 #d97706 的暖光照亮：红满、绿稍降、蓝明显降
      warm: [1.0, 0.935, 0.82],
      // #F4EFE6 原值，纸色本身
      mid: [0.957, 0.937, 0.902],
      // #F4EFE6 ×0.977，纸的背光面
      cool: [0.935, 0.915, 0.885],
      // #d97706 ×0.06，浅底上光标只敢加这么一点
      cursor: [0.05, 0.035, 0.012],
      rgScale: [1.0, 1.0, 1.0],
      brightness: 1.0,
    },
  },
  /**
   * ink：收尾。墨底加一点金，比 amber 更暗更静，不跟徽章抢。深色的墨取
   * --background 深色档 #070712 的偏中性版本，金是 #f59e0b 降饱和后的档；浅色
   * 是纸上淡墨，同样带一点金。
   *
   * 落点：深色中位亮度约 0.085，比 amber 暗三成；浅色中位亮度约 0.91，比 amber
   * 浅色略灰，墨味从这里来。
   */
  ink: {
    dark: {
      // #070712 往中性挪，墨的最深处
      base: [0.018, 0.019, 0.04],
      // #f59e0b 降饱和后的金，比 amber 的琥珀钝、不刺
      warm: [0.44, 0.355, 0.14],
      // 墨的中间调，蓝略高于红绿，避免整片发褐
      mid: [0.026, 0.028, 0.048],
      // 墨的最外层
      cool: [0.012, 0.013, 0.024],
      // 金的一点余晖
      cursor: [0.12, 0.09, 0.03],
      rgScale: [1.0, 1.0, 1.0],
      brightness: 0.95,
    },
    light: {
      // 纸上最重的一笔淡墨
      base: [0.79, 0.78, 0.765],
      // 金晕照亮的纸
      warm: [0.99, 0.955, 0.875],
      // 淡墨的水痕，三通道接近，只比纸暗一档
      mid: [0.885, 0.875, 0.862],
      // #F4EFE6 略去黄，墨旁边的白纸
      cool: [0.94, 0.935, 0.925],
      cursor: [0.04, 0.032, 0.014],
      rgScale: [1.0, 1.0, 1.0],
      brightness: 1.0,
    },
  },
} as const satisfies Record<string, ShaderPalette>;

export type ShaderPaletteName = keyof typeof SHADER_PALETTES;
