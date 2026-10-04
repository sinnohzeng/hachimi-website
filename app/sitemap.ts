import type { MetadataRoute } from "next";
import { pageDates, siteConfig } from "@/lib/config";
import { legalLastUpdated } from "@/lib/legal";
import { locales } from "@/lib/locale";

export const dynamic = "force-static";

/** 每页给网址与内容最后改动的日期，日期出处见 lib/config.ts 的 pageDates。 */
const pages: { path: string; date: string }[] = [
  { path: "", date: pageDates.home },
  { path: "/support", date: pageDates.support },
  { path: "/privacy", date: legalLastUpdated("privacy") },
  { path: "/terms", date: legalLastUpdated("terms") },
  { path: "/data-deletion", date: pageDates.dataDeletion },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${page.path}`,
      lastModified: page.date,
    }))
  );
}
