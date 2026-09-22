import type { OrbInputs } from "./contract";

/** 官网上有球的地方。组件只报自己在哪一处，样子与种子在下面这张表里领。 */
export type OrbSurface = "hero" | "footer";

/**
 * 在场地图。两处都是标准档、可戳、跟手；朝向 rest 侧望，因为官网上道长只是陪着，不与人对话。
 * 明暗固定 dark：两处的纸底卡片不随站点主题换色，首屏本就压在深色 shader 上，页脚那张卡从前就是深的。
 * 首屏 lively、页脚 calm，与 App 首页对空态的分档一致：主舞台热闹些，收尾处安静些。
 */
export const PLACEMENTS: Record<OrbSurface, OrbInputs> = {
  hero: {
    mood: "lively",
    state: "idle",
    facing: "rest",
    theme: "dark",
    palette: "amber",
    seed: 1,
  },
  footer: {
    mood: "calm",
    state: "idle",
    facing: "rest",
    theme: "dark",
    palette: "amber",
    seed: 2,
  },
};
