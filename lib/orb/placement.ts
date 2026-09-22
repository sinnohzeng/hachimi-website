import type { OrbInputs, OrbTheme } from "./contract";

/** 官网上有球的地方。组件只报自己在哪一处，样子与种子在下面这张表里领。 */
export type OrbSurface = "hero" | "footer";

/** 一处圆球位的输入。明暗可以钉死，也可以跟着站点的明暗走。 */
export type OrbPlacement = Omit<OrbInputs, "theme"> & {
  theme: OrbTheme | "site";
};

/**
 * 在场地图。两处都是标准档、可戳、跟手；朝向 rest 侧望，因为官网上道长只是陪着，不与人对话。
 * 首屏 lively、页脚 calm，与 App 首页对空态的分档一致：主舞台热闹些，收尾处安静些。
 *
 * 不放纸底卡片（owner 2026-09-22 定：外框画蛇添足）。眼睛是按纸底色实描的，所以明暗要与
 * 球底下的页面对得上：首屏压在深色 shader 上钉 dark，纸底 0D1B2A 与 shader 的深蓝相差一档
 * 看不出来；页脚跟站点明暗走，light 的纸底 F4EFE6 落在 FAFAF8 上、dark 的 0D1B2A 落在
 * 070712 上，差都在一档以内。
 */
export const PLACEMENTS: Record<OrbSurface, OrbPlacement> = {
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
    theme: "site",
    palette: "amber",
    seed: 2,
  },
};
