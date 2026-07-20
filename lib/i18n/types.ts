export type Translations = {
  // Header
  nav: {
    features: string;
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

  // Hero
  hero: {
    badge: string;
    headline1: string;
    headline2: string;
    description: string;
    cta: string;
  };

  // Scenario Cards (three heart-matters + open question)
  scenarioCards: {
    title: string;
    subtitle: string;
    cards: {
      name: string;
      blurb: string;
      line: string;
      // Only the find-item card carries this: it is the one scenario whose
      // reading includes a direction computed by the cast core, so the card
      // has to say what that direction is (and is not) before anyone taps it.
      note?: string;
    }[];
    openName: string;
    openBlurb: string;
  };

  // Feature Cards
  featureCards: {
    title: string;
    subtitle: string;
    // Visible label on each card's arrow row; the whole card links to
    // /methodology and this makes the destination explicit.
    readMore: string;
    cards: {
      title: string;
      description: string;
    }[];
  };

  // Feature Highlight
  featureHighlight: {
    title1: string;
    title2: string;
    description: string;
    features: string[];
    cta: string;
    phonePlaceholder: string;
  };

  // Principles
  principles: {
    badge: string;
    title1: string;
    title2: string;
    description: string;
    cta: string;
    cards: string[];
  };

  // Stats
  stats: {
    items: {
      label: string;
    }[];
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

  // Final CTA (the #download landing section: store badges + one small line).
  // note 只写长期成立的产品事实（如起卦耗时），不写会随商业化变化的口径
  // （免费/无广告/无账号这类现状不当卖点，见 2026-07-09 owner 反馈）。
  finalCta: {
    headline: string;
    note: string;
  };

  // Footer
  footer: {
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
