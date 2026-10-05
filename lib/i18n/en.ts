import type { Translations } from "./types.ts";

export const en: Translations = {
  nav: {
    case: "Cases",
    tools: "Tools",
    academy: "Academy",
    faq: "FAQ",
    download: "Get the app",
  },
  a11y: {
    skip: "Skip to main content",
    mainNav: "Main navigation",
    mobileNav: "Navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    close: "Close",
    darkTheme: "Dark theme",
  },

  store: {
    appStoreAlt: "Download on the App Store",
    googlePlayAlt: "Get it on Google Play",
  },

  meta: {
    home: {
      description:
        "A charting tool for fate readers and enthusiasts. One person, one case.",
    },
    get: {
      title: "Download the app",
      description:
        "Download it from the App Store for iPhone and iPad, or from Google Play for Android phones.",
    },
    support: {
      title: "Support",
      description:
        "Need help with Hachimi.ai? Contact support or browse common questions.",
    },
    dataDeletion: {
      title: "Delete your data",
      description:
        "Delete your cases, reading history and the Master's notes in the app.",
    },
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

  hero: {
    headline: "When it's a lot, cast a hexagram.",
    headlineLines: ["When it's a lot,", "cast a hexagram."],
    bridge: "Cast for someone, and it lands in their case.",
    shotAlt:
      "Hachimi.ai cast result page screenshot: this hexagram reads auspicious, the hexagram on top and the reading below.",
  },

  what: {
    eyebrow: "A charting tool for fate readers and enthusiasts",
    title: "One person, one case.",
    titleLines: ["One person, one case."],
    items: [
      {
        title: "Enter a birth once, get both charts",
        body: "One case gives you both Zi Wei Dou Shu and Ba Zi, from the same true solar time.",
      },
      {
        title: "Open a case, and the charts and casts are there",
        body: "Both charts are in the case, and every cast for this person and the outcomes you add are listed by date. The longer you use it, the more it holds.",
      },
      {
        title: "Three Zi Wei chart styles, Ba Zi to six pillars",
        body: "Switch between San He, Flying Star and Four Transformations. Beyond the four pillars, Ba Zi has a six-pillar chart with major and annual cycles.",
      },
    ],
  },

  case: {
    title: "Someone sends you a birth time",
    lead: "A client, a family member, a friend or you. Enter it once, and it becomes a case.",
    steps: [
      {
        title: "Create a case",
        body: "Enter a solar date, lunar date or four pillars, and pick the birthplace by province and city.",
        shotAlt:
          "Case list screenshot: every row shows the four pillars on the right, colored by the five elements.",
      },
      {
        title: "Chart Zi Wei",
        body: "Once the birth is in, the Zi Wei chart is ready.",
        shotAlt:
          "Zi Wei Dou Shu San He chart screenshot with the twelve palaces and the three-way four-point links.",
      },
      {
        title: "Switch to Ba Zi",
        body: "Same birth details. No need to enter them again.",
        shotAlt:
          "Ba Zi four-pillar table screenshot, year month day hour rows down to Nayin and the symbolic stars.",
      },
      {
        title: "Cast for this person",
        body: "Choose who the question is for. The hexagram and reading are filed under that case.",
        shotAlt: "Cast result page screenshot: this hexagram reads auspicious.",
      },
      {
        title: "Look back at every cast",
        body: "Past questions are listed by date; tap one to open that hexagram.",
        shotAlt:
          "Case detail screenshot: every hexagram under the case, newest first.",
      },
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
          "Chart Patterns are judged by rule, and each one names the layer it comes from. This part needs internet. Zizhan, a Zi Wei chart cast for this moment, is under Me → Tools. Press and hold any word on the chart for its entry.",
      },
      {
        name: "Ba Zi charting",
        line: "Punishments, clashes, combinations and harms are listed separately for the natal chart and the cycles. Take notes on the same page.",
        detail:
          "The four pillars run from Ten Gods to Symbolic Stars, and you can pick the rule for the Stem in Charge. The four-pillar lookup is under Me → Tools.",
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
          "The Original, Nuclear and Resulting hexagrams and Host & Guest sit on one screen. The same numbers and hour give the same hexagram. You can cast without writing a question.",
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
        question: "Can it match the charts I use now?",
        answer:
          "You can set it up the same way. Set each star placement rule to match your school, and pick late zi hour and year boundary rules.",
      },
      {
        question: "Do I need internet?",
        answer:
          "Not to chart: saved cases chart in airplane mode. Picking a birthplace by province and city needs it, and so do readings, Chart Patterns, zizhan and the four-pillar lookup. Readings have a daily limit and are written by a third-party AI service.",
      },
      {
        question: "Will my cases move to a new phone?",
        answer:
          "Yes. iPhone and iPad sync through iCloud. Android uses your system backup. Both can export cases to a file.",
      },
      {
        question: "I'm just starting to learn. Will it help?",
        answer:
          "Yes. Press and hold any word on a chart for its entry, and read the classics in the Academy. After you cast, the Master writes a reading.",
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
    productTitle: "Product",
    contactTitle: "Contact",
    support: "Support",
    legal: { privacy: "Privacy", terms: "Terms", dataDeletion: "Delete data" },
  },

  get: {
    title: "Get Hachimi.ai",
    body: "Download it from the App Store for iPhone and iPad, or from Google Play for Android phones.",
    qrCaption: "Scan with your phone to download",
    wechatHint:
      "App stores don’t open inside WeChat. Tap “…” at the top right and choose “Open in Browser”.",
  },

  notFound: {
    body: "There's no page at this address.",
    home: "Go to the Hachimi.ai home page",
  },

  lastUpdated: "Last updated: ",

  dataDeletion: {
    intro:
      "Your cases, reading history and the notes the Master keeps stay on your device, and you can delete them in the app.",
    steps: {
      heading: "Delete in the app",
      items: [
        "Open Hachimi.ai and go to Me → Privacy and data.",
        "Tap Delete All Reading Data and confirm. This clears reading history, drafts and the Master's notes. On iOS with iCloud sync on, they're deleted on your other devices too.",
        "Delete cases one by one in your case library.",
        "Usage statistics carry a random identifier. Tap Reset Anonymous ID to get a new one.",
        "To stop using online readings, open Privacy Policy on the same page and tap Turn Off Online Readings at the bottom.",
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
          "We keep question records for online readings on our server for a while, then delete them. If something goes wrong with deletion, write to voice@hachimi.ai.",
      },
      {
        heading: "Contact",
        content:
          "Yuenchuk Investment Limited, Hong Kong. Email voice@hachimi.ai.",
      },
    ],
  },

  support: {
    intro:
      "Hit a problem, or want to tell us something? Write to us in the app under Me → Write to Hachimi, or send an email. If you need a reply, please email.",
    steps: {
      heading: "Check these first",
      items: [
        "Which devices are supported? iPhone needs iOS 26 or later, iPad needs iPadOS 26 or later, and Android phones need Android 16 or later. The app comes in Simplified Chinese, Traditional Chinese and English.",
        "Reading not coming through? Check your connection and today's limit. The first time you ask for a reading, the app checks with you; tap Agree and Enable Online Readings. If you chose Not Now before, open that cast's result and tap Ask the master to read this cast to choose again.",
        "Changing the language? Go to Me → Language.",
        "Deleting data? For reading data, go to Me → Privacy and data and tap Delete All Reading Data. Delete cases one by one in your case library.",
        "Got a new phone? iPhone and iPad sync on their own when signed in to the same iCloud. On Android, restore from your system backup, or import a backup file you exported.",
      ],
    },
    table: {
      heading: "How to reach us",
      columns: ["Channel", "Address", "Typical response"],
      rows: [
        {
          cells: [
            "In the app",
            "Me → Write to Hachimi",
            "No reply, but we read every one",
          ],
        },
        { cells: ["Email", "voice@hachimi.ai", "Within 3 business days"] },
      ],
    },
  },
};
