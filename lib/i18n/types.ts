export type Translations = {
  // Header
  nav: {
    features: string;
    tech: string;
    faq: string;
  };
  langSwitch: {
    en: string;
    zh: string;
  };

  // Hero
  hero: {
    badge: string;
    headline1: string;
    headline2: string;
    description: string;
    cta: string;
    securityBadge: string;
  };

  // Scenario Cards (three heart-matters + open question)
  scenarioCards: {
    title: string;
    subtitle: string;
    cards: {
      name: string;
      blurb: string;
      line: string;
    }[];
    openName: string;
    openBlurb: string;
  };

  // Feature Cards
  featureCards: {
    title: string;
    subtitle: string;
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

  // Final CTA
  finalCta: {
    headline: string;
    cta: string;
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
