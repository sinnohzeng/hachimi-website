export type Translations = {
  // Header：五项加一个下载。前三项与常见问题是首页锚，起卦的门道是真页。
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

  // 第五节 道长记得：差异句一句，整节只有这一句，逐字揭示。
  remembers: {
    text: string;
  };

  // 第六节 学堂（#academy）：一句加书名跑马灯，书名在 lib/academy-titles.ts。
  academy: {
    text: string;
  };

  // 第七节 本机（#offline）：一句加四个标签，细线框容器。
  offline: {
    text: string;
    tags: string[];
  };

  // 第八节 常见问题（#faq）：七条，第一条直答“这是真的算命吗”。
  faq: {
    title: string;
    items: {
      question: string;
      answer: string;
    }[];
    stillHaveQuestions: string;
    contact: string;
  };

  // 第九节 收尾（#download）：一句加商店徽章，底下是五张截图的扇形。
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

  // Privacy Policy (sections renderer)
  privacy: {
    title: string;
    effectiveDate: string;
    sections: {
      heading: string;
      content: string;
    }[];
  };

  // Terms of Use & Disclaimer (sections renderer)
  terms: {
    title: string;
    effectiveDate: string;
    sections: {
      heading: string;
      content: string;
    }[];
  };

  // Methodology / transparency page (/{locale}/methodology)
  methodology: {
    metaTitle: string;
    metaDescription: string;
    badge: string;
    title1: string;
    title2: string;
    // Visible "last updated" line; keep in lockstep with pageDates.methodology
    // in lib/config.ts.
    lastUpdated: string;
    intro: string;
    cast: {
      kicker: string;
      step: string;
      title: string;
      body: string;
      points: { term: string; desc: string }[];
      fingerprintLabel: string;
      fingerprintNote: string;
    };
    ai: {
      kicker: string;
      step: string;
      title: string;
      body: string;
      writesTitle: string;
      writes: string[];
      lockedTitle: string;
      locked: string[];
    };
    eval: {
      kicker: string;
      step: string;
      title: string;
      body: string;
      stats: { value: string; label: string }[];
      layers: { name: string; desc: string }[];
    };
    // 排盘的门道: the rules behind the charts, sitting between the eval gate
    // and the limits. No step number — casting is 01-03, charting is its own
    // track, not a fourth step of the cast.
    paipan: {
      kicker: string;
      title: string;
      body: string;
      points: { term: string; desc: string }[];
    };
    limits: {
      kicker: string;
      title: string;
      body: string;
      cards: { title: string; desc: string }[];
    };
    closing: {
      text: string;
      ctaPrivacy: string;
      ctaHome: string;
    };
  };

  // Legal pages (Account & data / Data deletion) + Support
  accountDeletion: LegalPage;
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
  dataTable: {
    heading: string;
    columns: string[];
    rows: { cells: string[] }[];
  };
  sections: {
    heading: string;
    content: string;
  }[];
};
