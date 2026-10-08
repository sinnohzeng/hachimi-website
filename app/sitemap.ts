import type { MetadataRoute } from "next";
import { pageDates, siteConfig } from "@/lib/config";
import { legalLastUpdated } from "@/lib/legal";
import { locales } from "@/lib/locale";
import { PAGES, type PageKey } from "@/lib/pages";

export const dynamic = "force-static";

type SitemapPage = {
  [K in PageKey]: (typeof PAGES)[K]["sitemap"] extends true ? K : never;
}[PageKey];

const inSitemap = (page: PageKey): page is SitemapPage => PAGES[page].sitemap;

/** 内容最后改动的日期：隐私与条款读法律件的“最后更新”，其余见 lib/config.ts 的 pageDates。 */
function lastModified(page: SitemapPage): string {
  return page === "privacy" || page === "terms"
    ? legalLastUpdated(page)
    : pageDates[page];
}

/** 首页加总表里进站点地图的子页，按总表的次序。 */
const pages: { path: string; date: string }[] = [
  { path: "", date: pageDates.home },
  ...(Object.keys(PAGES) as PageKey[])
    .filter(inSitemap)
    .map((page) => ({ path: PAGES[page].path, date: lastModified(page) })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${page.path}`,
      lastModified: page.date,
    }))
  );
}
