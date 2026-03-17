/**
 * ============================================================================
 * SITE CONFIGURATION
 * ============================================================================
 */

export const siteConfig = {
  name: "Hachimi",
  tagline: "Your awareness companion.",
  description:
    "A gentle awareness companion with a cat by your side. Record a Daily Light, stay focused, offload worries, and watch your cat react to your mood. Free, no ads.",
  url: "https://hachimi.ai",
  github: "https://github.com/sinnohzeng/hachimi-app",
  apkDownload:
    "https://github.com/sinnohzeng/hachimi-app/releases/latest",
  googlePlay:
    "https://play.google.com/store/apps/details?id=com.hachimi.hachimi_app",

  nav: {
    cta: {
      text: "Download",
      href: "https://github.com/sinnohzeng/hachimi-app/releases/latest",
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
