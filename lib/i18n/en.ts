import type { Translations } from "./types";

export const en: Translations = {
  nav: {
    case: "Cases",
    tools: "Tools",
    academy: "Academy",
    methodology: "Charting rules",
    faq: "FAQ",
    download: "Get the app",
  },
  langSwitch: {
    en: "EN",
    zh: "中文",
  },

  store: {
    appStoreAlt: "Download on the App Store",
    googlePlayAlt: "Get it on Google Play",
  },

  hero: {
    headline: "When it's a lot, cast a hexagram.",
    headlineLines: ["When it's a lot,", "cast a hexagram."],
    shotAlt:
      "Hachimi.ai cast result page screenshot: this hexagram reads auspicious, the hexagram on top and the reading below.",
  },

  what: {
    title: "A tool built for professional fate readers.",
    items: [
      {
        title: "Enter a birth once, get both charts",
        body: "One case gives you both Zi Wei Dou Shu and Ba Zi. True solar time is worked out once, so the two charts agree.",
      },
      {
        title: "Client records move with you",
        body: "iPhone and iPad sync through iCloud. On Android, cases are saved with your system backup. Both can export a backup file.",
      },
      {
        title: "Three Zi Wei chart styles, Ba Zi to six pillars",
        body: "Switch between San He, Flying Star and Four Transformations, with fortune layers down to the hour. Beyond the four pillars, Ba Zi has a six-pillar chart with major and annual cycles.",
      },
    ],
  },

  case: {
    title: "One client, one case",
    lead: "Zi Wei, Ba Zi and every hexagram you cast for this client sit under one case.",
    steps: [
      {
        title: "Create a case",
        body: "Enter a solar date, lunar date or four pillars, and pick the birthplace by province and city.",
      },
      {
        title: "Chart Zi Wei",
        body: "Once the birth is in, the Zi Wei chart is ready.",
      },
      {
        title: "Switch to Ba Zi",
        body: "Same birth details. No need to enter them again.",
      },
      {
        title: "Cast for this client",
        body: "Choose who the question is for. The hexagram and reading are filed under that case.",
      },
      {
        title: "Look back at every cast",
        body: "Past questions are listed by date; tap one to open that hexagram. Ask for this client again, and the Master picks up where the last reading left off.",
      },
    ],
    shotAlts: [
      "Case list screenshot: every row shows the four pillars on the right, colored by the five elements.",
      "Zi Wei Dou Shu San He chart screenshot with the twelve palaces and the three-way four-point links.",
      "Ba Zi four-pillar table screenshot, year month day hour rows down to Nayin and the symbolic stars.",
      "Cast result page screenshot: this hexagram reads auspicious.",
      "Case detail asking side screenshot: every hexagram under the case, newest first.",
    ],
  },

  tools: {
    title: "Four tools",
    hint: "Open a card for the detail.",
    cards: [
      {
        name: "Zi Wei Dou Shu",
        line: "Set star placement to match your school. Paste a star code and your chart matches a colleague's.",
        detail:
          "Chart Patterns are judged by rule, and each one names the layer it comes from. This part needs internet. Press and hold any word on the chart for its entry.",
      },
      {
        name: "Ba Zi charting",
        line: "Clashes, combinations and harms are written out for the natal chart and for the cycles. Take notes on the same page.",
        detail:
          "The four pillars run from main star to Symbolic Stars, and you can choose the hidden-stem rulebook. Press and hold any word on the chart for its entry.",
      },
      {
        name: "Case library",
        line: "Dozens of clients. Filter by group or day master and the one you need is there.",
        detail:
          "You can also filter by gender, zodiac animal and birth decade. Send a single case to a colleague, and it merges into their library when they open it.",
      },
      {
        name: "Mei Hua Yi Shu casting",
        line: "Say two numbers to cast a hexagram, and the Master writes a reading.",
        detail:
          "Original, Nuclear and Resulting hexagrams and Host & Guest sit on one screen. A cast for a client is filed under that case, and you can add what happened later. You can cast without writing a question.",
      },
    ],
  },

  academy: {
    text: "Need a source for a reading? The classics are in the app, sorted by the five arts, and open offline.",
  },

  faq: {
    title: "Frequently asked questions",
    items: [
      {
        question: "How is true solar time worked out?",
        answer:
          "From the birthplace longitude and the equation of time. Pick a province and city or type a longitude; born abroad, pick a time zone. Zi Wei and Ba Zi use the same hour.",
      },
      {
        question: "Do I need internet to chart?",
        answer:
          "No. Charts work in airplane mode. Chart Patterns, zizhan and the Four Pillars lookup need internet.",
      },
      {
        question: "How do I switch chart styles?",
        answer:
          "One tap at the bottom of the chart. Same birth, same Star Settings; the Taiji point and fortune layers follow.",
      },
      {
        question: "What does the Master remember?",
        answer:
          "What you asked for this client before. Ask for them again, and the reading picks up from last time. You can turn it off anytime.",
      },
      {
        question: "Do readings need internet?",
        answer:
          "Yes, with a daily limit. A third-party AI service writes the reading in the Master's voice.",
      },
    ],
    stillHaveQuestions: "Still have questions?",
    contact: "Contact Hachimi.ai",
  },

  finalCta: {
    headline: "Install Hachimi.ai and enter your first client.",
  },

  footer: {
    tagline: "For studying Chinese folk fate arts.",
    copyright: "© 2026 Hachimi.ai. All rights reserved.",
    links: [
      {
        title: "Product",
        items: [
          { label: "Cases", href: "/en#case" },
          { label: "Academy", href: "/en#academy" },
          { label: "Charting rules", href: "/en/methodology" },
          { label: "FAQ", href: "/en#faq" },
        ],
      },
      {
        title: "Contact",
        items: [
          { label: "Support", href: "/en/support" },
          { label: "voice@hachimi.ai", href: "mailto:voice@hachimi.ai" },
        ],
      },
    ],
    legal: [
      { label: "Privacy", href: "/en/privacy" },
      { label: "Terms", href: "/en/terms" },
      { label: "Delete data", href: "/en/data-deletion" },
    ],
  },

  get: {
    title: "Get Hachimi.ai",
    body: "Download it from the App Store for iPhone and iPad, or from Google Play for Android phones.",
    qrCaption: "Scan with your phone to download",
    wechatHint:
      "App stores don’t open inside WeChat. Tap “…” at the top right and choose “Open in Browser”.",
  },

  legalMeta: {
    privacy: {
      title: "Privacy Policy",
      description:
        "Hachimi.ai Privacy Policy: where your cases and history are kept, which features go online, and how to manage and delete them.",
    },
    terms: {
      title: "Terms of Use",
      description:
        "Hachimi.ai Terms of Use: features, readings, membership and license.",
    },
  },

  methodology: {
    metaTitle: "Charting rules",
    metaDescription:
      "How Hachimi.ai charts Zi Wei Dou Shu and Ba Zi: true solar time, calendars, chart styles, Chart Patterns and star schools.",
    badge: "Zi Wei and Ba Zi",
    title1: "Charting rules,",
    title2: "your way",
    lastUpdated: "Last updated 1 October 2026",
    intro:
      "Below are the spots where charting apps most often disagree. Where there's a setting, set it to match your school.",
    points: [
      {
        term: "True solar time",
        desc: "Birth time is adjusted by birthplace longitude and the equation of time. Pick a province and city, or type a longitude. Born abroad? Choose a time zone.",
      },
      {
        term: "Calendar",
        desc: "Enter a solar date, lunar date or four pillars. The chart marks daylight saving, leap months, late zi hour and solar term changes.",
      },
      {
        term: "Three chart styles",
        desc: "One birth, three views: San He, Flying Star and Four Transformations. Switch at the bottom of the chart; the Taiji point and fortune layers follow.",
      },
      {
        term: "Chart Patterns",
        desc: "The app judges each pattern by rule and names the layer it comes from. This needs internet.",
      },
      {
        term: "Star schools",
        desc: "Schools place stars differently. Set each Star Settings item to match yours, or enter a star code.",
      },
      {
        term: "Ba Zi",
        desc: "Ba Zi uses the same birth as Zi Wei. The four-pillar table runs from main star to Nayin and Symbolic Stars. The six-pillar chart carries major and annual cycles; tap any slot and the whole table follows.",
      },
      {
        term: "More chart methods",
        desc: "Zizhan and the Four Pillars lookup are in the More menu and need internet. Screenshots and text charts are there too.",
      },
    ],
    closing: {
      text: "Enter your first client's birth and get both charts.",
      cta: "Get Hachimi.ai",
    },
  },

  dataDeletion: {
    title: "Delete your data",
    effectiveDate: "Last updated: October 1, 2026",
    intro:
      "Your cases, reading history and the notes the Master keeps stay on your device, and you can delete them in the app.",
    steps: {
      heading: "Delete in the app",
      items: [
        "Open Hachimi.ai and go to Me > Privacy and data.",
        "Tap Delete All Reading Data and confirm. This clears reading history, drafts and the Master's notes. On iOS with iCloud sync on, they're deleted on your other devices too.",
        "Delete cases one by one in your case library.",
        "Tap Reset Anonymous ID to get a new one.",
      ],
    },
    sections: [
      {
        heading: "Copies in backups",
        content:
          "You manage copies in iCloud and system backups in your phone's settings. Uninstalling the app doesn't delete them.",
      },
      {
        heading: "Records on our server",
        content:
          "We keep question records for online readings on our server for a while, then delete them. For questions about deletion, write to voice@hachimi.ai.",
      },
      {
        heading: "Contact",
        content:
          "Yuenchuk Investment Limited, Hong Kong. Email voice@hachimi.ai.",
      },
    ],
  },

  support: {
    title: "Support",
    effectiveDate: "Last updated: October 1, 2026",
    intro: "Hit a problem, or want to tell us something? Just send an email.",
    steps: {
      heading: "Check these first",
      items: [
        "Which devices are supported? iPhone and iPad need iOS 26 or later; Android phones need Android 16 or later. The app comes in Simplified Chinese, Traditional Chinese and English.",
        "Reading not coming through? Check your connection and today's limit. The first time, tap Agree and Enable Online Readings. If you chose Not Now before, you can choose again next time you ask.",
        "Changing the language? Go to Me > Language.",
        "Deleting data? For reading data, go to Me > Privacy and data and tap Delete All Reading Data. Delete cases one by one in your case library.",
        "Got a new phone? iPhone and iPad sync on their own when signed in to the same iCloud. On Android, restore from your system backup, or import a backup file you exported.",
      ],
    },
    table: {
      heading: "How to reach us",
      columns: ["Channel", "Address", "Typical response"],
      rows: [
        { cells: ["Email", "voice@hachimi.ai", "Within 3 business days"] },
      ],
    },
  },
};
