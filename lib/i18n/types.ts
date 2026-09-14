export type Translations = {
  // Header
  nav: {
    chart: string;
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
    shotAlt: string;
  };

  // 第二节 这是什么：品类锚做标题，三步做正文。
  whatItIs: {
    title: string;
    steps: string[];
  };

  // 第三节 道长记得：差异句一句，整节只有这一句。
  remembers: {
    text: string;
  };

  // 第四节 排一张盘：紫微一句一图、八字一句一图，外加一条进方法页的链接。
  // 三种盘式、格局规则、安星设置这些机制都搬去了方法页的排盘一节。
  chart: {
    title: string;
    ziwei: string;
    bazi: string;
    /** 链接文字，指向 /{locale}/methodology#paipan。 */
    cta: string;
    shotAlts: {
      ziwei: string;
      bazi: string;
    };
  };

  // 第五节 学堂：一句，不配图。学堂改版落地后再补一张根屏图。
  academy: {
    text: string;
  };

  // 第六节 本机算：一句加三个标签。
  principles: {
    text: string;
    tags: string[];
  };

  // FAQ
  faq: {
    title: string;
    subtitle: string;
    items: {
      question: string;
      answer: string;
    }[];
    stillHaveQuestions: string;
    contact: string;
  };

  // 第七节的结尾：商店徽章加一句话，不再带补充小字。
  finalCta: {
    headline: string;
  };

  // Footer
  footer: {
    /** 徽章上方那一行统计小字，接住了原来独占一屏的 Stats 节。 */
    stats: string;
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
