// 全站动画 tokens——ease / 时长档 / 位移档 / 交错 / 视口边距的唯一来源，
// 以及入场动画的共享 props 帮手。纯常量与纯函数（无 "use client"），由各
// client 组件导入后直接展开到 motion.* 元素上。
//
// 所有入场帮手都携带 data-animate 属性：SSR 会把 initial 状态输出为内联
// opacity:0，JS 失效时内容将永久不可见；globals.css 的无 JS 救援选择器
// （html.no-js [data-animate]）以 !important 强制回显，见该处注释。

export const EASE = [0.16, 1, 0.3, 1] as const;

export const DUR = {
  /** whileTap、汉堡中线等微交互 */
  tap: 0.15,
  /** 图标旋转、遮罩淡入、手风琴高度 */
  fast: 0.25,
  /** 次级入场（段落、CTA、列表项） */
  base: 0.5,
  /** 主入场（标题、卡片、hero 各块） */
  slow: 0.6,
  /** 大媒体块（手机样机） */
  slower: 0.8,
  /** 氛围层（hero 装饰框线） */
  ambient: 1.2,
} as const;

/** 入场位移档（px）。sm 供 header 下落（取负）使用。 */
export const DIST = { sm: 10, md: 20, lg: 30, xl: 40 } as const;

export const STAGGER = { grid: 0.1, list: 0.08, tight: 0.06 } as const;

/** whileInView 视口提前量：early 用于长文页，card 用于卡片网格。 */
export const MARGIN = { early: "-80px", card: "-100px" } as const;

type RevealOpts = {
  dist?: number;
  duration?: number;
  margin?: string;
};

/** 滚动入视淡升（whileInView once）。全站区块入场的标准形态。 */
export function reveal(delay = 0, opts: RevealOpts = {}) {
  const { dist = DIST.md, duration = DUR.slow, margin } = opts;
  return {
    initial: { opacity: 0, y: dist },
    whileInView: { opacity: 1, y: 0 },
    viewport: margin ? { once: true, margin } : { once: true },
    transition: { duration, delay, ease: EASE },
    "data-animate": "",
  };
}

/** 挂载即淡升（hero 等首屏元素，无需滚动触发）。 */
export function mountRise(delay = 0, opts: RevealOpts = {}) {
  const { dist = DIST.md, duration = DUR.slow } = opts;
  return {
    initial: { opacity: 0, y: dist },
    animate: { opacity: 1, y: 0 },
    transition: { duration, delay, ease: EASE },
    "data-animate": "",
  };
}

/** 挂载即下落（header 导航项）。 */
export function mountDrop(delay = 0) {
  return {
    initial: { opacity: 0, y: -DIST.sm },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DUR.base, delay, ease: EASE },
    "data-animate": "",
  };
}

/** 挂载纯淡入（hero 装饰框线等氛围层）。 */
export function mountFade(delay = 0, duration: number = DUR.ambient) {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration, delay, ease: EASE },
    "data-animate": "",
  };
}

/** 卡片悬停上浮 / 按压回落预设。 */
export const hoverLift = {
  y: -4,
  transition: { duration: DUR.fast, ease: EASE },
} as const;

export const tapPress = {
  y: -1,
  transition: { duration: DUR.tap, ease: EASE },
} as const;
