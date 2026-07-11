import type { Translations } from "./types";

export const en: Translations = {
  nav: {
    features: "How it works",
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
    badge: "See how it's built",
    headline1: "When it's a lot,",
    headline2: "cast a hexagram.",
    description:
      "Two numbers, one question. Master Hachimi reads the hexagram, a six-line sign, with you and finds one small step to take now.",
    cta: "See how it works",
  },

  scenarioCards: {
    title: "Which one is it today?",
    subtitle: "The three things people ask about most, or ask anything",
    cards: [
      {
        name: "Find an Item",
        blurb: "Get back what you lost",
        line: "You lost something that matters, and you've looked everywhere.",
      },
      {
        name: "Relationship",
        blurb: "Work things out with someone",
        line: "Things got tense with someone, and you can't stop thinking about it.",
      },
      {
        name: "Decision",
        blurb: "Choose between two hard options",
        line: "Two roads in front of you, and you can't decide.",
      },
    ],
    openName: "Free Question",
    openBlurb: "Anything else on your mind? Just ask Master Hachimi.",
  },

  featureCards: {
    title: "How Master Hachimi works",
    subtitle: "two numbers, one question",
    readMore: "How it's built",
    cards: [
      {
        title: "Tell Master Hachimi what's on your mind",
        description:
          "Type the question on your mind, then give two numbers off the top of your head. About thirty seconds. No account needed.",
      },
      {
        title: "One cast, the same every time",
        description:
          "Your two numbers and the hour set a Mei Hua Yi Shu (Plum Blossom divination) hexagram by a fixed method. Steady and sure.",
      },
      {
        title: "Master Hachimi reads it back",
        description:
          "Ears up, Master Hachimi reads it to you line by line: what the hexagram shows, a kind word, and a small blessing to close. Each reading is saved to your history on the phone, so you can look back.",
      },
    ],
  },

  featureHighlight: {
    title1: "Master Hachimi will",
    title2: "sit and think it through with you",
    description:
      "Master Hachimi takes your question seriously. You talk, he listens. Once the hexagram is cast, he reads it to you line by line and calms the noise in your head. And every reading ends the same way: one small thing you can do right now. Send that message, tidy that drawer, or write three lines before bed.",
    features: [
      "The cast follows a fixed method: the same numbers and hour always give the same hexagram, not a dice roll",
      "Readings are written by a third-party AI service, shaped by your hexagram, the hour, and your question",
      "Your history stays on your device; no account, no ads, no tracking",
    ],
    cta: "See how it's built",
    phonePlaceholder: "Master Hachimi reading",
  },

  principles: {
    badge: "Why Master Hachimi?",
    title1: "Always here when you need him,",
    title2: "and knows where to stop",
    description:
      "Master Hachimi sits with you. He never predicts the future, changes your fate, or turns your luck. The reading is a few kind words. That's all of it, nothing more.",
    cta: "Read the privacy policy",
    cards: [
      "Same inputs, same hexagram",
      "For entertainment only",
      "No account, privacy first",
      "A cat by your side",
    ],
  },

  stats: {
    items: [
      { label: "Hexagrams" },
      { label: "Points in a reading" },
      { label: "Accounts needed" },
      { label: "App languages" },
    ],
  },

  faq: {
    title: "Common questions",
    subtitle: "Everything you need to know about Master Hachimi.",
    items: [
      {
        question: "Is this real fortune telling?",
        answer:
          "No. Master Hachimi is for entertainment and comfort only. It never predicts the future, never changes your fate, and makes no promises. You can read the full limits on the How it's built page and in the Terms.",
      },
      {
        question: "How is a reading made?",
        answer:
          "You give two numbers and a question. Our server casts a hexagram with a fixed method, then hands it to a third-party AI service to write the reading in Master Hachimi's voice. Your two numbers themselves are never sent to that AI service. The How it's built page walks through every step.",
      },
      {
        question: "What about my privacy?",
        answer:
          "There's no account and no login, and your reading history stays only on your phone. To write a reading, your question is sent to a third-party AI service. You agree to this before your first reading, and you can take it back any time. The Privacy Policy names the provider and lays out the details.",
      },
      {
        question: "Do you collect my questions?",
        answer:
          "Only while “Help improve readings” is on. Then your question, scenario, hexagram, and reading are saved under an anonymous ID, your typed text is deleted after 90 days, and it is used only to make readings better. Never sold, never used for ads, no outside analytics. Turn it off in Settings any time and everything still works. See section 4 of the Privacy Policy.",
      },
      {
        question: "Which platforms is it on?",
        answer:
          "It's on both. Get it on the App Store for iPhone, or on Google Play for Android.",
      },
      {
        question: "Does it cost anything?",
        answer: "The app is free to use, and there are no ads.",
      },
      {
        question: "How do I delete my data?",
        answer:
          "Your history lives on your phone. Delete it in the app's Settings, or just uninstall. If you ever turned on “Help improve readings”, the anonymous records you sent are kept for at most 90 days, then deleted. Resetting your anonymous ID unlinks them right away. See the Delete Data page for details.",
      },
    ],
    stillHaveQuestions: "Still have questions?",
    contact: "Email voice@hachimi.ai",
  },

  finalCta: {
    headline: "Got something on your mind?",
    note: "A cast takes about thirty seconds.",
  },

  footer: {
    copyright: "© 2026 Hachimi.ai. All rights reserved.",
    links: [
      {
        title: "Product",
        items: [
          { label: "How it works", href: "/en#features" },
          { label: "How it's built", href: "/en/methodology" },
          { label: "By the numbers", href: "/en#tech" },
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
    effectiveDate: "Last updated: July 4, 2026",
    sections: [
      {
        heading: "Master Hachimi (哈基米道长)",
        content:
          "Master Hachimi (“the App”, “we”, “us”), brand Hachimi.ai, is operated by Yuenchuk Investment Limited, a company registered in Hong Kong (“the Company”). This Privacy Policy explains what data the App processes, why, and your rights.\n\nPlease understand how the App works first. Master Hachimi is an emotional-companionship product: you provide two numbers and write the question on your mind; the Company's unified server performs a fixed Mei Hua Yi Shu (Plum Blossom divination) cast, and a third-party AI model then generates the reading in the voice of “Master Hachimi”. Unlike many purely on-device divination utilities, generating a reading necessarily sends your question and the cast to the Company's server, which forwards them to a third-party AI service. The specific provider currently used is set out in section 3, “Current third-party AI provider”. This policy discloses that accordingly.",
      },
      {
        heading: "1. Summary",
        content:
          "• The cast turns your numbers into a hexagram, a fixed computation performed off-device; the reading is generated by a third-party AI service. Your question, chosen scenario, the two cast numbers, and time-of-day are sent to the Company's server for casting; thereafter only your question, chosen scenario, the resulting hexagram, and time-of-day are forwarded to the third-party AI service to generate the reading. The two cast numbers are not sent to that third-party service.\n• If you keep “Help improve readings” on (enabled by default with your first consent, can be turned off separately in Settings at any time), what you asked and the reading are stored on the Company's server under an anonymous install identifier, with free-text content kept for at most 90 days, only to improve reading quality; turning it off does not affect any feature.\n• We do not sell your data, do not use it for advertising, and do not track you across other apps or websites; we use no advertising identifier or IDFA, and no App Tracking Transparency.\n• No account is required to use the App.",
      },
      {
        heading: "2. Data we process",
        content:
          "• Your question, the free text you type, is the subject of the divination. It is sent to the Company's server on each cast and forwarded to the third-party AI service to generate the reading; when “Help improve readings” is on, it is also used to improve reading quality. In that case the server stores it under an anonymous install identifier, with the text kept for at most 90 days before automatic deletion (see section 4); when off, the server stores nothing. Your reading history, which includes the question, always stays on your device.\n• Your chosen scenario, one of find-item, relationship, decision, or open question, selects the reading's focus and tone. It is sent with the question to the server and included in the prompt forwarded to the third-party AI service; it is stored (or not) with the event per section 4, and is stored on your device as part of history.\n• Two cast numbers and the local time-of-day drive the fixed cast, setting the upper and lower trigrams and the changing line. They are sent with the question to the server; stored (or not) with the event per section 4; history is stored on your device.\n• Your feedback on a reading (thumbs up / down) flags reading quality so real unsatisfying samples can help improve the readings. It is sent alongside the corresponding cast event only when “Help improve readings” is on; it stays in your local history, and the server-side vote contains no text and is kept as anonymous statistics.\n• The anonymous install identifier, a random UUID generated on first launch, groups events from the same installation to observe overall quality trends and is never linked to your identity. It is sent only while “Help improve readings” is on; its link to stored events is automatically severed after 90 days, and you can reset it in Settings at any time.\n• Reading history, meaning the chart, reading, time, and question, is stored on your device only, so you can review past readings.\n• Selected language and settings are app preferences, stored locally on your device.\n\nWe do not collect: your name, email, contacts, photos, precise location (GPS), health data, financial data, or any advertising identifier (IDFA). The App does not use App Tracking Transparency because it performs no cross-app tracking. “Time-of-day” means your device's current clock hour, used to determine the changing line; it is not GPS positioning.",
      },
      {
        heading:
          "3. Third-party AI reading (core feature · App Store Guideline 5.1.2(i))",
        content:
          "To generate the “Master Hachimi” reading, on each cast the App sends your question, chosen scenario, the cast, and the time-of-day to the Company's own server (a thin proxy; client device-integrity attestation is planned, see section 7). The server performs the fixed cast and then forwards the hexagram, your question, and the chosen scenario to a third-party AI service to generate the reading text. The specific provider currently used, its legal entity, its terms and privacy-policy links, and its provider-specific commitments are set out at the end of this section under “Current third-party AI provider”.\n\n• Explicit permission: Before your first cast, the App shows a consent screen that clearly states what will be sent and the recipients (the Company's server + the third-party AI service), and also discloses that what you ask will be used to improve reading quality (the event storage described in section 4). Nothing is sent without your consent.\n• Revocable: You can withdraw consent at any time in Settings. After withdrawal the App sends no further data and therefore cannot generate new readings (the product has no offline reading mode); your existing local history is unaffected. Withdrawing consent also stops all “Help improve readings” uploads.\n• “Help improve readings” can be turned off on its own: unlike the full withdrawal above, you can just turn off this one switch in Settings; events stop uploading, and casting and readings keep working exactly as before (see section 4).\n• The provider acts as a service provider: the third-party AI service processes the content as a service provider / data processor to provide the reading service to the Company; the provider's own data-use terms — including whether it may use content to train its own models, and your opt-out rights — are as set out at the end of this section under “Current third-party AI provider”.\n• Minimization: we send the third-party AI service only what is needed to generate the reading (your question + chosen scenario + cast + time-of-day). We do not send your identity, device identifiers, or location to it. Once enabled, the device-attestation token used for anti-abuse will be sent only to the Company's server, never to the third-party AI service, and will not be used for tracking.\n\nCurrent third-party AI provider: the third-party AI service the App currently uses is provided by Hangzhou DeepSeek Artificial Intelligence Co., Ltd., namely the DeepSeek Open Platform API (current model DeepSeek V4 Flash). Only your question, chosen scenario, hexagram, and time-of-day are forwarded to it. For content sent through its interface, the Company acts as data controller and DeepSeek processes it as an entrusted processor (data processor) to provide the reading service to the Company. Please note: unlike some peers, DeepSeek's current terms do NOT promise that submitted content is withheld from model training by default — per its current privacy policy, DeepSeek may use content it receives to train and improve its models, while offering you a way to opt out of that use; DeepSeek also states it does not sell personal data, does not use it for targeted advertising, and does not build user profiles, and that the data is collected, processed, and stored within the People's Republic of China. See the DeepSeek Open Platform Terms of Service (https://cdn.deepseek.com/policies/en-US/deepseek-open-platform-terms-of-service.html) and DeepSeek Privacy Policy (https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html). Every other section of this policy that refers to “the third-party AI service” means the current provider set out in this section; if the Company changes provider, only this section and the in-app consent screen are updated.",
      },
      {
        heading: "4. Backend and data retention",
        content:
          "• The Company operates a unified server to receive cast requests, run the fixed cast, and forward to the third-party AI service. To improve reading quality, this server stores cast events as a pseudonymous minimal set: only while “Help improve readings” is on, each cast's question, chosen scenario, hexagram, and reading are stored in the Company's own database together with the anonymous install identifier; once you turn the switch off, no new events are stored.\n• 90-day rolling deletion: the question text, any clarification, the full reading text, and the link to the install identifier are automatically deleted or severed by a daily task once a record is 90 days old; after that, only anonymous statistical rows containing no free text remain (scenario distribution, response latency, feedback rates) for long-term quality trends.\n• Quality-evaluation samples: a small number of thumbs-down readings may be selected as internal evaluation material; before use they must be manually rewritten and de-identified (turned into semantically equivalent synthetic cases, never keeping your original wording verbatim), and only the rewritten version enters the evaluation set.\n• No third-party analytics: all of the above runs on the Company's own infrastructure, with no third-party analytics, advertising, or crash-reporting SDKs. Purposes are explicit and limited: improving reading quality with real failure samples, making follow-up questions and question understanding more accurate, and refining how different scenarios are handled; never for advertising, profiling, or sale.\n• Reading history is stored only on your device. Deleting a record or deleting the App removes it; we provide a “Delete all history” action in Settings.\n• Retention and use on the third party: the third-party AI service retains and processes the content it receives per its privacy policy and may use it to train and improve its own models (the provider offers a way to opt out of that use; see section 3). To request deletion of content already sent to it, or to opt out of training use, contact us at voice@hachimi.ai and we can initiate a request via its channels on your behalf, or see the data-request avenues in that provider's privacy policy referenced in section 3.",
      },
      {
        heading: "5. Your rights",
        content:
          "Depending on where you live (EU/EEA under GDPR, California under CCPA/CPRA, Hong Kong under PDPO, and others), you have rights to access, correct, and delete your personal data, to object to or restrict processing, and to withdraw consent at any time.\n\n• Withdraw consent: turn off the third-party AI reading consent toggle in Settings (see section 3); to stop only the “improve” storage, turn off the “Help improve readings” switch instead.\n• Access / portability / deletion: the App has no account; server-side events are keyed only to a resettable anonymous install identifier that we cannot link back to you, so we cannot provide per-person access to or export of server-side copies. The reading history on your device is fully under your control; you can view and delete it in-app. Uploaded event text is kept for at most 90 days and then automatically deleted per section 4, and resetting the identifier in Settings immediately unlinks past events from your installation.\n• GDPR: the lawful basis for sending your question and cast to the third-party AI is your consent, which you may withdraw at any time.\n• CCPA/CPRA: we disclose your question only for a business purpose to the third-party AI service acting as a service provider, which is not a “sale” or a “share” for cross-context behavioral advertising.\n• PDPO (Hong Kong): we collect only data needed for the App's function, use it only for that purpose, and apply transport encryption (TLS) to all network calls (device attestation is planned).\n\nFor any request or question, contact us using the details below; we will respond within the time limits required by applicable law.",
      },
      {
        heading: "6. Children",
        content:
          "The App is not directed to children under 13 and does not knowingly collect personal data from them.",
      },
      {
        heading: "7. Security",
        content:
          "All network calls use standard HTTPS/TLS; client device-integrity attestation (App Check / App Attest) to deter abuse is planned (not yet enforced at launch). Upstream AI service keys are held only on the Company's server and are never shipped to or embedded in the client.",
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
          "By using Master Hachimi (“the App”, brand Hachimi.ai), operated by Yuenchuk Investment Limited (Hong Kong), you agree to these Terms.",
      },
      {
        heading: "1. Entertainment purpose only",
        content:
          "Master Hachimi is an emotional-companionship product: “Master Hachimi” offers hexagrams and readings for your questions, based on the traditional Chinese method of Mei Hua Yi Shu (Plum Blossom divination), for entertainment and emotional comfort only. Readings are not factual predictions and must not be relied upon as such; the App makes no claim of predictive accuracy and offers no fortune-changing, luck-altering, or other efficacy.\n\nThe App does not provide, and its readings do not constitute, medical, psychological, legal, financial, investment, or any other professional advice. For any real decision, consult a qualified professional. Do not use the App as a substitute for professional judgment, emergency services, or any safety-critical decision.",
      },
      {
        heading: "2. No guarantee of outcome",
        content:
          "For any question, the App offers associative, entertainment-only hints derived from the hexagram (such as a mood, an image, or an evocative scene). It does not guarantee any real-world outcome. You are only responsible for your own decisions and actions.",
      },
      {
        heading: "3. AI-generated content",
        content:
          "The reading text is generated by a third-party AI service (the current provider and its commitments are set out in the Privacy Policy); the cast itself is a fixed computation, and only the reading is AI-generated. AI-generated content may be inaccurate or incomplete. We are not responsible for decisions you make based on a reading. We harden the persona and red lines at the system level to avoid prohibited efficacy claims such as health or financial ones, but you should treat all output as entertainment. Generating a reading sends your question and the cast to a third-party AI. See the Privacy Policy and the in-app consent screen.",
      },
      {
        heading: "4. Your responsibilities",
        content:
          "You agree not to use the App to: make medical, legal, or financial decisions; harm yourself or others; or violate any law in your location. You also agree not to submit content that is unlawful, infringing, or intended to manipulate the model's output. The App is intended for users 13 and older.",
      },
      {
        heading: "5. Limitation of liability",
        content:
          "To the maximum extent permitted by law, the Company is not liable for any direct, indirect, incidental, or consequential damages arising from your use of, or inability to use, the App or its readings. The App is provided “as is” without warranties of any kind.",
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
    metaTitle: "How it's built",
    metaDescription:
      "How a hexagram is cast, where the AI comes in and what limits it, and how we hold the red lines. Master Hachimi's method, out in the open.",
    badge: "The Master's old rules",
    title1: "How a reading is made,",
    title2: "out in the open",
    lastUpdated: "Last updated: July 9, 2026",
    intro:
      "Plenty of fortune apps never show you how the hexagram was cast or how the words were written. Master Hachimi doesn't play it that way. The cast follows a fixed method, the reading is kept on a short leash, and every update has to pass a test before it ships. Here is the whole thing, inside and out. For entertainment and comfort only.",
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
      body: "Once the hexagram is cast, the AI's turn begins. Master Hachimi hands the hexagram, the hour, and your question to a third-party AI service and asks it to write a reading in the Master's voice. Which model exactly? We pick whichever holds up better in testing, and it's all written down in the Privacy Policy. It can shape the words and speak to your situation, but it can't touch the hexagram, and it can't decide the fortune.",
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
        "The character and red lines: no predicting, no fate-changing, no luck, written into the system prompt",
      ],
    },
    eval: {
      kicker: "The test gate",
      step: "03",
      title:
        "How we make sure it still follows the rules: every update takes a test",
      body: "Whether the words hold up, and whether they cross a red line, isn't left to a hunch. Every build first has to clear a hard gate, and the code doesn't get in if it fails. On top of that, a stronger model judges the readings against 30 set test cases on a regular pass, so quality gets real scrutiny, not just a hunch.",
      stats: [
        {
          value: "30",
          label: "set test cases across four scenarios and two languages",
        },
        {
          value: "4",
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
          desc: "No changing your fate, no turning your luck, no keeping bad luck away. Anyone who talks to you that way isn't Master Hachimi.",
        },
        {
          title: "For entertainment only",
          desc: "For serious things like health, legal, or money, please see a professional. What the Master offers is company for how you feel.",
        },
        {
          title: "Your history stays on your device",
          desc: "Your reading history lives only on your phone. Want it gone? Clear it in Settings in one tap. The Privacy Policy spells out how anonymous records are saved and deleted.",
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
    effectiveDate: "Last updated: July 4, 2026",
    intro:
      "Master Hachimi has no accounts, so you use it without signing in and there is no account to delete. Your reading history is stored only on your device. This page explains exactly what is stored, where, and how to clear it.",
    steps: {
      heading: "How to clear your data",
      items: [
        "Open Master Hachimi and go to Settings.",
        "Tap Privacy, then Delete all history.",
        "Confirm, and your local reading history is erased from the device.",
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
            "Stored anonymously only while “Help improve readings” is on, free text auto-deleted after 90 days; the third-party AI service processes it per its privacy policy and may use it to train its own models (opt-out available; see the Privacy Policy)",
          ],
        },
      ],
    },
    sections: [
      {
        heading: "No server-side account",
        content:
          "Our server casts the hexagram and hands your question to the third-party AI service to write the reading. There is no account. If you enable “Help improve readings”, records are stored under an anonymous install identifier with free text auto-deleted after 90 days; if you keep it off, nothing is stored.",
      },
      {
        heading: "Data sent to the third-party AI service",
        content:
          "To write a reading, your question + the hexagram + the hour are sent to a third-party AI service. The current provider's identity and its data-use terms (under its current terms it may use content to train its own models, and offers a way to opt out) are set out in the Privacy Policy. To request deletion of content already sent, email voice@hachimi.ai and we can initiate a request on your behalf.",
      },
      {
        heading: "Contact",
        content:
          "Questions? Email voice@hachimi.ai. Yuenchuk Investment Limited, Hong Kong.",
      },
    ],
  },

  dataDeletion: {
    title: "Delete your data",
    effectiveDate: "Last updated: July 4, 2026",
    intro:
      "Master Hachimi stores your reading history only on your device; anonymous records exist only while “Help improve readings” is on, with free text auto-deleted after 90 days. Deleting your data is entirely in your hands.",
    steps: {
      heading: "How to delete your data",
      items: [
        "Open Master Hachimi and go to Settings.",
        "Tap Privacy, then Delete all history.",
        "Confirm, and your local reading history is erased from the device.",
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
            "Hexagram, reading text, your question, and time, stored locally",
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
            "Stored anonymously only while “Help improve readings” is on, with free text auto-deleted after 90 days; processed by the third-party AI service per its privacy policy, and may be used to train its own models (opt-out available)",
          ],
        },
      ],
    },
    sections: [
      {
        heading: "Local data only",
        content:
          "Reading history and settings live on your device. Delete history in Settings, or uninstall the App to remove it all. There is no cloud account; anonymous records exist only while “Help improve readings” is on, kept for at most 90 days (see the Privacy Policy).",
      },
      {
        heading: "Third-party AI service retention",
        content:
          "Your question is sent to a third-party AI service to generate each reading. The current provider's identity and its data-use terms (under its current terms it may use content to train its own models, and offers a way to opt out) are set out in the Privacy Policy. Email voice@hachimi.ai to request deletion of content already sent.",
      },
      {
        heading: "Contact",
        content:
          "Email voice@hachimi.ai. Yuenchuk Investment Limited, Hong Kong.",
      },
    ],
  },

  support: {
    title: "Support",
    effectiveDate: "Last updated: July 4, 2026",
    intro:
      "Master Hachimi (哈基米道长) is a Mei Hua Yi Shu (Plum Blossom divination) app. Give two numbers, cast a hexagram, and Master Hachimi reads it to you, just for fun. Hit a problem, or just want to say hi? Drop us an email.",
    steps: {
      heading: "Before you reach out: quick fixes",
      items: [
        "Reading won't load? Check your internet, then make sure you've agreed to the third-party AI consent in Settings.",
        "Want to start over? On the question screen, enter two new numbers and cast again.",
        "Switch language? Go to Settings, then Language (Simplified Chinese, Traditional Chinese, or English). Reopen the app to apply.",
        "Delete your data? Go to Settings, then Privacy, then Delete all history. Your history lives only on your phone.",
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
          "Go to Settings, then Privacy, then Delete all history, or delete the app. There's no account. Any anonymous records you sent are kept for at most 90 days, then deleted. See Account & data.",
      },
      {
        heading: "Which devices and languages?",
        content:
          "Master Hachimi runs on iPhone and iPad, in Simplified Chinese, Traditional Chinese, and English.",
      },
    ],
  },
};
