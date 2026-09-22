/**
 * ============================================================================
 * SITE CONFIGURATION
 * ============================================================================
 * Hachimi.ai (哈基米道长): a cat-themed companion that casts Mei Hua Yi Shu
 * hexagrams and builds Zi Wei Dou Shu / Ba Zi charts on the device.
 * Brand Hachimi.ai · the operating company is named in the legal pages only.
 */

/**
 * Single source of truth for site identity. lib/metadata.ts builds the Next.js
 * Metadata object from this. Do NOT redeclare name/description elsewhere or
 * they will drift.
 */
export const siteConfig = {
  name: "Hachimi.ai",
  // Longer descriptive form used as the SEO <title> / OpenGraph title.
  seoTitle: "Hachimi.ai · 哈基米道长",
  // 第三版的北极星原句，与首屏 hero.headline 同一句，owner 定稿，不送润色。
  tagline: "When it's a lot, cast a hexagram.",
  description:
    "Hachimi.ai is an app for studying Chinese folk fate arts, with a cat Daoist inside. Give two numbers and write your question, and he casts by Mei Hua Yi Shu, Plum Blossom divination, and reads it to you. Enter birth details, and Zi Wei Dou Shu (Purple Star astrology) and Ba Zi (Four Pillars) charts are built on your phone, even with no internet. Keep each person as a case, with their charts and every hexagram cast for them in one place. The Academy carries the old texts of the five arts. For fun and company only, no predictions.",
  url: "https://hachimi.ai",
  email: "voice@hachimi.ai",
  creator: "@sinnohzeng",
  // Public byline everywhere (meta author + JSON-LD Organization). The legal
  // entity appears only in the legal pages' own copy.
  authors: [
    {
      name: "Hachimi.ai",
      url: "https://hachimi.ai",
    },
  ],
  // 给检索引擎的词，不是正文，不随正文降级（见 docs/copy-principles.md 五之补）。
  keywords: [
    "Chinese folk fate arts",
    "Mei Hua Yi Shu",
    "plum blossom numerology",
    "I Ching",
    "hexagram",
    "Zi Wei Dou Shu",
    "Purple Star astrology",
    "BaZi",
    "Four Pillars",
    "natal chart",
    "case management",
    "birth chart app",
    "offline chart",
    "紫微斗数排盘",
    "八字排盘",
    "梅花易数起卦",
    "命例管理",
    "cat Daoist",
  ],

  // Live store listings. The bare apps.apple.com form (no storefront segment)
  // lets Apple route visitors to their local storefront.
  appStore: "https://apps.apple.com/app/id6787621766",
  appStoreId: "6787621766",
  googlePlay:
    "https://play.google.com/store/apps/details?id=com.hachimi.hachimi_app",
} as const;

/**
 * Per-page "content last changed" dates (SSOT). app/sitemap.ts reads these for
 * lastModified and structured-data.tsx for dateModified — never use build
 * time, which would stamp every deploy as a content change.
 *
 * Bump a date only when that page's visible content changes. Legal pages must
 * stay in lockstep with the visible `effectiveDate` strings in lib/i18n.
 */
export const pageDates = {
  home: "2026-09-14",
  methodology: "2026-09-14",
  privacy: "2026-07-21",
  terms: "2026-06-14",
  support: "2026-07-04",
  accountDeletion: "2026-07-11",
  dataDeletion: "2026-07-11",
} as const;

/**
 * ============================================================================
 * FEATURE FLAGS
 * ============================================================================
 */
export const features = {
  smoothScroll: true,
} as const;
