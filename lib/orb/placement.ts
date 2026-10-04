import type { OrbInputs } from "./contract";

/** 官网上有球的地方。组件只报自己在哪一处，样子与种子在下面这张表里领。 */
export type OrbSurface = "hero" | "footer";

/** 一处圆球位的输入。明暗不在表里：两处都跟站点明暗走，由 CatOrb 按 next-themes 填。 */
export type OrbPlacement = Omit<OrbInputs, "theme">;

/**
 * 在场地图。两处都是标准档、可戳、跟手；朝向 rest 侧望，因为官网上道长只是陪着，不与人对话。
 * 首屏 lively、页脚 calm，与 App 首页对空态的分档一致：主舞台热闹些，收尾处安静些。
 *
 * 球底下不铺纸底卡片。眼睛是按纸底色实描的，所以球的明暗永远跟它底下的页面走：light 的纸底
 * F4EFE6 落在首屏纸色光束与页脚的 FAFAF8 上，dark 的 0D1B2A 落在夜蓝光束与 070712 上，差都在
 * 一档以内。
 */
export const PLACEMENTS: Record<OrbSurface, OrbPlacement> = {
  hero: {
    mood: "lively",
    state: "idle",
    facing: "rest",
    palette: "amber",
    seed: 1,
  },
  footer: {
    mood: "calm",
    state: "idle",
    facing: "rest",
    palette: "amber",
    seed: 2,
  },
};
