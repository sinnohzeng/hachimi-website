/**
 * ============================================================================
 * SITE CONFIGURATION
 * ============================================================================
 * Master Hachimi (哈基米道长): cat-themed Mei Hua Yi Shu divination companion.
 * Brand Hachimi.ai · the operating company is named in the legal pages only.
 */

/**
 * Single source of truth for site identity. lib/metadata.ts builds the Next.js
 * Metadata object from this. Do NOT redeclare name/description elsewhere or
 * they will drift.
 */
export const siteConfig = {
  name: "Master Hachimi",
  // Longer descriptive form used as the SEO <title> / OpenGraph title.
  seoTitle: "Master Hachimi · 哈基米道长",
  tagline: "When it's a lot, cast a hexagram.",
  description:
    "Master Hachimi (哈基米道长) is a cat-themed Mei Hua Yi Shu (Plum Blossom divination) app. Give two numbers and your question, and Master Hachimi casts a hexagram, a six-line sign, and reads it with you to find one small step. For entertainment and comfort only, never prediction. No account, your history stays on your phone, no ads.",
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
  keywords: [
    "divination",
    "Mei Hua Yi Shu",
    "plum blossom numerology",
    "I Ching",
    "hexagram",
    "cat",
    "emotional companion",
    "oracle app",
    "iOS app",
    "privacy first",
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
  home: "2026-07-09",
  methodology: "2026-07-09",
  privacy: "2026-07-11",
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
