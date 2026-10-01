export type Translations = {
  // Header：五项加一个下载。前三项与常见问题是首页锚，排盘的规矩是真页。
  nav: {
    case: string;
    tools: string;
    academy: string;
    methodology: string;
    faq: string;
    download: string;
  };
  langSwitch: {
    en: string;
    zh: string;
  };

  // Store badges (official badge wording, used as alt text)
  store: {
    appStoreAlt: string;
    googlePlayAlt: string;
  };

  // 第一节 首屏：一句主标题 + 商店徽章 + 一张起卦结果图。第三版把 eyebrow、
  // description、差异句与第二 CTA 全部撤走，各自有了新落点或被砍。
  hero: {
    headline: string;
    /** 首屏主标题按这几行断开排。连起来读与 headline 是同一句。 */
    headlineLines: string[];
    shotAlt: string;
  };

  // 第二节 给命理师（#what）：一句随滚动逐字点亮，下面三件事各一张小卡。
  what: {
    title: string;
    items: { title: string; body: string }[];
  };

  // 第三节 命例走查（#case）：一句引言加五步，桌面端钉住手机随滚动换屏。
  // steps 与 shotAlts 一一对应，顺序就是走查顺序，改一边要改另一边。
  case: {
    title: string;
    lead: string;
    steps: {
      title: string;
      body: string;
    }[];
    /** 五张截图的 alt，顺序同 steps。 */
    shotAlts: string[];
  };

  // 第四节 四件工具（#tools）：四张卡，卡面只有名字与一句，点开才见机制事实。
  tools: {
    title: string;
    /** 卡组上方那句操作提示。 */
    hint: string;
    cards: {
      name: string;
      line: string;
      /** 展开后的机制事实，出处见 docs/research 的 App 清单。 */
      detail: string;
    }[];
  };

  // 第五节 学堂（#academy）：一句加书名跑马灯，书名在 lib/academy-titles.ts。
  academy: {
    text: string;
  };

  // 第六节 常见问题（#faq）：五条。
  faq: {
    title: string;
    items: {
      question: string;
      answer: string;
    }[];
    stillHaveQuestions: string;
    contact: string;
  };

  // 第七节 收尾（#download）：一句加商店徽章，底下是五张截图的扇形。
  finalCta: {
    headline: string;
  };

  // Footer
  footer: {
    /** 字标下面那一句定位语。 */
    tagline: string;
    copyright: string;
    links: {
      title: string;
      items: { label: string; href: string }[];
    }[];
    legal: { label: string; href: string }[];
  };

  // 下载落地页（/{locale}/get）：/get 在微信里与桌面上落到这里。
  get: {
    title: string;
    body: string;
    /** 二维码下面那一行，只在桌面宽度出现。 */
    qrCaption: string;
    /** 只在微信里显示。 */
    wechatHint: string;
  };

  // 隐私政策与使用条款的正文是 content/legal/ 的 Markdown（hachimi-ios
  // docs/legal/ 的镜像），这里只放两页的页面元数据。
  legalMeta: {
    privacy: { title: string; description: string };
    terms: { title: string; description: string };
  };

  // 排盘的规矩（/{locale}/methodology）：页首一段，下面逐条讲各家最容易排得不一样
  // 的几处，收尾一句加一枚下载按钮。
  methodology: {
    metaTitle: string;
    metaDescription: string;
    badge: string;
    title1: string;
    title2: string;
    // Visible "last updated" line; must equal pageDates.methodology in
    // lib/config.ts (scripts/page-dates.test.mjs checks).
    lastUpdated: string;
    intro: string;
    points: { term: string; desc: string }[];
    closing: {
      text: string;
      /** 按钮文字，指向 /{locale}/get。 */
      cta: string;
    };
  };

  // 删除数据页与支持页（同一个 LegalPageContent 渲染器）
  dataDeletion: LegalPage;
  support: LegalPage;
};

export type LegalPage = {
  title: string;
  effectiveDate: string;
  intro: string;
  steps: {
    heading: string;
    items: string[];
  };
  /** 支持页的联系方式表。 */
  table?: {
    heading: string;
    columns: string[];
    rows: { cells: string[] }[];
  };
  /** 删除数据页的几节说明。 */
  sections?: {
    heading: string;
    content: string;
  }[];
};
