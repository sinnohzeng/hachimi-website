/**
 * 站点信息的唯一出处：品牌名、描述、邮箱、商店链接、主题色与页面日期。lib/metadata.ts、
 * app/manifest.ts、结构化数据、页面组件与 scripts/ 都从这里取，别处不再写一遍。
 * 运营公司只在法律件与删除数据页的联系方式里出现。
 */
export const siteConfig = {
  name: "Hachimi.ai",
  /** 中文品牌名，与 name 并列出现在标题与分享卡上。 */
  nameZh: "哈基米道长",
  // Longer descriptive form used as the SEO <title> / OpenGraph title.
  seoTitle: "Hachimi.ai · 哈基米道长",
  description:
    "Hachimi.ai is a charting tool for fate readers and enthusiasts. One person, one case: enter a birth once and get Zi Wei Dou Shu (Purple Star astrology) and Ba Zi (Four Pillars) charts together.",
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
  // 给检索引擎的词，不是正文，不随正文降级（见 hachimi-ios docs/copy-principles.md 第七节）。
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

  /** 页面底色，与 app/globals.css 的 --background 同值，浏览器地址栏与 manifest 取它。 */
  themeColor: { light: "#fafaf8", dark: "#070712" },
} as const;

/**
 * 页面内容最后一次改动的日期。sitemap 的 lastModified、结构化数据的 dateModified 与支持页、
 * 删除数据页上看得到的“最后更新”都读它，不用构建时间：每次推送都会整站重建。
 * 隐私政策与使用条款的日期在 content/legal/ 的 Markdown 里，由 lib/legal.ts 读出。
 *
 * 只在这一页可见内容变了时改日期。
 */
export const pageDates = {
  home: "2026-10-02",
  support: "2026-10-02",
  dataDeletion: "2026-10-02",
} as const;
