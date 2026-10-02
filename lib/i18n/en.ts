import type { Translations } from "./types";

export const en: Translations = {
  nav: {
    case: "Cases",
    tools: "Tools",
    academy: "Academy",
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
    title: "A charting tool for fate readers and enthusiasts.",
    titleLines: ["A charting tool for fate readers and enthusiasts."],
    items: [
      {
        title: "Enter a birth once, get both charts",
        body: "One case gives you both Zi Wei Dou Shu and Ba Zi. True solar time is worked out once, so the two charts agree.",
      },
      {
        title: "Your cases stay when you switch phones",
        body: "iPhone and iPad sync through iCloud. On Android, cases are saved with your system backup. Both can export a backup file.",
      },
      {
        title: "Three Zi Wei chart styles, Ba Zi to six pillars",
        body: "Switch between San He, Flying Star and Four Transformations, with fortune layers down to the hour. Beyond the four pillars, Ba Zi has a six-pillar chart with major and annual cycles.",
      },
    ],
  },

  case: {
    title: "One person, one case",
    lead: "Clients, family, friends and you each get a case. It holds that person's Zi Wei and Ba Zi charts and every hexagram cast for them.",
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
        title: "Cast for this person",
        body: "Choose who the question is for. The hexagram and reading are filed under that case.",
      },
      {
        title: "Look back at every cast",
        body: "Past questions are listed by date; tap one to open that hexagram. Ask for them again, and the Master picks up where the last reading left off.",
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
        line: "Set star placement to match your school. Paste someone's star code and your chart matches theirs.",
        detail:
          "Chart Patterns are judged by rule, and each one names the layer it comes from. This part needs internet. Zizhan, a Zi Wei chart cast for this moment, is under Me > Tools. Press and hold any word on the chart for its entry.",
      },
      {
        name: "Ba Zi charting",
        line: "Punishments, clashes, combinations and harms are written out for the natal chart and for the cycles. Take notes on the same page.",
        detail:
          "The four pillars run from Ten Gods to Symbolic Stars, and you can pick the rule for the Stem in Charge. The four-pillar lookup is under Me > Tools. Press and hold any word on the chart for its entry.",
      },
      {
        name: "Case library",
        line: "Lots of cases? Filter by group or day master and the one you need is there.",
        detail:
          "You can also filter by gender, zodiac animal and birth decade. Send a single case to someone else, and it merges into their library when they open it.",
      },
      {
        name: "Mei Hua Yi Shu casting",
        line: "Say two numbers to cast a hexagram, and the Master writes a reading.",
        detail:
          "Original, Nuclear and Resulting hexagrams and Host & Guest sit on one screen. A cast for someone is filed under their case, and you can add what happened later. You can cast without writing a question.",
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
          "From the birthplace longitude and the equation of time. Pick a province and city or type a longitude; born abroad, pick a time zone. The chart marks daylight saving, leap months, late zi hour and solar term changes.",
      },
      {
        question: "Do I need internet to chart?",
        answer:
          "No. Saved cases chart in airplane mode. Picking a birthplace by province and city for a new case needs internet, and so do Chart Patterns, zizhan and the four-pillar lookup.",
      },
      {
        question: "How do I switch chart styles?",
        answer:
          "One tap at the bottom of the chart. Same birth, same Star Settings; the Taiji point and fortune layers follow.",
      },
      {
        question: "I'm just starting to learn. Will it help?",
        answer:
          "Yes. Press and hold any word on a chart for its entry, and read the classics in the Academy. After you cast, the Master writes a reading.",
      },
      {
        question: "What does the Master remember?",
        answer:
          "What you asked for this person before. Ask for them again, and the reading picks up from last time. You can turn it off anytime.",
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
    headline: "Install Hachimi.ai and enter your first case.",
  },

  footer: {
    tagline: "For studying Chinese folk fate arts.",
    copyright: "© 2026 Hachimi.ai. All rights reserved.",
    links: [
      {
        title: "Product",
        items: [
          { label: "Cases", href: "/en#case" },
          { label: "Tools", href: "/en#tools" },
          { label: "Academy", href: "/en#academy" },
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
