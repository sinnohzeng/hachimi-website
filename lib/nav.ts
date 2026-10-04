import type { Translations } from "./i18n/types.ts";

/**
 * 首页的四个锚：命例 · 工具 · 学堂 · 常见问题。顶栏导航与页脚“产品”一栏都由它生成，
 * 标签取 i18n 的 nav。定位一节紧跟首屏，滚一下就到，不另设导航项。
 */
export const NAV_ITEMS = [
  { key: "case", hash: "#case" },
  { key: "tools", hash: "#tools" },
  { key: "academy", hash: "#academy" },
  { key: "faq", hash: "#faq" },
] as const satisfies readonly {
  key: keyof Translations["nav"];
  hash: `#${string}`;
}[];
