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
          "Yes — it is part of what you agree to before your first reading. Your question, scenario, hexagram, and reading are saved under an anonymous ID, your typed text is deleted after 90 days, and it is used only to make readings better. Never sold, never used for ads, no outside analytics. Withdrawing consent stops the collection, and resetting your anonymous ID in Settings unlinks past records right away. See section 4 of the Privacy Policy.",
      },
      {
        question: "How does the Master remember what I asked?",
        answer:
          "Through “memories” kept on your device: after each reading, the app condenses it into a short note on your phone. When you ask about something related, up to three of those notes travel with the request just to shape that one reading — the server uses them and forgets them, and keeps no memory store. You can turn off “Master Hachimi’s Memory” in Settings any time; deleting a history entry deletes its memory too. Casting for someone else? Turn on “Asking for someone else” and the Master won’t remember it.",
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
          "Your history and memories live on your phone. Delete them in the app's Settings, or just uninstall. The anonymous records you sent are kept for at most 90 days, then deleted. Resetting your anonymous ID unlinks them right away. See the Delete Data page for details.",
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
    effectiveDate: "Last updated: July 11, 2026",
    sections: [
      {
        heading: "Master Hachimi (哈基米道长)",
        content:
          "Master Hachimi (“the App”), brand Hachimi.ai, is operated by the Hachimi.ai team (“we”, “us”; the operating entity is named in the contact section at the end of this policy). This Privacy Policy explains what data the App processes, why, and your rights.\n\nPlease understand how the App works first. Master Hachimi is an emotional-companionship product: you provide two numbers and write the question on your mind; our unified server performs a fixed Mei Hua Yi Shu (Plum Blossom divination) cast, and a third-party AI model then generates the reading in the voice of “Master Hachimi”. Unlike many purely on-device divination utilities, generating a reading necessarily sends your question and the cast to our server, which forwards them to a third-party AI service. The specific provider currently used is set out in section 3, “Current third-party AI provider”. This policy discloses that accordingly.",
      },
      {
        heading: "1. Summary",
        content:
          "• The cast turns your numbers into a hexagram, a fixed computation performed off-device; the reading is generated by a third-party AI service. Your question, chosen scenario, the two cast numbers, and time-of-day are sent to our server for casting; thereafter only your question, chosen scenario, the resulting hexagram, and time-of-day are forwarded to the third-party AI service to generate the reading. The two cast numbers are not sent to that third-party service.\n• What you asked and the reading are stored on our server under an anonymous install identifier, with free-text content kept for at most 90 days, only to improve reading quality (a single explicit consent on first launch; using the App means collection under that consent — your recourse is resetting the anonymous identifier in Settings at any time, plus the 90-day automatic deletion; see sections 4 and 5).\n• “Master Hachimi’s Memory” (memory episodes and your focus profile) stays only on your device — the server keeps no memory store; at most 3 relevant episodes travel transiently with a cast request to shape that one reading and are discarded after processing (see section 4).\n• We do not sell your data, do not use it for advertising, and do not track you across other apps or websites; we use no advertising identifier or IDFA, and no App Tracking Transparency.\n• No account is required to use the App.",
      },
      {
        heading: "2. Data we process",
        content:
          "• Your question, the free text you type, is the subject of the divination. It is sent to our server on each cast and forwarded to the third-party AI service to generate the reading; it is also used to improve reading quality — the server stores it under an anonymous install identifier (a single explicit consent on first launch; using the App means collection under that consent), with the text kept for at most 90 days before automatic deletion (see section 4). Your reading history, which includes the question, always stays on your device.\n• Your chosen scenario, one of find-item, relationship, decision, or open question, selects the reading's focus and tone. It is sent with the question to the server and included in the prompt forwarded to the third-party AI service; it is stored with the event per section 4, and is stored on your device as part of history.\n• Two cast numbers and the local time-of-day drive the fixed cast, setting the upper and lower trigrams and the changing line. They are sent with the question to the server; stored with the event per section 4; history is stored on your device.\n• Your feedback on a reading (thumbs up / down) flags reading quality so real unsatisfying samples can help improve the readings. It is sent alongside the corresponding cast event (withdrawing consent stops all uploads); it stays in your local history, and the server-side vote contains no text and is kept as anonymous statistics.\n• The anonymous install identifier, a random UUID generated on first launch, groups events from the same installation to observe overall quality trends and is never linked to your identity. It is sent with every cast request; its link to stored events is automatically severed after 90 days, and you can reset it in Settings at any time.\n• Master Hachimi’s Memory (episodes and your focus profile) lets readings pick up threads you asked about before. Episodes and the profile themselves stay only on your device and are deleted in cascade with your history; while the Memory is on, at most 3 relevant episodes and the theme profile travel transiently with that cast request and are forwarded to the third-party AI service solely to shape that one reading, then discarded — never stored; the server keeps only content-free counts such as how many episodes a request carried. Turning the Memory off, choosing “no need to remember this one”, or casting via “Asking for someone else” sends no memory at all.\n• Reading history, meaning the chart, reading, time, and question, is stored on your device only, so you can review past readings.\n• Selected language and settings are app preferences, stored locally on your device.\n\nWe do not collect: your name, email, contacts, photos, precise location (GPS), health data, financial data, or any advertising identifier (IDFA). The App does not use App Tracking Transparency because it performs no cross-app tracking. “Time-of-day” means your device's current clock hour, used to determine the changing line; it is not GPS positioning.",
      },
      {
        heading:
          "3. Third-party AI reading (core feature · App Store Guideline 5.1.2(i))",
        content:
          "To generate the “Master Hachimi” reading, on each cast the App sends your question, chosen scenario, the cast, and the time-of-day to our own server (a thin proxy; client device-integrity attestation is planned, see section 7). The server performs the fixed cast and then forwards the hexagram, your question, and the chosen scenario to a third-party AI service to generate the reading text. What matters is not which AI model is behind the scenes, but how it handles your content — the nature of, and our commitments about, any service we use are set out at the end of this section.\n\n• Explicit permission: Before your first cast, the App shows a consent screen that clearly states what will be sent and the recipients (our server + the third-party AI service), and also discloses that what you ask will be used to improve reading quality (the event storage described in section 4). Nothing is sent without your consent.\n• Revocable: You can withdraw consent at any time in Settings. After withdrawal the App sends no further data and therefore cannot generate new readings (the product has no offline reading mode); your existing local history is unaffected. Withdrawing consent also stops all event and feedback uploads.\n• The provider acts as a service provider: the third-party AI service processes the content as a service provider / data processor to provide the reading service to us, and we have required that it not use your content to train its own models (see the end of this section).\n• Minimization: we send the third-party AI service only what is needed to generate the reading (your question + chosen scenario + cast + time-of-day). We do not send your identity, device identifiers, or location to it. Once enabled, the device-attestation token used for anti-abuse will be sent only to our server, never to the third-party AI service, and will not be used for tracking.\n\nThe nature of the third-party AI service, and our commitments: we use only a reputable commercial, paid-tier third-party AI service (an enterprise paid API — never a free tier or a consumer-grade product). Only your question, chosen scenario, hexagram, and time-of-day are forwarded to it. The service processes this content as our service provider (data processor), solely to provide the reading service and for no other purpose; we have required that it not use your content to train or improve its models, and required that it not sell personal data, not use it for targeted advertising, and not build user profiles. What matters is not which model is behind the scenes — we may change such a service or use more than one (for example, to route requests) as our needs evolve, and the standards above apply uniformly to every such service; as long as those standards still hold, the consent you have given remains valid and this policy does not need to change.",
      },
      {
        heading: "4. Backend and data retention",
        content:
          "• We operate a unified server to receive cast requests, run the fixed cast, and forward to the third-party AI service. To improve reading quality, this server stores cast events as a pseudonymous minimal set: each cast's question, chosen scenario, hexagram, and reading are stored in our own database together with the anonymous install identifier (using the App means collection under the single explicit consent given on first launch — there is no separate switch; if you do not consent, the sending features are simply not used). Your controls are: the first-launch consent (revocable, see section 3) + resetting the anonymous identifier at any time (past events are immediately unlinked) + the 90-day automatic deletion.\n• 90-day rolling deletion: the question text, any clarification, the full reading text, and the link to the install identifier are automatically deleted or severed by a daily task once a record is 90 days old; after that, only anonymous statistical rows containing no free text remain (scenario distribution, response latency, feedback rates) for long-term quality trends.\n• Quality-evaluation samples: a small number of thumbs-down readings may be selected as internal evaluation material; before use they must be manually rewritten and de-identified (turned into semantically equivalent synthetic cases, never keeping your original wording verbatim), and only the rewritten version enters the evaluation set.\n• No third-party analytics: all of the above runs on our own infrastructure, with no third-party analytics, advertising, or crash-reporting SDKs. Purposes are explicit and limited: improving reading quality with real failure samples, making follow-up questions and question understanding more accurate, and refining how different scenarios are handled; never for advertising, profiling, or sale.\n• Master Hachimi’s Memory (on-device memory): episodes and your focus profile stay only on your device — the server keeps no memory store. Each reading is distilled on your device into a “memory episode” (a theme plus a one-line gist, including any outcome or note you add); deleting a history record deletes its episode with it. When you cast, at most 3 relevant episodes (including the original question, clipped to 200 characters on-device) and the theme profile travel with that request and are forwarded to the third-party AI solely to shape that one reading, then discarded — never stored; the server-side event keeps only content-free counts such as how many episodes the request carried. Turning the Memory off, choosing “no need to remember this one”, or casting via “Asking for someone else” sends no memory at all. The “focus profile” here is a theme tally computed only on your device — unrelated to the advertising / marketing profiling that “never for profiling” above refers to; the server never aggregates a profile of you.\n• Reading history is stored only on your device. Deleting a record or deleting the App removes it; we provide a “Delete all history” action in Settings.\n• Retention on the third party: the third-party AI service retains and processes the content it receives under its own terms (we have required that it not use your content to train its models; see section 3). To request deletion of content already sent to it, contact us at voice@hachimi.ai and we can initiate a request on your behalf.",
      },
      {
        heading: "5. Your rights",
        content:
          "Depending on where you live (EU/EEA under GDPR, California under CCPA/CPRA, Hong Kong under PDPO, and others), you have rights to access, correct, and delete your personal data, to object to or restrict processing, and to withdraw consent at any time.\n\n• Withdraw consent: turn off the third-party AI reading consent toggle in Settings (see section 3); after withdrawal nothing further is sent and no new events are stored.\n• Access / portability / deletion: the App has no account; server-side events are keyed only to a resettable anonymous install identifier that we cannot link back to you, so we cannot provide per-person access to or export of server-side copies. The reading history on your device is fully under your control; you can view and delete it in-app. Uploaded event text is kept for at most 90 days and then automatically deleted per section 4, and resetting the identifier in Settings immediately unlinks past events from your installation.\n• GDPR: the lawful basis for sending your question and cast to the third-party AI is your consent, which you may withdraw at any time.\n• CCPA/CPRA: we disclose your question only for a business purpose to the third-party AI service acting as a service provider, which is not a “sale” or a “share” for cross-context behavioral advertising.\n• PDPO (Hong Kong): we collect only data needed for the App's function, use it only for that purpose, and apply transport encryption (TLS) to all network calls (device attestation is planned).\n\nFor any request or question, contact us using the details below; we will respond within the time limits required by applicable law.",
      },
      {
        heading: "6. Children",
        content:
          "The App is not directed to children under 13 and does not knowingly collect personal data from them.",
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
    effectiveDate: "Last updated: July 11, 2026",
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
            "Stored under an anonymous ID (collected with use, under the consent you give on first launch), free text auto-deleted after 90 days; the third-party AI service processes it under its own terms, and we have required that it not use it to train its models (see the Privacy Policy)",
          ],
        },
      ],
    },
    sections: [
      {
        heading: "No server-side account",
        content:
          "Our server casts the hexagram and hands your question to the third-party AI service to write the reading. There is no account. Records are stored under an anonymous install identifier with free text auto-deleted after 90 days; you can reset the anonymous ID in Settings at any time.",
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
    effectiveDate: "Last updated: July 11, 2026",
    intro:
      "Master Hachimi stores your reading history and memories only on your device; anonymous records have their free text auto-deleted after 90 days. Deleting your data is entirely in your hands.",
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
          "Reading history, memories, and settings live on your device. Delete history in Settings, or uninstall the App to remove it all. There is no cloud account; anonymous records keep their free text for at most 90 days (see the Privacy Policy).",
      },
      {
        heading: "Third-party AI service retention",
        content:
          "Your question is sent to a third-party AI service to generate each reading. This is a reputable commercial, paid-tier service that we have required not to use your content for training; see the Privacy Policy for details. Email voice@hachimi.ai to request deletion of content already sent.",
      },
      {
        heading: "Contact",
        content: "Email voice@hachimi.ai to reach the Hachimi.ai team.",
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
