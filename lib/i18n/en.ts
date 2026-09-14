import type { Translations } from "./types";

export const en: Translations = {
  nav: {
    chart: "Chart",
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
    shotAlt:
      "Master Hachimi reading result page: hexagram on top, reading below.",
  },

  whatItIs: {
    title:
      "A divination and charting app with an AI cat that casts hexagrams and reads charts.",
    steps: [
      "Just say two numbers, by instinct.",
      "Write down what you want to ask.",
      "The Master casts, then gives a first step.",
    ],
  },

  remembers: {
    text: "A chatbot forgets what you asked last time. The Master remembers, cast after cast.",
  },

  chart: {
    title: "To see it clearly, lay out a chart.",
    ziwei:
      "Zi Wei Dou Shu: one birth time, three charts: San He, Four Transformations, Flying Star.",
    bazi: "Ba Zi chart with four or six pillars; each major cycle step updates the chart.",
    cta: "See how charts work",
    shotAlts: {
      ziwei:
        "Zi Wei Dou Shu San He chart screenshot with the twelve palaces and the three-way four-point links",
      bazi: "Ba Zi Four Pillars table screenshot, year month day hour rows down to Nayin and Symbolic Stars",
    },
  },

  academy: {
    text: "The five arts: Mountain, Medicine, Fate, Physiognomy, Divination. 154 old books, 2408 chapters, ready in the app.",
  },

  principles: {
    text: "Both charts, right on your phone.",
    tags: ["On-device charting", "Works offline", "No sign-up"],
  },

  faq: {
    title: "Frequently asked questions",
    subtitle: "The five most asked questions, all below.",
    items: [
      {
        question: "Is this real fortune telling?",
        answer:
          "No. Master Hachimi is for fun and company only. It does not predict the future, change fate, or bring luck, and it does not claim to be right. For real decisions, talk to a qualified person.",
      },
      {
        question: "Do the same numbers give the same hexagram?",
        answer:
          "The same numbers and hour always give the same hexagram by a fixed method, no dice. Only after the hexagram is set does a third-party AI service write the reading, and it cannot change the hexagram.",
      },
      {
        question: "Do I need internet to cast a chart?",
        answer:
          "No. Zi Wei Dou Shu and Ba Zi charts are both calculated on your device, so they work in airplane mode, and your birth details never leave it.",
      },
      {
        question: "How does the Master remember what I asked?",
        answer:
          "After each reading, the Master saves a short note on your phone. Up to three notes may be used for the next related reading, only to write it, and you can turn this off anytime.",
      },
      {
        question: "Do I need an account? Where are my records?",
        answer:
          "No sign-up, no login. Your reading history and cases stay on your device, and you can delete them anytime. What the backend stores and for how long is listed in the privacy policy.",
      },
    ],
    stillHaveQuestions: "Still have questions?",
    contact: "Contact Master Hachimi",
  },

  finalCta: {
    headline: "Put the Master in your pocket.",
  },

  footer: {
    stats:
      "154 old books, 2408 chapters, 287 glossary entries, 84 Chart Patterns rules, 0 accounts.",
    copyright: "© 2026 Hachimi.ai. All rights reserved.",
    links: [
      {
        title: "Product",
        items: [
          { label: "Chart", href: "/en#chart" },
          { label: "Academy", href: "/en#academy" },
          { label: "How it's built", href: "/en/methodology" },
          { label: "FAQ", href: "/en#faq" },
        ],
      },
      {
        title: "Legal",
        items: [
          { label: "Privacy Policy", href: "/en/privacy" },
          { label: "Terms & Disclaimer", href: "/en/terms" },
          { label: "Account & your data", href: "/en/account-deletion" },
          { label: "Delete Data", href: "/en/data-deletion" },
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
      { label: "Delete Data", href: "/en/data-deletion" },
    ],
  },

  privacy: {
    title: "Privacy Policy",
    effectiveDate: "Last updated: August 25, 2026",
    sections: [
      {
        heading: "Master Hachimi (哈基米道长)",
        content:
          "Master Hachimi (“the App”), brand Hachimi.ai, is operated by the Hachimi.ai team (“we”, “us”; the operating entity is named in the contact section at the end of this policy). This Privacy Policy explains what data the App processes, why, and your rights.\n\nPlease understand how the App works first. You provide two numbers and write the question on your mind; our unified server performs a fixed Mei Hua Yi Shu (Plum Blossom divination) cast, and a third-party AI model then generates the reading in the voice of “Master Hachimi”. Unlike many purely on-device divination utilities, generating a reading necessarily sends your question and the cast to our server, which forwards them to a third-party AI service. The nature of that service, and what we require of it, are set out in section 3. This policy discloses that accordingly.",
      },
      {
        heading: "1. Summary",
        content:
          "• The cast turns your numbers into a hexagram, a fixed computation performed off-device; the reading is generated by a third-party AI service. Your question, chosen scenario, the two cast numbers, and time-of-day are sent to our server for casting; thereafter only your question, chosen scenario, the resulting hexagram, and time-of-day are forwarded to the third-party AI service to generate the reading. The two cast numbers are not sent to that third-party service.\n• What you asked and the reading are stored on our server under an anonymous install identifier, with free-text content kept for at most 90 days, only to improve reading quality (a single explicit consent on first launch; using the App means collection under that consent; your recourse is resetting the anonymous identifier under Me → Privacy and data at any time, plus the 90-day automatic deletion; see sections 4 and 5).\n• “Master Hachimi’s Memory” (memory episodes and your focus profile) stays only on your device; the server keeps no memory store; at most 3 relevant episodes travel transiently with a cast request to shape that one reading and are discarded after processing (see section 4).\n• We do not sell your data, do not use it for advertising, and do not track you across other apps or websites; we use no advertising identifier or IDFA, and no App Tracking Transparency.\n• No account is required to use the App.",
      },
      {
        heading: "2. Data we process",
        content:
          "• Your question, the free text you type, is the subject of the divination. It is sent to our server on each cast and forwarded to the third-party AI service to generate the reading; it is also used to improve reading quality; the server stores it under an anonymous install identifier (a single explicit consent on first launch; using the App means collection under that consent), with the text kept for at most 90 days before automatic deletion (see section 4). Your reading history, which includes the question, always stays on your device.\n• Your chosen scenario, one of find-item, love, career, or open question, selects the reading's focus and tone. It is sent with the question to the server and included in the prompt forwarded to the third-party AI service; it is stored with the event per section 4, and is stored on your device as part of history.\n• Two cast numbers and the local time-of-day drive the fixed cast, setting the upper and lower trigrams and the changing line. They are sent with the question to the server; stored with the event per section 4; history is stored on your device.\n• Your feedback on a reading (thumbs up / down) flags reading quality so real unsatisfying samples can help improve the readings. It is sent alongside the corresponding cast event (withdrawing consent stops all uploads); it stays in your local history, and the server-side vote contains no text and is kept as anonymous statistics.\n• The anonymous install identifier, a random UUID generated on first launch, groups events from the same installation to observe overall quality trends and is never linked to your identity. It is sent with every cast request; its link to stored events is automatically severed after 90 days, and you can reset it under Me → Privacy and data at any time.\n• Master Hachimi’s Memory (episodes and your focus profile) lets readings pick up threads you asked about before. Episodes and the profile themselves stay only on your device and are deleted in cascade with your history; while the Memory is on, at most 3 relevant episodes and the theme profile travel transiently with that cast request and are forwarded to the third-party AI service solely to shape that one reading, then discarded and never stored; the server keeps only content-free counts such as how many episodes a request carried. Turning the Memory off, choosing “no need to remember this one”, or casting via “Asking for someone else” sends no memory at all.\n• Reading history, meaning the chart, reading, time, and question, is stored on your device only, so you can review past readings.\n• Selected language and settings are app preferences, stored locally on your device.\n• Usage statistics (anonymous daily counts) tell us whether features are actually used and whether a new version keeps people coming back. They are daily counts of nine actions from a closed list: opening the App, seeing a reading, collecting a waiting result, going back home mid-ritual, ending a cast, browsing history, using export, and turning Master Hachimi’s Memory on or off, recorded only as “on this day, this action, in this scenario, happened N times”, with no timestamps and none of the text you write. They are uploaded to our server with the anonymous install identifier; retention is described in section 4.\n• Crash diagnostics (iOS system mechanism only) help us find and fix defects that crash the App. They are generated after a crash by Apple’s built-in MetricKit framework and contain purely technical information such as the call stack and the OS and App versions, none of your content, and no anonymous install identifier from the moment of collection, so they cannot be linked to any installation. They are uploaded only to our own server; retention is described in section 4.\n\nWe do not collect: your name, email, contacts, photos, precise location (GPS), or any advertising identifier (IDFA). The App does not use App Tracking Transparency because it performs no cross-app tracking. “Time-of-day” means your device's current clock hour, used to determine the changing line; it is not GPS positioning.\n\nOn health and finances: the App does not read HealthKit, medical records, bank accounts, or any structured health or financial data, and never asks you for any. But what you write is free text, and you may well mention your body, a diagnosis, your salary, or a debt in it. Those words are handled as part of your question, on exactly the same terms as any other free text in this section: forwarded per section 3 to generate a reading, retained and deleted per section 4. So write only what you want to write; you do not owe the App a detail you would rather keep.",
      },
      {
        heading: "3. Third-party AI reading (core feature)",
        content:
          "To generate the “Master Hachimi” reading, on each cast the App sends your question, chosen scenario, the cast, and the time-of-day to our own server (a thin proxy; client device-integrity attestation is planned, see section 7). The server performs the fixed cast and then forwards the hexagram, your question, and the chosen scenario to a third-party AI service to generate the reading text. What matters is not which AI model is behind the scenes, but how it handles your content. The nature of, and our commitments about, any service we use are set out at the end of this section.\n\n• Explicit permission: Before your first cast, the App shows a consent screen that clearly states what will be sent and the recipients (our server + the third-party AI service), and also discloses that what you ask will be used to improve reading quality (the event storage described in section 4). Nothing is sent without your consent.\n• Revocable: You can withdraw consent at any time under Me → Privacy and data. After withdrawal the App sends no further data and therefore cannot generate new readings (the product has no offline reading mode); your existing local history is unaffected. Withdrawing consent also stops all event and feedback uploads.\n• The provider acts as a service provider: the third-party AI service processes the content as a service provider / data processor to provide the reading service to us, and we have required that it not use your content to train its own models (see the end of this section).\n• Minimization: we send the third-party AI service only what is needed to generate the reading (your question + chosen scenario + cast + time-of-day). We do not send your identity, device identifiers, or location to it. Once enabled, the device-attestation token used for anti-abuse will be sent only to our server, never to the third-party AI service, and will not be used for tracking.\n\nThe nature of the third-party AI service, and our commitments: we use only a reputable commercial, paid-tier third-party AI service (an enterprise paid API, never a free tier or a consumer-grade product). Only your question, chosen scenario, hexagram, and time-of-day are forwarded to it. The service processes this content as our service provider (data processor), solely to provide the reading service and for no other purpose; we have required that it not use your content to train or improve its models, and required that it not sell personal data, not use it for targeted advertising, and not build user profiles. What matters is not which model is behind the scenes. We may change such a service or use more than one (for example, to route requests) as our needs evolve, and the standards above apply uniformly to every such service; as long as those standards still hold, the consent you have given remains valid and this policy does not need to change.",
      },
      {
        heading: "4. Backend and data retention",
        content:
          "• We operate a unified server to receive cast requests, run the fixed cast, and forward to the third-party AI service. To improve reading quality, this server stores cast events as a pseudonymous minimal set: each cast's question, chosen scenario, hexagram, and reading are stored in our own database together with the anonymous install identifier (using the App means collection under the single explicit consent given on first launch; there is no separate switch; if you do not consent, the sending features are simply not used). Your controls are: the first-launch consent (revocable, see section 3) + resetting the anonymous identifier at any time (past events are immediately unlinked) + the 90-day automatic deletion.\n• 90-day rolling deletion: the question text, any clarification, the full reading text, and the link to the install identifier are automatically deleted or severed by a daily task once a record is 90 days old; after that, only anonymous statistical rows containing no free text remain (scenario distribution, response latency, feedback rates) for long-term quality trends.\n• Quality-evaluation samples: a small number of thumbs-down readings may be selected as internal evaluation material; before use they must be manually rewritten and de-identified (turned into semantically equivalent synthetic cases, never keeping your original wording verbatim), and only the rewritten version enters the evaluation set.\n• No third-party analytics: all of the above runs on our own infrastructure, with no third-party analytics, advertising, or crash-reporting SDKs. Purposes are explicit and limited: improving reading quality with real failure samples, making follow-up questions and question understanding more accurate, and refining how different scenarios are handled; never for advertising, profiling, or sale.\n• Master Hachimi’s Memory (on-device memory): episodes and your focus profile stay only on your device; the server keeps no memory store. Each reading is distilled on your device into a “memory episode” (a theme plus a one-line gist, including any outcome or note you add); deleting a history record deletes its episode with it. When you cast, at most 3 relevant episodes (including the original question, clipped to 200 characters on-device) and the theme profile travel with that request and are forwarded to the third-party AI solely to shape that one reading, then discarded and never stored; the server-side event keeps only content-free counts such as how many episodes the request carried. Turning the Memory off, choosing “no need to remember this one”, or casting via “Asking for someone else” sends no memory at all. The “focus profile” here is a theme tally computed only on your device; unrelated to the advertising / marketing profiling that “never for profiling” above refers to; the server never aggregates a profile of you.\n• Cast admission and daily counts: to connect one cast to the reading that follows it, and to enforce the daily cast limit, the server stores an admission record containing only the anonymous install identifier, a timestamp, and a status; it is deleted automatically after at most 8 days. The daily count is just a number per day and is kept for 2 days. Neither contains anything you wrote.\n• Retention of usage statistics and crash diagnostics: the daily usage counts are kept long-term as anonymous statistics containing no free text, to observe overall trends; the activity records used to estimate next-day and seven-day return are kept under the anonymous install identifier for at most 8 days, after which a daily task strips the identifier, leaving only identifier-free per-day headcounts. Raw crash diagnostics are deleted automatically after 90 days, with only identifier-free daily counts kept long-term. Both stay entirely on our own infrastructure, are never sent to any third party, and are never linked or joined with the cast events described in section 2.\n• A cast stopped by a safety topic: if what you write touches on a crisis, physical or mental health, or financial hardship, the App switches to a static page of information and generates no reading. In that case we store neither your question nor any generated text; only the admission record described above exists, and it still expires within 8 days.\n• Readings you report: when you report a reading in the App, the reported reading text, your reason, and an optional note are uploaded so a human can review them and tighten our limits. That queue is deleted automatically after 30 days and never contains your original question. Nothing is uploaded unless you report.\n• Short-lived data that stays on your device: a draft you have not cast yet is kept for at most 30 days, and a cast that was started but not yet read is kept for at most 7 days; both are then cleared automatically. Both live in a directory excluded from system backups; the question you are in the middle of asking should not be copied into an old backup you no longer control.\n• Reading history and memory episodes do travel in system backups: they live in the App's regular data area, so they are included in the encrypted, system-managed backup on iOS or Android. That exists so your history survives a new phone. It is not cloud sync by us; we cannot see backup contents, and there is no account. “Delete data on this device” under Me → Privacy and data clears this device's copy; it cannot delete backups already held by Apple or your Android vendor, which you must remove yourself in the system's backup management.\n• Reading history is stored only on your device. Deleting a record or deleting the App removes it; we provide a “Delete data on this device” action under Me → Privacy and data.\n• Retention on the third party: the third-party AI service retains and processes the content it receives under its own terms (we have required that it not use your content to train its models; see section 3). To request deletion of content already sent to it, contact us at voice@hachimi.ai and we can initiate a request on your behalf.",
      },
      {
        heading: "5. Your rights",
        content:
          "Depending on where you live (EU/EEA under GDPR, California under CCPA/CPRA, Hong Kong under PDPO, and others), you have rights to access, correct, and delete your personal data, to object to or restrict processing, and to withdraw consent at any time.\n\n• Withdraw consent: turn off “AI reading permission” under Me → Privacy and data (see section 3); after withdrawal nothing further is sent and no new events are stored.\n• Access / portability / deletion: the App has no account; server-side events are keyed only to a resettable anonymous install identifier that we cannot link back to you, so we cannot provide per-person access to or export of server-side copies. The reading history on your device is fully under your control; you can view and delete it in-app. Uploaded event text is kept for at most 90 days and then automatically deleted per section 4, and resetting the identifier under Me → Privacy and data immediately unlinks past events from your installation.\n• GDPR: the lawful basis for sending your question and cast to the third-party AI is your consent, which you may withdraw at any time.\n• CCPA/CPRA: we disclose your question only for a business purpose to the third-party AI service acting as a service provider, which is not a “sale” or a “share” for cross-context behavioral advertising.\n• PDPO (Hong Kong): we collect only data needed for the App's function, use it only for that purpose, and apply transport encryption (TLS) to all network calls (device attestation is planned).\n\nFor any request or question, contact us using the details below; we will respond within the time limits required by applicable law.",
      },
      {
        heading: "6. Age",
        content:
          "The App is intended for users aged 13 and older. It is not directed to children under 13 and does not knowingly collect personal data from them. The store age rating, the in-app wording, and this policy all say the same thing.",
      },
      {
        heading: "7. Security",
        content:
          "All network calls use standard HTTPS/TLS; client device-integrity attestation (App Check / App Attest) to deter abuse is planned (not yet enforced at launch). Upstream AI service keys are held only on our server and are never shipped to or embedded in the client.",
      },
      {
        heading: "8. Changes",
        content:
          "We may update this policy; the “Last updated” date will change. Material changes will be surfaced in the App.",
      },
      {
        heading: "9. Contact",
        content:
          "Yuenchuk Investment Limited, Hong Kong\nEmail: voice@hachimi.ai",
      },
    ],
  },

  terms: {
    title: "Terms of Use & Disclaimer",
    effectiveDate: "Last updated: June 14, 2026",
    sections: [
      {
        heading: "Master Hachimi (哈基米道长)",
        content:
          "By using Master Hachimi (“the App”, brand Hachimi.ai), operated by the Hachimi.ai team (the operating entity is named in the contact section at the end of these Terms), you agree to these Terms.",
      },
      {
        heading: "1. Entertainment purpose only",
        content:
          "Master Hachimi is a Mei Hua Yi Shu (Plum Blossom divination) question-and-reading tool. “Master Hachimi” offers hexagrams and readings for your questions based on the traditional Chinese method of Mei Hua Yi Shu, for entertainment and comfort only. Readings are not factual predictions and must not be relied upon as such; the App makes no claim of predictive accuracy and offers no fortune-changing, luck-changing, or other efficacy.\n\nThe App does not provide, and its readings do not constitute, medical, psychological, legal, financial, investment, or any other professional advice. For any real decision, consult a qualified professional. Do not use the App as a substitute for professional judgment, emergency services, or any safety-critical decision.",
      },
      {
        heading: "2. No guarantee of outcome",
        content:
          "For any question, the App offers associative, entertainment-only hints derived from the hexagram (such as a mood, an image, or an evocative scene). It does not guarantee any real-world outcome. You are only responsible for your own decisions and actions.",
      },
      {
        heading: "3. AI-generated content",
        content:
          "The reading text is generated by a third-party AI service (its nature and our commitments are set out in the Privacy Policy); the cast itself is a fixed computation, and only the reading is AI-generated. AI-generated content may be inaccurate or incomplete. We are not responsible for decisions you make based on a reading. We harden the persona and red lines at the system level to avoid prohibited efficacy claims such as health or financial ones, but you should treat all output as entertainment. Generating a reading sends your question and the cast to a third-party AI. See the Privacy Policy and the in-app consent screen.",
      },
      {
        heading: "4. Your responsibilities",
        content:
          "You agree not to use the App to: make medical, legal, or financial decisions; harm yourself or others; or violate any law in your location. You also agree not to submit content that is unlawful, infringing, or intended to manipulate the model's output. The App is intended for users 13 and older.",
      },
      {
        heading: "5. Limitation of liability",
        content:
          "To the maximum extent permitted by law, we are not liable for any direct, indirect, incidental, or consequential damages arising from your use of, or inability to use, the App or its readings. The App is provided “as is” without warranties of any kind.",
      },
      {
        heading: "6. License",
        content:
          "The App is licensed, not sold, to you for personal, non-commercial use, under the applicable app store's standard end-user license agreement (Apple's Standard EULA on iOS; the Google Play Terms of Service on Android) or a custom EULA where provided, in addition to these Terms.",
      },
      {
        heading: "7. Changes & contact",
        content:
          "We may update these Terms; continued use means acceptance. Contact: voice@hachimi.ai, Yuenchuk Investment Limited, Hong Kong.",
      },
    ],
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
      "Master Hachimi lays it all out: the casting method is fixed, the reading is tightly bounded, every pass goes through evaluation, and the chart rules are written down line by line, all in plain view. For entertainment and reference only.",
    cast: {
      kicker: "The cast",
      step: "01",
      title: "Same numbers and hour, always the same hexagram",
      body: "You give two numbers, paired with the current hour, and Master Hachimi casts a Mei Hua Yi Shu (Plum Blossom divination) hexagram by a fixed method. No dice, no luck of the draw: the same two numbers and the same hour always make the same hexagram. This step is plain math, and luck has nothing to do with it.",
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
      body: "Once the hexagram is cast, the AI's turn begins. Master Hachimi hands the hexagram, the hour, and your question to a third-party AI service and asks it to write a reading in the Master's voice. Which model exactly? We pick whichever holds up better in testing. What we require of any such service is written down in the Privacy Policy, and it holds no matter who writes the words. It can shape the words and speak to your situation, but it can't touch the hexagram, and it can't decide the fortune.",
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
          desc: "Charts are built on your device, not on a server. Step to the next major cycle, change a Star Settings option, or switch the Language, and it all recalculates on the spot. You can build a chart with no network. Your birth details never leave this device.",
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
          desc: "No changing your fate, no changing your luck, no keeping bad luck away. Anyone who talks to you that way isn't Master Hachimi.",
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
      "Master Hachimi has no accounts, so you use it without signing in and there is no account to delete. Your reading history is stored only on your device. This page explains exactly what is stored, where, and how to clear it.",
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
            "Stored under an anonymous ID (collected with use, under the consent you give on first launch), free text auto-deleted after 90 days; the third-party AI service processes it under its own terms, and we have required that it not use it to train its models (see the Privacy Policy)",
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
          "To write a reading, your question + the hexagram + the hour are sent to a third-party AI service. This is a reputable commercial, paid-tier service that we have required not to use your content for training; see the Privacy Policy for details. To request deletion of content already sent, email voice@hachimi.ai and we can initiate a request on your behalf.",
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
      "Master Hachimi stores your reading history and memories only on your device; anonymous records have their free text auto-deleted after 90 days. Deleting your data is entirely in your hands.",
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
            "Stored under an anonymous ID (collected with use, under the consent you give on first launch), with free text auto-deleted after 90 days; processed by the third-party AI service under its own terms; we have required that it not be used to train its models",
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
          "Your question is sent to a third-party AI service to generate each reading. This is a reputable commercial, paid-tier service that we have required not to use your content for training; see the Privacy Policy for details. Email voice@hachimi.ai to request deletion of content already sent.",
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
      "Master Hachimi (哈基米道长) is a Mei Hua Yi Shu (Plum Blossom divination) app. Give two numbers, cast a hexagram, and Master Hachimi reads it to you, just for fun. Hit a problem, or just want to say hi? Drop us an email.",
    steps: {
      heading: "Before you reach out: quick fixes",
      items: [
        "Reading won't load? Check your internet, then make sure “AI reading permission” is on under Me → Privacy and data.",
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
          "No. Master Hachimi is just for fun and comfort. Readings are not predictions, and they're not a basis for real decisions. See our Terms & Disclaimer.",
      },
      {
        heading: "Where does my data go?",
        content:
          "Your question and the cast go to our server, then on to a third-party AI service to write the reading. Nothing is sent without your OK. Your reading history stays only on your phone. See our Privacy Policy.",
      },
      {
        heading: "How do I delete my data?",
        content:
          "Go to Me → Privacy and data, then Delete data on this device, or delete the app. There's no account. Any anonymous records you sent are kept for at most 90 days, then deleted. See Account & data.",
      },
      {
        heading: "Which devices and languages?",
        content:
          "Master Hachimi runs on iPhone and iPad, in Simplified Chinese, Traditional Chinese, and English.",
      },
    ],
  },
};
