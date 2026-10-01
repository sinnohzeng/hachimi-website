import type { Translations } from "./types";

export const en: Translations = {
  nav: {
    case: "Cases",
    tools: "Tools",
    academy: "Academy",
    methodology: "How it's built",
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
        body: "Zi Wei and Ba Zi chart from one case, no switching tools; true solar time is worked out once from the birthplace, and both charts use it.",
      },
      {
        title: "Your clients' cases, in your own iCloud",
        body: "No account needed; devices on the same iCloud sync on their own. Backups go to a file, and the device keeps a daily one.",
      },
      {
        title: "Switch Zi Wei styles, read Ba Zi to six pillars",
        body: "Zi Wei switches between San He, Flying Star and Four Transformations, cycles down to the hour; Ba Zi adds a six-pillar pro chart with its cycles.",
      },
    ],
  },

  case: {
    title: "One case per person",
    lead: "One case per client. Zi Wei, Ba Zi and every hexagram cast for them sit under that one case.",
    steps: [
      {
        title: "Create a case",
        body: "Enter by solar date, lunar date or four pillars, with a birthplace or longitude and any time zone.",
      },
      {
        title: "Chart Zi Wei",
        body: "One control switches the chart style, cycles stack layer by layer, tap a palace to set the Tai Ji point.",
      },
      {
        title: "Chart Ba Zi",
        body: "The four-pillar table fits one screen; for cycles, switch to the six-pillar pro chart.",
      },
      {
        title: "Cast for them",
        body: "Pick who it is for on the asking page, cast, and the reading is filed under that person with the hexagram.",
      },
      {
        title: "Look back at casts",
        body: "The asking side lists every hexagram cast for them, newest first; tap a row for that result page.",
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
        name: "Mei Hua Yi Shu casting",
        line: "Say two numbers and the hexagram is cast on your phone. AI writes the reading; the hexagram does not move.",
        detail:
          "Upper and lower trigrams come from the early-heaven numbers, the moving line from the two numbers plus the hour index. Original, nuclear and changed hexagrams and the body-use relation are computed on your phone, each with a checksum so the cast can be verified later. The tone follows the body-use cycle, not the model. History filters by case; memory stays on device.",
      },
      {
        name: "Zi Wei Dou Shu",
        line: "San He, Flying Star and Four Transformations; five cycle layers; patterns judged by rule.",
        detail:
          "Pattern analysis runs 84 rules and names the cycle layer each one comes from. 23 star-placement settings pack into one code: paste someone else's code and the chart matches. Zi Zhan charting and pillar lookup sit in the More menu; press a star name for its entry.",
      },
      {
        name: "Ba Zi charting",
        line: "The four-pillar table reads from main star to symbolic stars; the six-pillar table carries major, annual and monthly cycles.",
        detail:
          "The four-pillar table runs from main star to symbolic stars, colored by the five elements. The six-pillar table names the current major and annual cycle at the top, each with a horizontal scroll. Six hidden-stem rulebooks to choose from; write your notes on the same page; press any field for its entry.",
      },
      {
        name: "Case library",
        line: "Casts travel with the case; among dozens of clients, filter by group or day master and the person is right there.",
        detail:
          "Eight groups, all renamable. The list sections by initial or group, sort order can change, with six filter dimensions. Back up to iCloud or a file; the phone keeps a daily backup and the last seven. A single case can be shared and merges straight into the other library. Delete a case and its casts go with it.",
      },
    ],
  },

  remembers: {
    text: "The Master remembers what was asked for this person last time; the next reading is written with those notes.",
  },

  academy: {
    text: "154 public-domain classics ship with the app, filed under the five arts, readable offline.",
  },

  offline: {
    text: "Zi Wei and Ba Zi are computed on this phone; charts come out offline.",
    tags: [
      "On-device charting",
      "No account needed",
      "iCloud private database",
      "File export and import",
    ],
  },

  faq: {
    title: "Frequently asked questions",
    items: [
      {
        question: "Is this real fortune telling?",
        answer:
          "No. Hachimi.ai is a charting and casting tool for fate readers and enthusiasts, for entertainment and cultural study only. It does not predict, change fate or bring luck, and never claims to be right.",
      },
      {
        question: "Do the same numbers give the same hexagram?",
        answer:
          "The same numbers and hour always give the same hexagram by a fixed method, no dice. Only once the hexagram is set does DeepSeek write the reading, and it cannot change the hexagram.",
      },
      {
        question: "Do I need internet to chart?",
        answer:
          "No. Zi Wei and Ba Zi charts are both computed on your device, so they work in airplane mode. Pattern analysis and pillar lookup go over the network.",
      },
      {
        question: "How do San He, Flying Star and Four Transformations differ?",
        answer:
          "San He reads star brightness, birth-year transformations and stacked cycle palaces. Flying Star reads palace stems and the origin palace. Four Transformations enlarges the four transforming stars and draws the links. One birth time, three charts.",
      },
      {
        question: "Can I lose my cases?",
        answer:
          "Cases live on your device and in your own private iCloud database. You can save them to a file, share them, and import them back. Only you delete them.",
      },
      {
        question: "How does the Master remember what I asked?",
        answer:
          "After each reading the Master saves a short note on your phone, kept per case. The next related question for the same person carries at most three notes, used only to write that reading. You can turn it off anytime.",
      },
      {
        question: "Who writes the reading?",
        answer:
          "The hexagram is cast on your phone, the backend recomputes it and matches the checksum, and only then does DeepSeek write the reading. Your consent is asked before the first online question. Readings have a daily cap that resets the next day.",
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
          { label: "How it's built", href: "/en/methodology" },
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
      { label: "Account & data", href: "/en/account-deletion" },
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
        "Hachimi.ai Privacy Policy. Learn what data we use and how we keep it safe.",
    },
    terms: {
      title: "Terms of Use & Disclaimer",
      description:
        "Hachimi.ai Terms of Use & Disclaimer. For entertainment and comfort only, never prediction.",
    },
  },

  methodology: {
    metaTitle: "How hexagram casting and chart building work",
    metaDescription:
      "Here is how a hexagram is cast, where a third party AI service is held back and by what, and what rules shape a chart. The Master walks you through it, step by step.",
    badge: "The Master's old rules",
    title1: "How a reading is made,",
    title2: "out in the open",
    lastUpdated: "Last updated 14 September 2026",
    intro:
      "Hachimi.ai lays it all out: the casting method is fixed, the reading is tightly bounded, every pass goes through evaluation, and the chart rules are written down line by line, all in plain view. For entertainment and reference only.",
    cast: {
      kicker: "The cast",
      step: "01",
      title: "Same numbers and hour, always the same hexagram",
      body: "You give two numbers, paired with the current hour, and Hachimi casts a Mei Hua Yi Shu (Plum Blossom divination) hexagram by a fixed method. No dice, no luck of the draw: the same two numbers and the same hour always make the same hexagram. This step is plain math, and luck has nothing to do with it.",
      points: [
        {
          term: "The method is fixed",
          desc: "The two numbers set the top and bottom trigrams, the three-line halves of the hexagram, and the two numbers together with the hour set the changing line. Every step is written into the code, never nudged by hand.",
        },
        {
          term: "The same on both",
          desc: "iOS and Android: give the same numbers and hour, and you get the exact same hexagram. The cast doesn't change just because you switched phones.",
        },
        {
          term: "A fingerprint you can check",
          desc: "Every cast carries a fingerprint, a short unique code called SHA-256. Run the same cast a hundred times and the code is the same every time. Change the hexagram, and the code no longer matches.",
        },
      ],
      fingerprintLabel: "Example fingerprint for this cast",
      fingerprintNote:
        "SHA-256, made by the cast engine. Run it again and it matches; change the cast and it won't.",
    },
    ai: {
      kicker: "The reading",
      step: "02",
      title: "The AI only makes the words warm, nothing more",
      body: "Once the hexagram is cast, the AI's turn begins. Hachimi.ai hands the hexagram, the hour, and your question to a third-party AI service and asks it to write a reading in the Master's voice. Which model exactly? We pick whichever holds up better in testing. What we require of any such service is written down in the Privacy Policy, and it holds no matter who writes the words. It can shape the words and speak to your situation, but it can't touch the hexagram, and it can't decide the fortune.",
      writesTitle: "What the AI does",
      writes: [
        "Walk you through the hexagram, line by line",
        "Write a kind reading that speaks to your question",
        "Land on one small thing you can do right now",
        "Close with a small blessing",
      ],
      lockedTitle: "What the system locks for you",
      locked: [
        "The hexagram itself: read it, never change it",
        "The fortune's tone: set by the Host and Guest trigrams and their five elements, not the AI's to invent",
        "The find-item direction: worked out by the cast engine, out of the AI's reach",
        "The character and red lines: no predicting, no changing your fate, no changing your luck, written into the system prompt",
      ],
    },
    eval: {
      kicker: "The test gate",
      step: "03",
      title:
        "How we make sure it still follows the rules: every update takes a test",
      body: "Whether the words hold up, and whether they cross a red line, isn't left to a hunch. Every build first has to clear a hard gate, and the code doesn't get in if it fails. On top of that, a stronger model judges the readings against 45 set test cases on a regular pass, so quality gets real scrutiny, not just guesswork.",
      stats: [
        {
          value: "45",
          label: "set test cases across four scenarios and two languages",
        },
        {
          value: "8",
          label: "hard cases built to test the red lines on purpose",
        },
        { value: "4", label: "checks by the judge, each one to pass" },
        { value: "Every build", label: "the hard gate runs with the code" },
      ],
      layers: [
        {
          name: "The hard gate · on every build",
          desc: "First it checks that the fortune's tone wasn't changed. The tone is set by the cast engine. If the AI changed it on its own, this gate stops it cold.",
        },
        {
          name: "The judge gate · a stronger model scores it",
          desc: "Then a stronger model sits as judge and checks, one by one: did it stay on topic, did it hold the “no prediction” red line, does the voice sound like the Master, does it offer a first step you can really take. All four pass, or the reading doesn't.",
        },
      ],
    },
    paipan: {
      kicker: "Charting",
      title: "How the chart is built",
      body: "Both charts, Zi Wei Dou Shu (Purple Star astrology) and Ba Zi (Four Pillars), come from the chart engine built into the app, running on your own phone. Same birth details, same Star Settings, same chart every time. A few spots cause the most differences, and the rules are here.",
      points: [
        {
          term: "True solar time",
          desc: "Chart casting first converts birth time by birthplace longitude. Pick a province and city, type a longitude, or take your current location once. Born outside UTC+8? Choose a time zone too, down to half and quarter hour zones. Location uses longitude only and stores nothing.",
        },
        {
          term: "Calendar",
          desc: "Birth details can be Gregorian, lunar, or Four Pillars. For lunar, pick a Gregorian or stem-branch year and tick leap month. Five cases get a chart note: daylight saving, leap month, late zi hour, two Four Pillars across a solar term change, and true solar time crossing an hour slot.",
        },
        {
          term: "Chart casting",
          desc: "From one set of birth details, the Chart tab builds three views: San He chart, Four Transformations chart, and Flying Star chart. San He shows the twelve palaces with the three-way and four-point groups. Four Transformations draws the transformation letters and flying lines. Flying Star draws the links between palaces. A pill at the bottom switches views anytime, and the Taiji point and fortune layers follow.",
        },
        {
          term: "View Chart Patterns",
          desc: "Go through all 84 rules one by one. Tap a fortune layer name, a Chart Patterns name, or a good or bad mark, and the text opens right there. If it is not a San He chart, the Master stops and tells you why before judging further.",
        },
        {
          term: "Adjustable star schools",
          desc: "Star placement rules differ by school, so nothing here is fixed for you. Ten groups and more than sixty items can be set one by one to match the school you follow, or you can enter a star code to set them all at once. The Zhongzhou heaven, earth and human boards have their own entry.",
        },
        {
          term: "Ba Zi side",
          desc: "Ba Zi and Zi Wei share one set of birth details. Each of the Four Pillars gets ten rows, from the main star and the heavenly stem and earthly branch down to Nayin and Symbolic Stars. Details is a seven-column, six-pillar table, and one switch adds three columns: Conception Pillar, Life Palace and Body Palace. There are twelve major cycle steps, and twelve slots each for Annual and Monthly. Slide sideways, tap any slot, and the whole table follows.",
        },
        {
          term: "More chart methods",
          desc: "The More menu also has a zizhan chart that does not use birth details, a Four Pillars lookup that works backward to find a birth time, plus screenshot saving and a text chart.",
        },
        {
          term: "On-device charting",
          desc: "Charts are built on your device, not on a server. Step to the next major cycle, change a Star Settings option, or switch the Language, and it all recalculates on the spot. You can build a chart with no network.",
        },
      ],
    },
    limits: {
      kicker: "Up front",
      title: "Some things the Master won't do, from the start",
      body: "Casting and reading are the Master's old rules, meant to help you untangle what's on your mind, not to tell your fortune. These few things he never touches.",
      cards: [
        {
          title: "No predicting the future",
          desc: "A reading is a few kind words to help you see things from another angle, not a prediction. How things go is still up to you.",
        },
        {
          title: "No promising to change your luck",
          desc: "No changing your fate, no changing your luck, no keeping bad luck away. Anyone who talks to you that way isn't Hachimi.",
        },
        {
          title: "For entertainment only",
          desc: "For serious things like health, legal, or money, please see a professional. What the Master offers is company for how you feel.",
        },
        {
          title: "Your history stays on your device",
          desc: "Your reading history lives only on your phone. Want it gone? Clear it under Me → Privacy and data in one tap. The Privacy Policy spells out how anonymous records are saved and deleted.",
        },
      ],
    },
    closing: {
      text: "We lay the method open because peace of mind is the kind of thing you only trust once you can see how it works.",
      ctaPrivacy: "Read the privacy policy",
      ctaHome: "Back to the home page",
    },
  },

  accountDeletion: {
    title: "Account & your data",
    effectiveDate: "Last updated: August 25, 2026",
    intro:
      "Hachimi.ai has no accounts, so you use it without signing in and there is no account to delete. Your reading history is stored only on your device. This page explains exactly what is stored, where, and how to clear it.",
    steps: {
      heading: "How to clear your data",
      items: [
        "Open the app and switch to the Me tab.",
        "Tap Privacy and data, then Delete data on this device.",
        "Tap Delete all to confirm; your history, drafts, and what the Master remembers are cleared in one go.",
        "Or simply uninstall the App to remove everything at once.",
      ],
    },
    dataTable: {
      heading: "What's stored, and where",
      columns: ["Data", "Where it lives", "Removed when"],
      rows: [
        {
          cells: [
            "Reading history (hexagram, reading, question, time)",
            "On your device only",
            "You delete history, or uninstall",
          ],
        },
        {
          cells: [
            "Language / settings",
            "On your device (local preferences)",
            "You uninstall the App",
          ],
        },
        {
          cells: [
            "Your question (during a reading)",
            "Sent to our server, forwarded to the third-party AI service",
            "Stored under an anonymous ID (collected with use, under the consent you give before your first actual online reading), free text auto-deleted after 90 days; the third-party AI service processes it under its own terms (see the Privacy Policy)",
          ],
        },
      ],
    },
    sections: [
      {
        heading: "No server-side account",
        content:
          "Our server casts the hexagram and hands your question to the third-party AI service to write the reading. There is no account. Records are stored under an anonymous install identifier with free text auto-deleted after 90 days; you can reset the anonymous ID under Me → Privacy and data at any time.",
      },
      {
        heading: "Data sent to the third-party AI service",
        content:
          "DeepSeek Open Platform generates online readings; section 3 of the Privacy Policy lists the data and purposes. Received content is processed under applicable service terms. Withdrawing App consent does not delete content already sent. Contact voice@hachimi.ai for help requesting deletion.",
      },
      {
        heading: "Contact",
        content:
          "Questions? Email voice@hachimi.ai to reach the Hachimi.ai team.",
      },
    ],
  },

  dataDeletion: {
    title: "Delete your data",
    effectiveDate: "Last updated: August 25, 2026",
    intro:
      "Hachimi.ai stores your reading history and memories only on your device; anonymous records have their free text auto-deleted after 90 days. Deleting your data is entirely in your hands.",
    steps: {
      heading: "How to delete your data",
      items: [
        "Open the app and switch to the Me tab.",
        "Tap Privacy and data, then Delete data on this device.",
        "Tap Delete all to confirm; your history, drafts, and what the Master remembers are cleared in one go.",
        "Or uninstall the App to remove everything at once.",
      ],
    },
    dataTable: {
      heading: "Types of data and how they're removed",
      columns: ["Data type", "What it includes", "Removed when"],
      rows: [
        {
          cells: [
            "Reading history",
            "Hexagram, reading text, your question, time, and memories, stored locally",
            "You delete history, or uninstall",
          ],
        },
        {
          cells: [
            "App preferences",
            "Language and settings, stored locally",
            "You uninstall the App",
          ],
        },
        {
          cells: [
            "Question sent for a reading",
            "Forwarded to the third-party AI service to generate the reading",
            "Stored under an anonymous ID (collected with use, under the consent you give before your first actual online reading), with free text auto-deleted after 90 days; processed by the third-party AI service under its own terms",
          ],
        },
      ],
    },
    sections: [
      {
        heading: "Local data only",
        content:
          "Reading history, memories, and settings live on your device. Delete history under Me → Privacy and data, or uninstall the App to remove it all. There is no cloud account; anonymous records keep their free text for at most 90 days (see the Privacy Policy).",
      },
      {
        heading: "Third-party AI service retention",
        content:
          "DeepSeek Open Platform generates online readings; section 3 of the Privacy Policy lists the data and purposes. Received content is processed under applicable service terms. Withdrawing App consent does not delete content already sent. Contact voice@hachimi.ai for help requesting deletion.",
      },
      {
        heading: "Older copies inside system backups",
        content:
          "Your reading history and memory episodes travel in the encrypted, system-managed backup, so they survive a new phone. Because of that, deleting in the App or uninstalling it only clears this device's copy; it cannot clear a backup Apple or your Android vendor already holds. You remove those yourself: on iPhone, Settings → your name → iCloud → Manage Account Storage → Backups; on Android, the backup section of system settings or Google One. A cast you are in the middle of never enters a backup in the first place.",
      },
      {
        heading: "Contact",
        content: "Email voice@hachimi.ai to reach the Hachimi.ai team.",
      },
    ],
  },

  support: {
    title: "Support",
    effectiveDate: "Last updated: August 25, 2026",
    intro:
      "Hachimi.ai (哈基米道长) is a Mei Hua Yi Shu (Plum Blossom divination) app. Give two numbers, cast a hexagram, and Hachimi reads it to you, just for fun. Hit a problem, or just want to say hi? Drop us an email.",
    steps: {
      heading: "Before you reach out: quick fixes",
      items: [
        "Reading will not load? Check your connection. Your first actual online reading shows a disclosure naming DeepSeek and explaining the data and purposes; choose Agree and Enable Online Readings to continue. After declining or withdrawing, request a reading to choose again. Get Started on first launch does not grant permission.",
        "Want to start over? On the question screen, enter two new numbers and cast again.",
        "Switch language? Go to Me → Casting preferences → Language (Simplified Chinese, Traditional Chinese, or English). Reopen the app to apply.",
        "Delete your data? Go to Me → Privacy and data, then Delete data on this device. Your history lives only on your phone.",
      ],
    },
    dataTable: {
      heading: "How to reach us",
      columns: ["Channel", "Address", "Typical response"],
      rows: [
        { cells: ["Email", "voice@hachimi.ai", "Within 3 business days"] },
      ],
    },
    sections: [
      {
        heading: "Is this real fortune-telling?",
        content:
          "No. Hachimi.ai is just for fun and comfort. Readings are not predictions, and they're not a basis for real decisions. See our Terms & Disclaimer.",
      },
      {
        heading: "Where does my data go?",
        content:
          "Online readings send your question, derived hexagram and selected context through our backend to DeepSeek Open Platform. The Privacy Policy lists the fields and purposes. Permission is requested at your first actual online reading, without repeated prompts for the same disclosure version. Changes to the recipient, fields or purposes require updated disclosure and renewed permission. Use Stop Online Readings and Withdraw Consent at the bottom of Me > Privacy & Data > Privacy Policy; that page has no enable button. Offline charts and existing history remain available.",
      },
      {
        heading: "How do I delete my data?",
        content:
          "Go to Me → Privacy and data, then Delete data on this device, or delete the app. There's no account. Any anonymous records you sent are kept for at most 90 days, then deleted. See Account & data.",
      },
      {
        heading: "Which devices and languages?",
        content:
          "Hachimi.ai runs on iPhone and iPad, in Simplified Chinese, Traditional Chinese, and English.",
      },
    ],
  },
};
