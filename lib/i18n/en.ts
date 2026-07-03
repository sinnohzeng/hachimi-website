import type { Translations } from "./types";

export const en: Translations = {
  nav: {
    features: "How it works",
    tech: "By the numbers",
    faq: "FAQ",
  },
  langSwitch: {
    en: "EN",
    zh: "中文",
  },

  hero: {
    badge: "Coming soon to the App Store",
    headline1: "When it's a lot,",
    headline2: "cast a hexagram.",
    description:
      "Two numbers and the question you're sitting with. Master Hachimi casts a Mei Hua Yi Shu hexagram and reads it back to you, helping you untangle the knot and find one small thing you can do right now. For entertainment and emotional comfort only.",
    cta: "See how it works",
    securityBadge:
      "No account. Your reading history stays on your device. To write a reading, your question is sent to Google Gemini. See the Privacy Policy.",
  },

  scenarioCards: {
    title: "Which one is it today?",
    subtitle: "Three matters people bring most, or ask anything",
    cards: [
      {
        name: "Find an Item",
        blurb: "Get back what you lost",
        line: "Something that matters has gone missing, and you've turned the place over.",
      },
      {
        name: "Relationship",
        blurb: "Sort out a knot with someone",
        line: "Things went prickly with someone, and it won't leave your mind.",
      },
      {
        name: "Decision",
        blurb: "Make a call between two hard options",
        line: "Two roads in front of you, and you can't quite choose.",
      },
    ],
    openName: "Free Question",
    openBlurb: "Anything else on your mind? Just ask Master Hachimi.",
  },

  featureCards: {
    title: "How Master Hachimi works",
    subtitle: "two numbers, one question",
    cards: [
      {
        title: "Tell the cat what's on your mind",
        description:
          "Type the question you're sitting with, then give two numbers off the top of your head. About thirty seconds. No sign-up, no account.",
      },
      {
        title: "One cast, the same every time",
        description:
          "Your two numbers and the hour set a Mei Hua Yi Shu hexagram by a fixed method. The same numbers and hour always give the same hexagram. Steady and sure.",
      },
      {
        title: "Master Hachimi reads it back",
        description:
          "Ears up, the cat-master reads it to you line by line: what the hexagram shows, a gentle take, and a small blessing to close. Each reading is saved to your local history to revisit.",
      },
    ],
  },

  featureHighlight: {
    title1: "A cat-master who'll",
    title2: "sit and think it through with you",
    description:
      "Master Hachimi takes your question seriously. You talk, he listens; once the hexagram is cast, he reads it to you line by line, helping you settle the noise and land on one small thing you can do right now.",
    features: [
      "The cast follows a fixed method: the same numbers and hour always give the same hexagram, not a dice roll",
      "Readings written by Google Gemini, shaped by your hexagram, the hour, and your question",
      "Your history stays on your device; our backend keeps none of your questions or readings",
    ],
    cta: "See how it works",
    phonePlaceholder: "Master Hachimi reading",
  },

  principles: {
    badge: "Why Master Hachimi?",
    title1: "Always here when you need him,",
    title2: "and knows where to stop",
    description:
      "Master Hachimi sits with you, and never predicts, changes fate, or turns luck. The reading is a few kind words. That's all of it, nothing more.",
    cta: "Read the privacy policy",
    cards: [
      "Same inputs, same hexagram",
      "For entertainment only",
      "No account, privacy-first",
      "A warm cat companion",
    ],
  },

  stats: {
    items: [
      { label: "Hexagrams" },
      { label: "Reading facets" },
      { label: "Accounts needed" },
      { label: "Interface languages" },
    ],
  },

  faq: {
    title: "Frequently asked questions",
    subtitle: "Everything you need to know about Master Hachimi.",
    items: [
      {
        question: "Is this real fortune telling?",
        answer:
          "No. Master Hachimi is for entertainment and emotional comfort only. The readings are not predictions and make no claim of accuracy, luck-changing, fate-changing, or any other efficacy. For any real decision, please talk to a qualified professional.",
      },
      {
        question: "How is a reading made?",
        answer:
          "You give two numbers and a question. Our backend casts a Mei Hua Yi Shu hexagram from the numbers and the current hour using a fixed, deterministic method. It then sends the hexagram, the hour, your question, and your chosen scenario to the Google Gemini API, which writes the reading in Master Hachimi's voice. The two cast numbers themselves are never sent to Google.",
      },
      {
        question: "What about my privacy?",
        answer:
          "There is no account and no login. Your reading history is stored only on your device, and the backend keeps nothing: no question text, no user database. To write a reading, your question is sent to the Google Gemini paid tier, where Google does not train on your content. You consent before your first reading and can withdraw any time. See the Privacy Policy.",
      },
      {
        question: "Which platforms is it on?",
        answer:
          "Master Hachimi is launching on iOS first, with Android to follow. This page goes live ahead of the App Store release.",
      },
      {
        question: "Does it cost anything?",
        answer:
          "The app is free to use, and there are no ads.",
      },
      {
        question: "How do I delete my data?",
        answer:
          "Because everything lives on your device, you delete your history in the app's Settings, or simply uninstall the app. There is no server-side copy to delete. See the Delete Data page for details.",
      },
    ],
    stillHaveQuestions: "Still have questions?",
    contact: "Email support@hachimi.ai",
  },

  finalCta: {
    headline: "Got something on your mind?",
    cta: "See how it works",
  },

  footer: {
    copyright:
      "© 2026 元竹投資有限公司 (Yuenchuk Investment Limited). All rights reserved.",
    links: [
      {
        title: "Product",
        items: [
          { label: "How it works", href: "#features" },
          { label: "By the numbers", href: "#tech" },
          { label: "FAQ", href: "#faq" },
        ],
      },
      {
        title: "Legal",
        items: [
          { label: "Privacy Policy", href: "/en/privacy" },
          { label: "Terms & Disclaimer", href: "/en/terms" },
          { label: "Delete Data", href: "/en/data-deletion" },
        ],
      },
      {
        title: "Contact",
        items: [
          { label: "Support", href: "/en/support" },
          { label: "support@hachimi.ai", href: "mailto:support@hachimi.ai" },
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
    effectiveDate: "Last updated: June 14, 2026",
    sections: [
      {
        heading: "Master Hachimi (哈基米道长)",
        content:
          "Master Hachimi (“the App”, “we”, “us”), brand Hachimi.ai, is operated by 元竹投資有限公司 (Yuenchuk Investment Limited), a company registered in Hong Kong (“the Company”). This Privacy Policy explains what data the App processes, why, and your rights.\n\nPlease understand how the App works first. Master Hachimi is an emotional-companionship product: you provide two numbers and write the question on your mind; the Company's unified backend performs a deterministic Mei Hua Yi Shu (Plum Blossom Numerology) cast, and a third-party AI model then generates the reading in the voice of “Master Hachimi”. Unlike many purely on-device divination utilities, generating a reading necessarily sends your question and the cast to the Company's backend, which forwards them to a third-party AI (Google Gemini). This policy discloses that accordingly.",
      },
      {
        heading: "1. Summary",
        content:
          "• The cast turns your numbers into a hexagram, a deterministic computation performed off-device; the reading is generated by a third-party AI (Google Gemini). Your question, chosen scenario, the two cast numbers, and time-of-day are sent to the Company's backend for casting; thereafter only your question, chosen scenario, the resulting hexagram, and time-of-day are forwarded to Google Gemini to generate the reading. The two cast numbers are not sent to Google.\n• We do not sell your data, do not use it for advertising, and do not track you across other apps or websites; we use no advertising identifier or IDFA, and no App Tracking Transparency.\n• No account is required to use the App.",
      },
      {
        heading: "2. Data we process",
        content:
          "• Your question, the free text you type, is the subject of the divination. It is sent to the Company's backend on each cast and forwarded to Google Gemini to generate the reading. The backend is designed not to persist it, forwarding it only transiently; your reading history, which includes the question, is stored on your device.\n• Your chosen scenario, one of find-item, relationship, decision, or open question, selects the reading's focus and tone. It is sent with the question to the backend and included in the prompt forwarded to Google Gemini; it is not persisted by the backend by design, and is stored on your device as part of history.\n• Two cast numbers and the local time-of-day drive the deterministic cast, setting the upper and lower trigrams and the moving line. They are sent with the question to the backend; not persisted by the backend by design; history is stored on your device.\n• Reading history, meaning the chart, reading, time, and question, is stored on your device only, so you can review past readings.\n• Selected language and settings are app preferences, stored locally on your device.\n\nWe do not collect: your name, email, contacts, photos, precise location (GPS), health data, financial data, or any advertising identifier (IDFA). The App does not use App Tracking Transparency because it performs no cross-app tracking. “Time-of-day” means your device's current clock hour, used to determine the moving line; it is not GPS positioning.",
      },
      {
        heading: "3. Third-party AI reading (core feature · App Store Guideline 5.1.2(i))",
        content:
          "To generate the “Master Hachimi” reading, on each cast the App sends [your question + chosen scenario + the cast + time-of-day] to the Company's own backend (a thin proxy; client device-integrity attestation is planned, see section 7). The backend performs the deterministic cast and then forwards the hexagram, your question, and the chosen scenario to the third-party AI service Google Gemini API to generate the reading text.\n\n• Explicit permission: Before your first cast, the App shows a consent screen that clearly states what will be sent and the recipients (the Company's backend + Google Gemini). Nothing is sent without your consent.\n• Revocable: You can withdraw consent at any time in Settings. After withdrawal the App sends no further data and therefore cannot generate new readings (the product has no offline reading mode); your existing local history is unaffected.\n• Google acts as a service provider: Google processes the content as a service provider / data processor, contractually limited to providing the reading service to the Company. Under the Gemini API paid-tier terms and its Data Processing Addendum (DPA), Google provides protection of your data equal to or no less than that stated in this policy.\n• Data use on the paid tier: the App uses the paid tier of the Google Gemini API. Per Google's current Gemini API Additional Terms of Service, on the paid tier Google does not use your prompts or responses to improve its products; Google logs prompts and responses only for a limited period, solely to detect abuse, maintain safety, and meet legal requirements. See the Google Gemini API Terms (https://ai.google.dev/gemini-api/terms) and Google Privacy Policy (https://policies.google.com/privacy).\n• Minimization: we send Google Gemini only what is necessary to generate the reading (your question + chosen scenario + cast + time-of-day). We do not send your identity, device identifiers, or location to Google. Once enabled, the device-attestation token used for anti-abuse will be sent only to the Company's backend, never to Google, and will not be used for tracking.",
      },
      {
        heading: "4. Backend and data retention",
        content:
          "• The Company operates a unified backend (thin proxy) to receive cast requests, run the deterministic cast, and forward to Google Gemini. By design this backend does not persist your question or history (transient forwarding, no user database).\n• Reading history is stored only on your device. Deleting a record or deleting the App removes it; we provide a “Delete all history” action in Settings.\n• Retention and deletion on the third party (Google): Google retains paid-tier prompts/responses for a limited period for abuse prevention (see section 3). To request deletion of content already sent to Google, contact us at support@hachimi.ai and we can initiate a request via Google's channels on your behalf, or see the data-request avenues in the Google Privacy Policy.",
      },
      {
        heading: "5. Your rights",
        content:
          "Depending on where you live (EU/EEA under GDPR, California under CCPA/CPRA, Hong Kong under PDPO, and others), you have rights to access, correct, and delete your personal data, to object to or restrict processing, and to withdraw consent at any time.\n\n• Withdraw consent: turn off the third-party AI reading consent toggle in Settings (see section 3).\n• Access / portability / deletion: because the Company's backend does not store your personal data and the App has no account, the reading history on your device is fully under your control; you can view and delete it in-app, and we hold no server-side copy to export.\n• GDPR: the lawful basis for sending your question and cast to the third-party AI is your consent, which you may withdraw at any time.\n• CCPA/CPRA: we disclose your question only for a business purpose to Google acting as a service provider, which is not a “sale” or a “share” for cross-context behavioral advertising.\n• PDPO (Hong Kong): we collect only data necessary for the App's function, use it only for that purpose, and apply transport encryption (TLS) to all network calls (device attestation is planned).\n\nFor any request or question, contact us using the details below; we will respond within the time limits required by applicable law.",
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
          "元竹投資有限公司 (Yuenchuk Investment Limited), Hong Kong\nEmail: support@hachimi.ai",
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
          "By using Master Hachimi (“the App”, brand Hachimi.ai), operated by 元竹投資有限公司 (Yuenchuk Investment Limited, Hong Kong), you agree to these Terms.",
      },
      {
        heading: "1. Entertainment purpose only",
        content:
          "Master Hachimi is an emotional-companionship product: “Master Hachimi” offers hexagrams and readings for your questions, based on the traditional Chinese method of Mei Hua Yi Shu (Plum Blossom Numerology), for entertainment and emotional comfort only. Readings are not factual predictions and must not be relied upon as such; the App makes no claim of predictive accuracy and offers no fortune-changing, luck-altering, or other efficacy.\n\nThe App does not provide, and its readings do not constitute, medical, psychological, legal, financial, investment, or any other professional advice. For any real decision, consult a qualified professional. Do not use the App as a substitute for professional judgment, emergency services, or any safety-critical decision.",
      },
      {
        heading: "2. No guarantee of outcome",
        content:
          "For any question, the App offers associative, entertainment-only hints derived from the hexagram (such as a mood, an image, or an evocative scene). It does not guarantee any real-world outcome. You are solely responsible for your own decisions and actions.",
      },
      {
        heading: "3. AI-generated content",
        content:
          "The reading text is generated by a third-party AI model (Google Gemini); the cast itself is a deterministic computation, and only the reading is AI-generated. AI-generated content may be inaccurate or incomplete. We are not responsible for decisions you make based on a reading. We harden the persona and red lines at the system level to avoid prohibited efficacy claims such as health or financial ones, but you should treat all output as entertainment. Generating a reading sends your question and the cast to a third-party AI. See the Privacy Policy and the in-app consent screen.",
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
          "The App is licensed, not sold, to you for personal, non-commercial use, under Apple's Standard End User License Agreement (or a custom EULA where provided), in addition to these Terms.",
      },
      {
        heading: "7. Changes & contact",
        content:
          "We may update these Terms; continued use means acceptance. Contact: support@hachimi.ai, 元竹投資有限公司, Hong Kong.",
      },
    ],
  },

  accountDeletion: {
    title: "Account & your data",
    effectiveDate: "Last updated: June 13, 2026",
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
            "Sent to our backend, forwarded to Google Gemini",
            "Backend keeps nothing; Google retains briefly for abuse-prevention (paid tier)",
          ],
        },
      ],
    },
    sections: [
      {
        heading: "No server-side account",
        content:
          "We don't create an account for you and run no user database. The backend is a stateless proxy: it casts the hexagram and forwards your question to Google Gemini to write the reading, then keeps nothing.",
      },
      {
        heading: "Data sent to Google Gemini",
        content:
          "To write a reading, your question + the hexagram + the hour are sent to the Google Gemini API (paid tier). On the paid tier Google does not use your content to improve its products and retains it only briefly for abuse prevention. To request deletion of content already sent, email support@hachimi.ai and we can initiate a request on your behalf.",
      },
      {
        heading: "Contact",
        content:
          "Questions? Email support@hachimi.ai. 元竹投資有限公司 (Yuenchuk Investment Limited), Hong Kong.",
      },
    ],
  },

  dataDeletion: {
    title: "Delete your data",
    effectiveDate: "Last updated: June 13, 2026",
    intro:
      "Master Hachimi stores your reading history only on your device, and our backend keeps nothing. Deleting your data is entirely in your hands.",
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
            "Forwarded to Google Gemini to generate the reading",
            "Not stored by our backend; briefly retained by Google for abuse prevention",
          ],
        },
      ],
    },
    sections: [
      {
        heading: "Local data only",
        content:
          "Reading history and settings live on your device. Delete history in Settings, or uninstall the App to remove it all. There is no cloud account or server-side copy of your data.",
      },
      {
        heading: "Third-party (Google) retention",
        content:
          "Your question is sent to Google Gemini (paid tier) to generate each reading. Google does not train on paid-tier content and retains it only briefly for abuse prevention. Email support@hachimi.ai to request deletion of content already sent.",
      },
      {
        heading: "Contact",
        content:
          "Email support@hachimi.ai. 元竹投資有限公司 (Yuenchuk Investment Limited), Hong Kong.",
      },
    ],
  },

  support: {
    title: "Support",
    effectiveDate: "Last updated: June 14, 2026",
    intro:
      "Master Hachimi (哈基米道长) is a cat-themed Mei Hua Yi Shu (Plum Blossom numerology) app: give two numbers, cast a quick hexagram, and get a gentle, for-entertainment reading. Need help, have a question, or want to report a bug? We're glad to hear from you.",
    steps: {
      heading: "Before you reach out: quick fixes",
      items: [
        "Reading won't generate? Check your internet connection, then make sure you've agreed to the third-party AI consent in Settings.",
        "Want to start over? On the question screen, enter two new numbers and cast again.",
        "Switch language? Settings → Language (Simplified Chinese / English). Reopen the app to apply.",
        "Delete your data? Settings → Privacy → Delete all history. Your history lives only on your device.",
      ],
    },
    dataTable: {
      heading: "How to reach us",
      columns: ["Channel", "Address", "Typical response"],
      rows: [{ cells: ["Email", "support@hachimi.ai", "Within 3 business days"] }],
    },
    sections: [
      {
        heading: "Is this real fortune-telling?",
        content:
          "No. Master Hachimi is for entertainment and emotional companionship only. Readings are not predictions and are not a basis for real decisions. See our Terms & Disclaimer.",
      },
      {
        heading: "Where does my data go?",
        content:
          "Your question and the cast are sent to our backend and forwarded to Google Gemini to generate the reading; nothing is sent without your consent. Your reading history is stored only on your device. See our Privacy Policy.",
      },
      {
        heading: "How do I delete my data?",
        content:
          "Open Settings → Privacy → Delete all history, or delete the app. There is no account and no server-side copy. See Account & data.",
      },
      {
        heading: "Which devices and languages?",
        content:
          "Master Hachimi runs on iPhone and iPad, in Simplified Chinese and English.",
      },
    ],
  },
};
