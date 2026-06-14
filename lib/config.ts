/**
 * ============================================================================
 * SITE CONFIGURATION
 * ============================================================================
 * Master Hachimi (哈基米道长) — cat-themed Mei Hua Yi Shu divination companion.
 * Brand Hachimi.ai · operated by 元竹投資有限公司 (Yuan Zhu Investment Limited, HK).
 */

export const siteConfig = {
  name: "Master Hachimi",
  tagline: "Ask the cat. Feel heard.",
  description:
    "Master Hachimi (哈基米道长) is a cat-themed Mei Hua Yi Shu divination companion. Share two numbers and your question; the cat-master casts a hexagram and reads it back in a warm voice — for entertainment and emotional comfort, never prediction. No account, history stays on your device, no ads.",
  url: "https://hachimi.ai",
  email: "support@hachimi.ai",

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

/**
 * ============================================================================
 * THEME CONFIGURATION
 * ============================================================================
 */
export const themeConfig = {
  defaultTheme: "system" as "light" | "dark" | "system",
  enableSystemTheme: true,
} as const;
