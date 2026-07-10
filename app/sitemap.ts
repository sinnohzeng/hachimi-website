import type { MetadataRoute } from "next";
import { pageDates, siteConfig } from "@/lib/config";

export const dynamic = "force-static";

// lastModified reads the hand-maintained pageDates (lib/config.ts), never the
// build time: Cloudflare Pages rebuilds the whole site on every push, so
// new Date() would stamp every deploy as a sitewide content change and drown
// the freshness signal crawlers rely on.
const pages: {
  path: string;
  date: string;
  changeFrequency: "weekly" | "monthly";
  priority: (locale: string) => number;
}[] = [
  {
    path: "",
    date: pageDates.home,
    changeFrequency: "weekly",
    priority: (locale) => (locale === "en" ? 1 : 0.9),
  },
  {
    path: "/methodology",
    date: pageDates.methodology,
    changeFrequency: "monthly",
    priority: () => 0.6,
  },
  {
    path: "/support",
    date: pageDates.support,
    changeFrequency: "monthly",
    priority: () => 0.4,
  },
  {
    path: "/privacy",
    date: pageDates.privacy,
    changeFrequency: "monthly",
    priority: () => 0.3,
  },
  {
    path: "/terms",
    date: pageDates.terms,
    changeFrequency: "monthly",
    priority: () => 0.3,
  },
  {
    path: "/account-deletion",
    date: pageDates.accountDeletion,
    changeFrequency: "monthly",
    priority: () => 0.3,
  },
  {
    path: "/data-deletion",
    date: pageDates.dataDeletion,
    changeFrequency: "monthly",
    priority: () => 0.3,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((page) =>
    ["en", "zh"].map((locale) => ({
      url: `${siteConfig.url}/${locale}${page.path}`,
      lastModified: page.date,
      changeFrequency: page.changeFrequency,
      priority: page.priority(locale),
    }))
  );
}
