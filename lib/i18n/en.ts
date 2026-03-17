import type { Translations } from "./types";

export const en: Translations = {
  nav: {
    features: "Features",
    tech: "Tech",
    download: "Download",
  },
  langSwitch: {
    en: "EN",
    zh: "中文",
  },

  hero: {
    badge: "v2.37.0 — Now on Google Play",
    headline1: "Notice more.",
    headline2: "Live better.",
    description:
      "5 minutes a day — the quietest moment that's entirely yours. Record a Daily Light, offload your worries, stay focused, and watch your cat react to your mood. No willpower required.",
    ctaDownload: "Download APK",
    ctaGooglePlay: "Google Play",
    ctaSource: "View Source",
    securityBadge: "Privacy-first. AI features are optional and opt-in.",
  },

  featureCards: {
    title: "Everything you need",
    subtitle: "to live more mindfully",
    cards: [
      {
        title: "Daily awareness in 30 seconds",
        description:
          "Record a Daily Light each evening — pick your mood, write one line, tag what mattered. Writing it down offloads your brain. Weekly reviews and worry tracker keep you grounded.",
      },
      {
        title: "Focus that flows into reflection",
        description:
          "Countdown and stopwatch modes with a persistent foreground service. When a session ends, a Daily Light prompt appears — closing the focus-to-awareness loop.",
      },
      {
        title: "A cat that feels what you feel",
        description:
          "Your companion reacts to your mood with 5 unique animations. 15 pelt patterns, 19 colors, 6 personalities — each cat grows alongside your awareness journey.",
      },
    ],
  },

  featureHighlight: {
    title1: "Meet your companion,",
    title2: "watch them grow",
    description:
      "Each cat has its own personality, mood, and growth stage. As you notice more about your day, your companion evolves — a living reflection of your inner journey.",
    features: [
      "Awareness flywheel — focus, record a Daily Light, see your cat react",
      "AI cat chat — talk to your cats in their unique personality",
      "108+ accessories across 5 price tiers in the shop",
    ],
    cta: "Explore features",
    phonePlaceholder: "Cat companion detail page",
  },

  principles: {
    badge: "Why Hachimi?",
    title1: "Awareness that grows,",
    title2: "one day at a time",
    description:
      "Habits grow by design, not willpower. The bar is so low you don't even need the word \"persist\" — just 5 minutes before bed. When a cat responds to your mood and reflections add up, awareness happens naturally.",
    cta: "Download for Android",
    cards: [
      "Awareness-Driven",
      "Privacy-First Design",
      "Offline Capable",
      "Beautiful Design",
    ],
  },

  stats: {
    items: [
      { label: "Cat breeds" },
      { label: "Accessories" },
      { label: "Languages" },
      { label: "Achievements" },
    ],
  },

  faq: {
    title: "Frequently asked questions",
    subtitle: "Everything you need to know about Hachimi.",
    items: [
      {
        question: "What is the awareness feature?",
        answer:
          "Every evening, spend 30 seconds recording a Daily Light — pick your mood, write one line, tag what mattered. Weekly reviews capture three happy moments and learnings. The worry tracker lets you write down worries and offload them from your brain. Monthly rituals set your focus habit. Your cat reacts to your mood with unique animations, making self-awareness feel alive.",
      },
      {
        question: "Is my data safe?",
        answer:
          "All your data is stored in Firebase with strict security rules. AI features are optional and opt-in — when enabled, chat messages are sent to cloud AI providers (MiniMax or Google Gemini) for processing. A privacy disclosure is shown before first use. You can delete your account and all associated data at any time.",
      },
      {
        question: "Is Hachimi available on iOS?",
        answer:
          "Currently Hachimi is Android-only, available as a direct APK download from GitHub and on Google Play. iOS support is planned for a future release. The codebase is built with Flutter, so cross-platform deployment is technically ready.",
      },
      {
        question: "Is Hachimi open source?",
        answer:
          "The source code is publicly available on GitHub for portfolio and reference purposes. However, it is not licensed for redistribution or commercial use. See the LICENSE file for full terms.",
      },
      {
        question: "How does the AI chat work?",
        answer:
          "Hachimi connects to cloud AI providers — you can choose between MiniMax and Google Gemini in Settings. Your cats respond with personality-flavored messages generated in real-time. AI features are entirely optional and disabled by default.",
      },
      {
        question: "Does it cost anything?",
        answer:
          "Hachimi is completely free. There are no in-app purchases, no ads, and no subscription fees. All features — including awareness tools, focus timer, cat companions, and AI chat — are free. The in-app coin economy is earned through focus sessions and daily check-ins.",
      },
    ],
    stillHaveQuestions: "Still have questions?",
    contact: "Check the docs on GitHub",
  },

  finalCta: {
    headline: "Ready to meet your first cat?",
    cta: "Download for Android",
  },

  footer: {
    copyright: `\u00A9 2025\u20132026 Zixuan Zeng. All Rights Reserved.`,
    links: [
      {
        title: "Product",
        items: [
          { label: "Features", href: "#features" },
          { label: "Tech Stack", href: "#tech" },
          { label: "FAQ", href: "#faq" },
        ],
      },
      {
        title: "Developer",
        items: [
          { label: "GitHub", href: "https://github.com/sinnohzeng/hachimi-app" },
          { label: "Docs", href: "https://github.com/sinnohzeng/hachimi-app/tree/main/docs" },
          { label: "Changelog", href: "https://github.com/sinnohzeng/hachimi-app/blob/main/CHANGELOG.md" },
        ],
      },
      {
        title: "Links",
        items: [
          { label: "Portfolio", href: "https://zixuan.net" },
          { label: "Website Source", href: "https://github.com/sinnohzeng/hachimi-app-website" },
        ],
      },
    ],
    legal: [
      { label: "Privacy Policy", href: "/en/privacy" },
      { label: "Delete Account", href: "/en/account-deletion" },
      { label: "Delete Data", href: "/en/data-deletion" },
      { label: "License", href: "https://github.com/sinnohzeng/hachimi-app/blob/main/LICENSE" },
    ],
  },

  privacy: {
    title: "Privacy Policy",
    effectiveDate: "Effective date: February 23, 2026",
    sections: [
      {
        heading: "Introduction",
        content:
          "Hachimi (\u201Cwe\u201D, \u201Cour\u201D, or \u201Cthe app\u201D) is a habit-tracking app with virtual cat companions, built by Zixuan Zeng. This Privacy Policy explains how we collect, use, and protect your information when you use Hachimi. By using the app, you agree to the practices described in this policy.",
      },
      {
        heading: "Information we collect",
        content:
          "Account information: When you create an account, we collect your email address and display name via Firebase Authentication.\n\nHabit and focus data: Your habits, focus sessions, quest progress, cat companions, coins, and inventory are stored in Cloud Firestore to power the core app experience.\n\nAI chat content (optional): If you enable AI features, your chat messages with cat companions and diary generation requests are sent to cloud AI providers (MiniMax or Google Gemini, depending on your choice) for processing. AI features are disabled by default and require explicit opt-in with a privacy disclosure.\n\nDevice and usage data: We automatically collect crash reports (Firebase Crashlytics), app usage events (Firebase Analytics), performance data (Firebase Performance), and push notification tokens (Firebase Cloud Messaging) to improve the app experience.",
      },
      {
        heading: "How we use your information",
        content:
          "We use the information we collect to:\n\n\u2022 Provide and maintain the core habit-tracking and cat-raising experience\n\u2022 Generate AI-powered cat chat responses and diary entries (when enabled)\n\u2022 Send push notifications for habit reminders (when enabled)\n\u2022 Analyze app usage patterns and fix crashes\n\u2022 Monitor app performance and improve reliability",
      },
      {
        heading: "Third-party services",
        content:
          "We share data with the following third-party services:\n\nGoogle Firebase: Authentication, Cloud Firestore (data storage), Analytics, Crashlytics (crash reports), Performance Monitoring, Cloud Messaging (push notifications), and Remote Config. Google\u2019s privacy policy applies to data processed by Firebase services.\n\nMiniMax (optional): If you select MiniMax as your AI provider, chat messages are sent to MiniMax\u2019s API for generating responses. MiniMax\u2019s privacy policy applies to this data.\n\nGoogle Gemini (optional): If you select Gemini as your AI provider, chat messages are sent to Google\u2019s Gemini API for generating responses. Google\u2019s AI privacy terms apply.\n\nWe do not sell your personal data. We do not use third-party advertising services.",
      },
      {
        heading: "Data security",
        content:
          "All data is encrypted in transit using TLS/HTTPS. Cloud Firestore encrypts data at rest. Firebase security rules restrict data access to authenticated users for their own documents. API keys for AI providers are injected at build time and never stored on-device in plain text.",
      },
      {
        heading: "Your rights",
        content:
          "Access and export: You can view all your data within the app (habits, sessions, cats, coins, chat history).\n\nDeletion: You can delete your account and all associated data through the app\u2019s account deletion flow (Settings \u2192 Account \u2192 Delete Account). This permanently removes your authentication record and all Firestore data.\n\nOpt-out: AI features can be disabled at any time in Settings. Push notifications can be managed through your device\u2019s system settings.",
      },
      {
        heading: "Children\u2019s privacy",
        content:
          "Hachimi is not designed for or directed at children under 13. We do not knowingly collect personal information from children under 13. If you believe a child under 13 has provided us with personal information, please contact us so we can take appropriate action.",
      },
      {
        heading: "Changes to this policy",
        content:
          "We may update this Privacy Policy from time to time. Changes will be reflected on this page with an updated effective date. We encourage you to review this policy periodically.",
      },
      {
        heading: "Contact",
        content:
          "If you have questions about this Privacy Policy or your data, please contact us at:\n\nWebsite: https://hachimi.ai\nGitHub: https://github.com/sinnohzeng/hachimi-app",
      },
    ],
  },

  accountDeletion: {
    title: "Delete your account",
    effectiveDate: "Effective date: February 23, 2026",
    intro:
      "Hachimi, developed by Zixuan Zeng, allows you to permanently delete your account and all associated data directly within the app. This page explains the steps to request account deletion and what data is affected.",
    steps: {
      heading: "How to delete your account",
      items: [
        "Open Hachimi and tap the profile icon, then tap Settings.",
        "Tap Account, then tap Delete Account.",
        "Review the data summary showing your quests, cats, and total focus hours.",
        'Type "DELETE" to confirm, then re-authenticate with your Google account.',
      ],
    },
    dataTable: {
      heading: "Data deleted and retained",
      columns: ["Data type", "Deleted?", "Retention period"],
      rows: [
        { cells: ["Account (email, display name)", "Yes", "Deleted immediately"] },
        { cells: ["Quests and focus sessions", "Yes", "Deleted immediately"] },
        { cells: ["Cat companions and inventory", "Yes", "Deleted immediately"] },
        { cells: ["Achievements", "Yes", "Deleted immediately"] },
        { cells: ["Check-in history", "Yes", "Deleted immediately"] },
        { cells: ["User profile (coins, settings)", "Yes", "Deleted immediately"] },
        { cells: ["AI chat messages and diary (local)", "Yes", "Deleted immediately"] },
        { cells: ["App preferences (local)", "Yes", "Deleted immediately"] },
        { cells: ["Crash reports (Firebase Crashlytics)", "No", "Up to 90 days (managed by Google)"] },
        { cells: ["Analytics events (Firebase Analytics)", "No", "Per Google\u2019s data retention policy"] },
      ],
    },
    sections: [
      {
        heading: "What happens after deletion",
        content:
          "Account deletion is permanent and irreversible. Once confirmed, the following actions occur automatically:\n\n\u2022 Your Firebase Authentication record is deleted\n\u2022 All your data in Cloud Firestore is permanently removed, including quests, focus sessions, cat companions, achievements, check-in history, coins, and inventory\n\u2022 Local data on your device is cleared, including AI chat history, diary entries, app preferences, and scheduled notifications\n\u2022 You will be signed out and returned to the login screen\n\nYou will not be able to recover your account or any associated data after deletion.",
      },
      {
        heading: "Third-party data retention",
        content:
          "Some anonymized or aggregated data collected by Google Firebase services (Crashlytics, Analytics, Performance Monitoring) may be retained by Google according to their own data retention policies. This data is managed by Google and cannot be deleted by Hachimi directly. For more information, refer to Google\u2019s privacy policy.",
      },
      {
        heading: "Alternative options",
        content:
          "Before deleting your account, you may consider these alternatives:\n\n\u2022 Disable AI features: Go to Settings and turn off AI chat to stop sending data to cloud AI providers\n\u2022 Manage notifications: Disable push notifications through your device\u2019s system settings\n\nThese options let you continue using Hachimi with reduced data sharing.",
      },
      {
        heading: "Contact",
        content:
          "If you have questions about account deletion or need assistance, please contact us at:\n\nWebsite: https://hachimi.ai\nGitHub: https://github.com/sinnohzeng/hachimi-app",
      },
    ],
  },

  dataDeletion: {
    title: "Delete your data",
    effectiveDate: "Effective date: February 23, 2026",
    intro:
      "Hachimi, developed by Zixuan Zeng, allows you to delete all your personal data by deleting your account. When you delete your account, all associated data is permanently removed. Hachimi does not currently support selective data deletion \u2014 deleting your account removes everything.",
    steps: {
      heading: "How to delete your data",
      items: [
        "Open Hachimi and tap the profile icon, then tap Settings.",
        "Tap Account, then tap Delete Account.",
        "Review the data summary showing your quests, cats, and total focus hours.",
        'Type "DELETE" to confirm, then re-authenticate with your Google account.',
      ],
    },
    dataTable: {
      heading: "Types of data deleted and retained",
      columns: ["Data type", "What it includes", "Deleted?"],
      rows: [
        { cells: ["Account information", "Email address and display name from Google sign-in", "Yes, immediately"] },
        { cells: ["Quests", "Quest names, goals, target hours, deadlines, reminders, and notes", "Yes, immediately"] },
        { cells: ["Focus sessions", "Start/end times, duration, XP and coins earned, timer mode", "Yes, immediately"] },
        { cells: ["Cat companions", "Names, appearance, personality, growth stage, equipped accessories", "Yes, immediately"] },
        { cells: ["Achievements", "Unlocked achievements and unlock timestamps", "Yes, immediately"] },
        { cells: ["Check-in history", "Monthly check-in records and milestone data", "Yes, immediately"] },
        { cells: ["User profile", "Coin balance, inventory items, avatar, push notification token", "Yes, immediately"] },
        { cells: ["AI chat and diary", "Chat conversations with cats and auto-generated diary entries (stored locally)", "Yes, immediately"] },
        { cells: ["App preferences", "Settings, AI toggle state, selected AI provider (stored locally)", "Yes, immediately"] },
        { cells: ["Crash reports", "Stack traces and device info collected by Firebase Crashlytics", "No, up to 90 days"] },
        { cells: ["Analytics events", "Usage patterns and screen views collected by Firebase Analytics", "No, per Google policy"] },
      ],
    },
    sections: [
      {
        heading: "Cloud data vs. local data",
        content:
          "Your data is stored in two locations:\n\n\u2022 Cloud (Firebase): Account information, quests, focus sessions, cats, achievements, check-in history, and user profile are stored in Google Cloud Firestore. These are permanently deleted from the server when you delete your account.\n\n\u2022 Local (device): AI chat messages, diary entries, app preferences, and scheduled notifications are stored on your device. These are cleared during the deletion process.\n\nBoth cloud and local data are removed as part of the account deletion flow.",
      },
      {
        heading: "Third-party data retention",
        content:
          "Crash reports (Firebase Crashlytics), analytics events (Firebase Analytics), and performance data (Firebase Performance Monitoring) are collected and managed by Google. This data may be retained by Google for up to 90 days or according to Google\u2019s own data retention policies. Hachimi cannot delete this data directly. For more information, refer to Google\u2019s privacy policy.",
      },
      {
        heading: "Contact",
        content:
          "If you have questions about data deletion or need assistance, please contact us at:\n\nWebsite: https://hachimi.ai\nGitHub: https://github.com/sinnohzeng/hachimi-app",
      },
    ],
  },
};
