/**
 * ============================================================================
 * SITE CONFIGURATION
 * ============================================================================
 * Master Hachimi (哈基米道长) — cat-themed Mei Hua Yi Shu divination companion.
 * Brand Hachimi.ai · operated by 元竹投資有限公司 (Yuenchuk Investment Limited, HK).
 */

/**
 * Single source of truth for site identity. lib/metadata.ts builds the Next.js
 * Metadata object from this — do NOT redeclare name/description elsewhere or
 * they will drift.
 */
export const siteConfig = {
  name: "Master Hachimi",
  // Longer descriptive form used as the SEO <title> / OpenGraph title.
  seoTitle: "Master Hachimi — 哈基米道长 · Cat Divination",
  tagline: "Ask the cat. Feel heard.",
  description:
    "Master Hachimi (哈基米道长) is a cat-themed Mei Hua Yi Shu divination companion. Share two numbers and your question; the cat-master casts a hexagram and reads it back in a warm voice — for entertainment and emotional comfort, never prediction. No account, history stays on your device, no ads.",
  url: "https://hachimi.ai",
  email: "support@hachimi.ai",
  creator: "@sinnohzeng",
  authors: [
    {
      name: "元竹投資有限公司 (Yuenchuk Investment Limited)",
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

  // The app is not yet published to the stores. Until then, store CTAs scroll to
  // the in-page explainer so nothing links to a dead or wrong listing.
  appStore: "#features",
  googlePlay: "#features",

  nav: {
    cta: {
      text: "How it works",
      href: "#features",
    },
  },
} as const;

/**
 * ============================================================================
 * FEATURE FLAGS
 * ============================================================================
 */
export const features = {
  smoothScroll: true,
  darkMode: true,
  statsSection: true,
  blogSection: false,
  testimonialsSection: false,
} as const;
