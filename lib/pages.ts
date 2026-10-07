import type { Translations } from "./i18n/types.ts";

/**
 * app/[locale] 下首页之外的子页总表。路径只在这里写一次，sitemap、页脚、各页的 metadata
 * 与面包屑都从这张表取；键与 i18n `meta` 里那一格同名，标题与描述在那里。`sitemap` 为假的
 * 不进站点地图：/get 是按平台分流的下载落地页。
 */
export const PAGES = {
  support: { path: "/support", sitemap: true },
  privacy: { path: "/privacy", sitemap: true },
  terms: { path: "/terms", sitemap: true },
  dataDeletion: { path: "/data-deletion", sitemap: true },
  get: { path: "/get", sitemap: false },
} as const satisfies Record<
  Exclude<keyof Translations["meta"], "home">,
  { path: `/${string}`; sitemap: boolean }
>;

export type PageKey = keyof typeof PAGES;
