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
    text: "Your chart runs on your phone, even offline.",
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
    effectiveDate: "Last updated: September 17, 2026",
    sections: [
      {
        heading: "Master Hachimi (哈基米道长)",
        content:
          "Master Hachimi (“the App”), brand Hachimi.ai, is operated by the Hachimi.ai team (“we”, “us”; the operating entity is named in the contact section at the end of this policy). This Privacy Policy explains what data the App processes, why, and your rights.\n\nPlease understand how the App works first. You provide two numbers and write the question on your mind; our unified server performs a fixed Mei Hua Yi Shu (Plum Blossom divination) cast, and a third-party AI model then generates the reading in the voice of “Master Hachimi”. Unlike many purely on-device divination utilities, generating a reading necessarily sends your question and the cast to our server, which forwards them to a third-party AI service. The nature of that service, and what we require of it, are set out in section 3. This policy discloses that accordingly.",
      },
      {
        heading: "1. Summary",
        content:
          "• Online question casting runs deterministically on our backend. DeepSeek Open Platform receives the question and clarification, scenario, derived hexagram, time index, language and selected context to generate a reading, without the original numbers; the casting instant, time zone and public calendar pillars supply time context. See §3 for the full categories. Offline charts run locally and do not require AI consent.\n• What you asked and the reading are stored on our server under an anonymous install identifier, with free-text content kept for at most 90 days, only to improve reading quality (explicit consent before the first actual online reading; using the App means collection under that consent; your recourse is resetting the anonymous identifier under Me → Privacy and data at any time, plus the 90-day automatic deletion; see sections 4 and 5).\n• “Master Hachimi’s Memory” (memory episodes and your focus profile) stays only on your device; the server keeps no memory store; at most 3 relevant episodes and 8 active profile evidence entries for the same case travel transiently with a cast request to shape that one reading and are discarded after processing (see section 4).\n• We do not sell your data, do not use it for advertising, and do not track you across other apps or websites; we use no advertising identifier or IDFA, and no App Tracking Transparency.\n• No account is required to use the App.",
      },
      {
        heading: "2. Data we process",
        content:
          "• Your question, the free text you type, is the subject of the divination. It is sent to our server on each cast and forwarded to the third-party AI service to generate the reading; it is also used to improve reading quality; the server stores it under an anonymous install identifier (explicit consent before the first actual online reading; using the App means collection under that consent), with the text kept for at most 90 days before automatic deletion (see section 4). Your reading history, which includes the question, always stays on your device.\n• Your chosen scenario, one of find-item, love, career, or open question, selects the reading's focus and tone. It is sent with the question to the server and included in the prompt forwarded to the third-party AI service; it is stored with the event per section 4, and is stored on your device as part of history.\n• Two cast numbers and the local time-of-day drive the fixed cast, setting the upper and lower trigrams and the changing line. They are sent with the question to the server; stored with the event per section 4; history is stored on your device.\n• Your feedback on a reading (thumbs up / down) flags reading quality so real unsatisfying samples can help improve the readings. It is sent alongside the corresponding cast event (withdrawing consent stops all uploads); it stays in your local history, and the server-side vote contains no text and is kept as anonymous statistics.\n• The anonymous install identifier, a random UUID generated on first launch, groups events from the same installation to observe overall quality trends and is never linked to your identity. It is sent with every cast request; its link to stored events is automatically severed after 90 days, and you can reset it under Me → Privacy and data at any time.\n• Master Hachimi’s Memory (episodes and your focus profile) lets readings pick up threads you asked about before. Episodes and the profile themselves stay only on your device and are deleted in cascade with your history; while the Memory is on, at most 3 relevant episodes and 8 active profile evidence entries for the same case and the theme profile travel transiently with that cast request and are forwarded to the third-party AI service solely to shape that one reading, then discarded and never stored; the server keeps only content-free counts such as how many episodes a request carried. Turning the Memory off, choosing “no need to remember this one”, or casting via “Asking for someone else” sends no memory at all.\n• Reading history, meaning the chart, reading, time, and question, is stored on your device only, so you can review past readings.\n• Selected language and settings are app preferences, stored locally on your device.\n• Usage statistics (anonymous daily counts) tell us whether features are actually used and whether a new version keeps people coming back. They are daily counts of nine actions from a closed list: opening the App, seeing a reading, collecting a waiting result, going back home mid-ritual, ending a cast, browsing history, using export, and turning Master Hachimi’s Memory on or off, recorded only as “on this day, this action, in this scenario, happened N times”, with no timestamps and none of the text you write. They are uploaded to our server with the anonymous install identifier; retention is described in section 4.\n• Crash diagnostics (iOS system mechanism only) help us find and fix defects that crash the App. They are generated after a crash by Apple’s built-in MetricKit framework and contain purely technical information such as the call stack and the OS and App versions, none of your content, and no anonymous install identifier from the moment of collection, so they cannot be linked to any installation. They are uploaded only to our own server; retention is described in section 4.\n\n• Derived summary of the selected chart profile (natal year/month/day/hour pillars, day master, yin/yang, strength, pattern, seasonal balancing elements, gender, and ten-year age band): Lets the reading use the chart background explicitly selected for that question: Transiently: forwarded through our backend to DeepSeek; profile name, birth details and location are not sent: Used for that reading and not stored as a profile library; the complete profile stays on the device and in system-managed backups\n\nCompany servers do not receive chart-profile names, birth details or locations, email, contacts, photos, precise location (GPS), or any advertising identifier (IDFA). Names, birth details and birthplaces you choose to enter in the profile library are used for on-device chart calculation and may be included in system-managed device backups; when a profile is selected for a question, only the derived summary listed above is sent. The App does not use App Tracking Transparency because it performs no cross-app tracking.\n\nOn health and finances: the App does not read HealthKit, medical records, bank accounts, or any structured health or financial data, and never asks you for any. But what you write is free text, and you may well mention your body, a diagnosis, your salary, or a debt in it. Those words are handled as part of your question, on exactly the same terms as any other free text in this section: forwarded per section 3 to generate a reading, retained and deleted per section 4. So write only what you want to write; you do not owe the App a detail you would rather keep.",
      },
      {
        heading: "3. Third-party AI readings and consent",
        content:
          "Our backend receives your current question and clarification, scenario, two numbers, precise casting time and time zone, language, random installation and request identifiers, consent version, and necessary authentication and entitlement fields to cast, prevent abuse, and provide readings. Optional memory and chart context described below are included when enabled or selected.\n\n3.1 Recipient and data sent\n\nThe recipient is DeepSeek Open Platform (DeepSeek). It receives the current question and clarification, scenario focus, output language, derived hexagram and time index, plus the frozen casting instant, IANA time zone, local civil time, public year/month/day/hour pillars, actual UTC offset and calendar rule version.\n\nWhen memory is enabled and not paused for the selected case, it also receives safety-filtered statistics, up to three past questions, summaries, themes, elapsed days, hexagram numbers and feedback outcomes for that case. Up to eight active profile evidence entries include their topic, content, statement or inference basis, source role, elapsed days and correction status. A selected chart supplies its locally computed natal year/month/day/hour pillars, day master, yin/yang, strength, pattern, seasonal balancing elements, gender and ten-year age band.\n\nOriginal cast numbers, case-library names, birth details and locations, installation or request IDs, authentication tokens, subscription credentials, consent records and local feedback notes are not forwarded as fields. Anything entered in the question or clarification is sent as written. Processing and retention follow the applicable provider terms and account settings. Changes to recipients, fields or purposes require updated disclosure and renewed consent.\n\nNatal pillars may narrow down a birth-time range even though no raw birth date or time is sent.\n\n3.2 Permission and withdrawal\n\nWithout a question, casting produces only a deterministic result. It does not call DeepSeek, use memory profiles or require AI consent.\n\nThe first-launch guide has a single Get Started button and does not grant permission for online readings. When you first request an online reading, the App explains the data, purposes and recipient, DeepSeek, and offers Agree and Enable Online Readings or Not Now. Once accepted, the same disclosure version is not requested again. Online reading requests are not sent without permission.\n\nIn Me > Privacy & Data > Privacy Policy, you can open the full policy and see your permission status. If you have agreed, the bottom of the page offers Stop Online Readings and Withdraw Consent. It has no enable button when permission is absent. Withdrawal stops new AI-reading requests, usage receipts and feedback uploads. The App ends its active session and keeps your input draft; late responses are not saved to history. Requests already sent cannot be guaranteed to stop remotely, and existing server records remain subject to their retention periods. You may still explicitly submit a content report.\n\nWithdrawal does not delete local history or affect offline charts and local data. To use online readings again, explicitly choose Agree and Enable Online Readings when requesting a reading.",
      },
      {
        heading: "4. Backend and data retention",
        content:
          '• The Company operates a unified backend to receive cast requests, run the deterministic cast, and forward to the third-party AI service. To improve reading quality, this backend stores cast events as a pseudonymous minimal set: each cast\'s question, chosen scenario, hexagram, and reading are stored in the Company\'s own database together with the anonymous install identifier (using the App means collection under the explicit consent given before an online reading — there is no separate switch; if you do not consent, the sending features are simply not used). Your controls are: online-reading consent (revocable, see §3.2) + resetting the anonymous identifier at any time (past events are immediately unlinked from your installation) + the 90-day automatic deletion.\n• 90-day rolling deletion: the question text, any clarification, the full reading text, and the link to the install identifier are automatically deleted or severed by a daily scheduled task once a record is 90 days old; after that, the database keeps only anonymous statistical rows containing no free text (such as scenario distribution, response latency, and feedback rates) for long-term quality trends.\n• Quality-evaluation samples: a small number of thumbs-down readings may be selected as internal evaluation material — before use they must be manually rewritten and de-identified (turned into semantically equivalent synthetic cases; your original wording is not kept verbatim), and only the rewritten version enters the evaluation set.\n• No third-party analytics: all of the above runs on the Company\'s own infrastructure; we integrate no third-party analytics, advertising, or crash-reporting SDKs.\n• Purposes (explicit and limited): improving reading quality with real failure samples, making follow-up questions and question understanding more accurate, and refining how different scenarios are handled. Never for advertising, profiling, or sale. ("Profiling" here means advertising / marketing user profiles; it is distinct from the on-device "focus profile" of §4.1 — see the disambiguation there.)\n• A cast stopped by a safety topic: if what you write touches on a crisis, physical or mental health, or financial hardship, the App switches to a static page of information and generates no reading. In that case we store neither your question nor any generated text; only the admission record above exists, and it still expires within 8 days.\n• Short-lived on-device data: input drafts expire after 30 days and are removed on the next read. They are stored in a directory excluded from system backups. Active readings and retry state exist only in memory; after the process exits they are not automatically restored or resent.\n• Reading history and memory episodes do travel in system backups: they live in the App\'s regular data area, so they are included in the encrypted, system-managed backup on iOS or Android, so that your history survives a new phone. This is not cloud sync by us：we cannot see backup contents, and there is no account. "Delete on-device data" in Settings clears this device\'s copy; it cannot delete a backup Apple or your Android vendor already holds. You remove those yourself (iPhone: Settings → your name → iCloud → Manage Account Storage → Backups; Android: the backup section of system settings, or Google One).\n• Reading history is stored only on your device. Deleting a record or deleting the App removes it; we provide a "Delete all history" action in Settings.\n• Retention and deletion on the third-party AI service: DeepSeek retains and processes received content under its applicable service terms and account settings. To request deletion of content already sent to the service, contact us at the address below; we can help initiate a request, although content sent without an identity linkage may not be individually locatable.\n\n4.1 Hachimi\'s Memory (per case)\n\n• Each case has separate memories and a profile. Unassociated casts do not build a shared profile. Online readings may propose evidence grounded in the current input; the device checks sources, expiry and conflicts before assigning entries to that case. Inferences are not established facts. Entries can be viewed, corrected or deleted; memory can be paused per case or disabled globally.\n• Only the active, same-case context listed in §3.1 is sent transiently for a reading. Expired or conflicting evidence and entries whose sources were deleted or set aside are excluded. Feedback notes are not sent. Company servers do not store memory content or build a case-memory library. No memory profile is sent without an associated case, with memory disabled, or while the case is paused.\n• Deleting a case normally preserves its historical name snapshot in reading history and clears linked memory. Its history can then be explicitly cleared from the deleted-case history filter. Deleting a history record removes its memory and evidence that loses its source. Local deletion does not delete existing external backups or previously sent server records.\n• These profiles support readings for the selected case, not advertising, marketing or cross-app tracking.\n\n4.2 Membership and subscription\n\n• Apple handles payment; we never see it: membership is purchased in-app through Apple\'s in-app purchase. Your name, email, card, and billing address are handled entirely by Apple. We neither receive nor store any of it.\n• All we receive is a purchase identifier: to verify your entitlement, the backend receives and briefly caches the purchase identifier Apple issues (an opaque originalTransactionId-style ID that does not link back to your real identity), and uses it only to tell whether you are a member. It is not written into the cast-event store of §4 and is never tied to anything you wrote.\n• Membership follows the app store: on iOS your membership belongs to your Apple Account and comes back through Apple after a new device or a reinstall. The App needs no account and creates none. It does not carry over to Android, which is counted by that store on its own.\n• Paying changes no chart: casting and chart results are byte-for-byte the same whether or not you are a member. Membership opens finer time layers, the professional BaZi sheet, and more AI readings a day. Nothing else.',
      },
      {
        heading: "5. Your rights",
        content:
          "Depending on where you live (EU/EEA under GDPR, California under CCPA/CPRA, Hong Kong under PDPO, and others), you have rights to access, correct, and delete your personal data, to object to or restrict processing, and to withdraw consent at any time.\n\n• Withdraw consent: choose Stop Online Readings and Withdraw Consent at the bottom of Me > Privacy & Data > Privacy Policy (see §3).\n• Access / portability / deletion: the App has no account; server-side events are keyed only to a resettable anonymous install identifier that we cannot link back to you, so we cannot provide per-person access to or export of server-side copies. The reading history on your device is fully under your control; you can view and delete it in-app. Uploaded event text is kept for at most 90 days and then automatically deleted per section 4, and resetting the identifier under Me → Privacy and data immediately unlinks past events from your installation.\n• GDPR: the lawful basis for sending your question and cast to the third-party AI is your consent, which you may withdraw at any time.\n• CCPA/CPRA: third-party AI disclosure provides the reading you request. The Company does not sell your data or use it for cross-app advertising tracking. See §3 for provider processing.\n• PDPO (Hong Kong): we collect only data needed for the App's function, use it only for that purpose, and apply transport encryption (TLS) to all network calls (device attestation is planned).\n\nFor any request or question, contact us using the details below; we will respond within the time limits required by applicable law.",
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
      "Master Hachimi (哈基米道长) is a Mei Hua Yi Shu (Plum Blossom divination) app. Give two numbers, cast a hexagram, and Master Hachimi reads it to you, just for fun. Hit a problem, or just want to say hi? Drop us an email.",
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
          "No. Master Hachimi is just for fun and comfort. Readings are not predictions, and they're not a basis for real decisions. See our Terms & Disclaimer.",
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
          "Master Hachimi runs on iPhone and iPad, in Simplified Chinese, Traditional Chinese, and English.",
      },
    ],
  },
};
