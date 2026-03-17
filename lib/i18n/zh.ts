import type { Translations } from "./types";

export const zh: Translations = {
  nav: {
    features: "功能",
    tech: "技术栈",
    download: "下载",
  },
  langSwitch: {
    en: "EN",
    zh: "中文",
  },

  hero: {
    badge: "v2.37.0 — 已上架 Google Play",
    headline1: "多一点觉察。",
    headline2: "好一点生活。",
    description:
      "每天 5 分钟——这是一天中最安静、最属于你的时刻。记录一点光、卸载烦恼、保持专注，看猫咪回应你的心情。门槛低到不需要「坚持」二字。",
    ctaDownload: "下载 APK",
    ctaGooglePlay: "Google Play",
    ctaSource: "查看源码",
    securityBadge: "隐私优先，AI 功能可选且需主动启用",
  },

  featureCards: {
    title: "你需要的一切",
    subtitle: "让觉知成为日常",
    cards: [
      {
        title: "30 秒，记录今天的觉察",
        description:
          "每晚记录一点光——选择心情、写一句话、标记今天重要的事。写下来，本身就是在给大脑减负。周回顾和烦恼追踪，帮你保持觉知。",
      },
      {
        title: "专注完成，觉知开始",
        description:
          "倒计时和正计时模式，前台服务持久运行。专注结束后自动弹出一点光录入——闭合专注到觉知的飞轮。",
      },
      {
        title: "猫咪感应你的心情",
        description:
          "你的伙伴会根据心情做出 5 种独特反应。15 种花纹、19 种颜色、6 种性格——每只猫都陪你一起成长。",
      },
    ],
  },

  featureHighlight: {
    title1: "认识你的伙伴，",
    title2: "陪伴它成长",
    description:
      "每只猫咪都有独特的性格、心情和成长阶段。当你每天多觉察一点，你的伙伴也在进化——它是你内在旅程的生动映射。",
    features: [
      "觉知飞轮 — 专注完成 → 记录一点光 → 猫咪心情感应",
      "AI 猫咪聊天 — 用猫咪独特的性格和你对话",
      "108+ 配饰，商店中 5 档定价",
    ],
    cta: "探索功能",
    phonePlaceholder: "猫咪伙伴详情页",
  },

  principles: {
    badge: "为什么选择 Hachimi？",
    title1: "觉知在生长，",
    title2: "一天一点光",
    description:
      "习惯不是靠意志力硬扛出来的，而是靠设计「养」出来的。门槛低到不需要「坚持」二字——睡前 5 分钟就好。当猫咪回应你的心情、当反思在周与月间积累，觉知就自然发生了。",
    cta: "下载 Android 版",
    cards: [
      "觉知驱动",
      "隐私优先设计",
      "离线可用",
      "精美设计",
    ],
  },

  stats: {
    items: [
      { label: "猫咪品种" },
      { label: "配饰道具" },
      { label: "支持语言" },
      { label: "成就挑战" },
    ],
  },

  faq: {
    title: "常见问题",
    subtitle: "关于 Hachimi 你需要知道的一切。",
    items: [
      {
        question: "觉知功能是什么？",
        answer:
          "每晚花 30 秒记录一点光——选择心情、写一句话、标记今天重要的事。周回顾记录三个幸福时刻和学习心得，烦恼处理器把烦恼从脑袋里卸载出来，月初仪式设定重点习惯。你的猫咪会根据心情做出独特的动画反应，让自我觉察变得生动有趣。",
      },
      {
        question: "我的数据安全吗？",
        answer:
          "所有数据存储在 Firebase 中，并设有严格的安全规则。AI 功能是可选的——启用后，聊天消息会发送到云端 AI 供应商（MiniMax 或 Google Gemini）进行处理。首次使用前会显示隐私声明。你可以随时删除账号和所有关联数据。",
      },
      {
        question: "Hachimi 有 iOS 版吗？",
        answer:
          "目前 Hachimi 仅支持 Android，可从 GitHub 直接下载 APK 安装，也已上架 Google Play。iOS 版本已列入未来计划。代码使用 Flutter 构建，跨平台部署在技术上已准备就绪。",
      },
      {
        question: "Hachimi 是开源的吗？",
        answer:
          "源代码以作品集和参考目的在 GitHub 上公开。但未授权用于再分发或商业用途。完整条款请参阅 LICENSE 文件。",
      },
      {
        question: "AI 聊天是如何运作的？",
        answer:
          "Hachimi 连接云端 AI 供应商——你可以在设置中选择 MiniMax 或 Google Gemini。猫咪会以个性化语气实时生成回复。AI 功能完全可选，默认关闭。",
      },
      {
        question: "需要付费吗？",
        answer:
          "Hachimi 完全免费。没有应用内购买、没有广告、没有订阅费用。所有功能——包括觉知工具、专注计时、猫咪伙伴和 AI 聊天——全部免费。应用内的金币经济通过专注和每日签到赚取。",
      },
    ],
    stillHaveQuestions: "还有其他问题？",
    contact: "查看 GitHub 文档",
  },

  finalCta: {
    headline: "准备好遇见你的第一只猫了吗？",
    cta: "下载 Android 版",
  },

  footer: {
    copyright: `\u00A9 2025\u20132026 Zixuan Zeng. All Rights Reserved.`,
    links: [
      {
        title: "产品",
        items: [
          { label: "功能", href: "#features" },
          { label: "技术栈", href: "#tech" },
          { label: "常见问题", href: "#faq" },
        ],
      },
      {
        title: "开发者",
        items: [
          { label: "GitHub", href: "https://github.com/sinnohzeng/hachimi-app" },
          { label: "文档", href: "https://github.com/sinnohzeng/hachimi-app/tree/main/docs" },
          { label: "更新日志", href: "https://github.com/sinnohzeng/hachimi-app/blob/main/CHANGELOG.md" },
        ],
      },
      {
        title: "链接",
        items: [
          { label: "个人网站", href: "https://zixuan.net" },
          { label: "官网源码", href: "https://github.com/sinnohzeng/hachimi-app-website" },
        ],
      },
    ],
    legal: [
      { label: "隐私政策", href: "/zh/privacy" },
      { label: "删除账号", href: "/zh/account-deletion" },
      { label: "删除数据", href: "/zh/data-deletion" },
      { label: "许可证", href: "https://github.com/sinnohzeng/hachimi-app/blob/main/LICENSE" },
    ],
  },

  privacy: {
    title: "隐私政策",
    effectiveDate: "生效日期：2026 年 2 月 23 日",
    sections: [
      {
        heading: "简介",
        content:
          "Hachimi（以下简称「我们」或「本应用」）是一款由 Zixuan Zeng 开发的习惯养成应用，附带虚拟猫咪陪伴功能。本隐私政策说明我们在你使用 Hachimi 时如何收集、使用和保护你的信息。使用本应用即表示你同意本政策中描述的做法。",
      },
      {
        heading: "我们收集的信息",
        content:
          "账号信息：注册账号时，我们通过 Firebase Authentication 收集你的邮箱地址和显示名称。\n\n习惯和专注数据：你的习惯、专注记录、任务进度、猫咪伙伴、金币和道具存储在 Cloud Firestore 中，用于支撑核心应用体验。\n\nAI 聊天内容（可选）：如果你启用了 AI 功能，与猫咪的聊天消息和日记生成请求会发送到云端 AI 供应商（MiniMax 或 Google Gemini，取决于你的选择）进行处理。AI 功能默认关闭，启用前需阅读并确认隐私声明。\n\n设备和使用数据：我们自动收集崩溃报告（Firebase Crashlytics）、应用使用事件（Firebase Analytics）、性能数据（Firebase Performance）和推送通知令牌（Firebase Cloud Messaging），以改善应用体验。",
      },
      {
        heading: "我们如何使用你的信息",
        content:
          "我们使用收集的信息用于：\n\n\u2022 提供和维护核心习惯养成和养猫体验\n\u2022 生成 AI 猫咪聊天回复和日记内容（启用时）\n\u2022 发送习惯提醒推送通知（启用时）\n\u2022 分析应用使用模式和修复崩溃\n\u2022 监控应用性能和提升稳定性",
      },
      {
        heading: "第三方服务",
        content:
          "我们与以下第三方服务共享数据：\n\nGoogle Firebase：身份验证、Cloud Firestore（数据存储）、Analytics、Crashlytics（崩溃报告）、Performance Monitoring、Cloud Messaging（推送通知）和 Remote Config。Google 的隐私政策适用于 Firebase 处理的数据。\n\nMiniMax（可选）：如果你选择 MiniMax 作为 AI 供应商，聊天消息会发送到 MiniMax 的 API 生成回复。MiniMax 的隐私政策适用于这些数据。\n\nGoogle Gemini（可选）：如果你选择 Gemini 作为 AI 供应商，聊天消息会发送到 Google 的 Gemini API 生成回复。Google 的 AI 隐私条款适用。\n\n我们不出售你的个人数据。我们不使用第三方广告服务。",
      },
      {
        heading: "数据安全",
        content:
          "所有数据在传输过程中使用 TLS/HTTPS 加密。Cloud Firestore 对静态数据进行加密。Firebase 安全规则限制数据访问，确保已验证用户只能访问自己的文档。AI 供应商的 API 密钥在构建时注入，不会以明文形式存储在设备上。",
      },
      {
        heading: "你的权利",
        content:
          "访问和导出：你可以在应用内查看所有数据（习惯、专注记录、猫咪、金币、聊天历史）。\n\n删除：你可以通过应用的账号删除流程删除账号和所有关联数据（设置 → 账号 → 删除账号）。这将永久移除你的身份验证记录和所有 Firestore 数据。\n\n退出：AI 功能可以随时在设置中关闭。推送通知可以通过设备系统设置管理。",
      },
      {
        heading: "儿童隐私",
        content:
          "Hachimi 不面向 13 岁以下儿童设计或提供服务。我们不会故意收集 13 岁以下儿童的个人信息。如果你认为有 13 岁以下的儿童向我们提供了个人信息，请联系我们以便采取适当措施。",
      },
      {
        heading: "政策变更",
        content:
          "我们可能会不时更新本隐私政策。变更将在本页面反映，并更新生效日期。我们建议你定期查看本政策。",
      },
      {
        heading: "联系方式",
        content:
          "如果你对本隐私政策或你的数据有任何疑问，请通过以下方式联系我们：\n\n网站：https://hachimi.ai\nGitHub：https://github.com/sinnohzeng/hachimi-app",
      },
    ],
  },

  accountDeletion: {
    title: "删除你的账号",
    effectiveDate: "生效日期：2026 年 2 月 23 日",
    intro:
      "Hachimi 由 Zixuan Zeng 开发，允许你在应用内永久删除账号和所有关联数据。本页面说明如何请求删除账号以及哪些数据会受到影响。",
    steps: {
      heading: "如何删除账号",
      items: [
        "打开 Hachimi，点击个人头像，然后点击设置。",
        "点击账号，然后点击删除账号。",
        "查看数据摘要，确认你的任务数量、猫咪数量和累计专注时长。",
        "输入「DELETE」确认，然后使用 Google 账号重新验证身份。",
      ],
    },
    dataTable: {
      heading: "删除和保留的数据",
      columns: ["数据类型", "是否删除", "保留期限"],
      rows: [
        { cells: ["账号（邮箱、显示名称）", "是", "立即删除"] },
        { cells: ["任务和专注记录", "是", "立即删除"] },
        { cells: ["猫咪伙伴和道具", "是", "立即删除"] },
        { cells: ["成就", "是", "立即删除"] },
        { cells: ["签到历史", "是", "立即删除"] },
        { cells: ["用户资料（金币、设置）", "是", "立即删除"] },
        { cells: ["AI 聊天消息和日记（本地）", "是", "立即删除"] },
        { cells: ["应用偏好设置（本地）", "是", "立即删除"] },
        { cells: ["崩溃报告（Firebase Crashlytics）", "否", "最长 90 天（由 Google 管理）"] },
        { cells: ["分析事件（Firebase Analytics）", "否", "按 Google 数据保留政策"] },
      ],
    },
    sections: [
      {
        heading: "删除后会发生什么",
        content:
          "账号删除是永久且不可逆的。确认后，以下操作将自动执行：\n\n\u2022 你的 Firebase 身份验证记录将被删除\n\u2022 你在 Cloud Firestore 中的所有数据将被永久移除，包括任务、专注记录、猫咪伙伴、成就、签到历史、金币和道具\n\u2022 设备上的本地数据将被清除，包括 AI 聊天历史、日记内容、应用偏好设置和计划中的通知\n\u2022 你将被登出并返回登录页面\n\n删除后，你将无法恢复账号或任何关联数据。",
      },
      {
        heading: "第三方数据保留",
        content:
          "Google Firebase 服务（Crashlytics、Analytics、Performance Monitoring）收集的部分匿名化或聚合数据可能由 Google 按其数据保留政策保留。这些数据由 Google 管理，Hachimi 无法直接删除。更多信息请参阅 Google 隐私政策。",
      },
      {
        heading: "其他选项",
        content:
          "在删除账号之前，你可以考虑以下替代方案：\n\n\u2022 停用 AI 功能：前往设置关闭 AI 聊天，停止向云端 AI 供应商发送数据\n\u2022 管理通知：通过设备系统设置关闭推送通知\n\n这些选项让你可以在减少数据共享的情况下继续使用 Hachimi。",
      },
      {
        heading: "联系方式",
        content:
          "如果你对账号删除有任何疑问或需要帮助，请通过以下方式联系我们：\n\n网站：https://hachimi.ai\nGitHub：https://github.com/sinnohzeng/hachimi-app",
      },
    ],
  },

  dataDeletion: {
    title: "删除你的数据",
    effectiveDate: "生效日期：2026 年 2 月 23 日",
    intro:
      "Hachimi 由 Zixuan Zeng 开发，允许你通过删除账号来删除所有个人数据。删除账号时，所有关联数据将被永久移除。Hachimi 目前不支持选择性数据删除——删除账号将移除所有数据。",
    steps: {
      heading: "如何删除数据",
      items: [
        "打开 Hachimi，点击个人头像，然后点击设置。",
        "点击账号，然后点击删除账号。",
        "查看数据摘要，确认你的任务数量、猫咪数量和累计专注时长。",
        "输入「DELETE」确认，然后使用 Google 账号重新验证身份。",
      ],
    },
    dataTable: {
      heading: "删除和保留的数据类型",
      columns: ["数据类型", "包含内容", "是否删除"],
      rows: [
        { cells: ["账号信息", "Google 登录的邮箱地址和显示名称", "是，立即删除"] },
        { cells: ["任务", "任务名称、目标、目标时长、截止日期、提醒和备忘", "是，立即删除"] },
        { cells: ["专注记录", "开始/结束时间、时长、获得的 XP 和金币、计时模式", "是，立即删除"] },
        { cells: ["猫咪伙伴", "名称、外观、性格、成长阶段、装备的配饰", "是，立即删除"] },
        { cells: ["成就", "已解锁的成就和解锁时间", "是，立即删除"] },
        { cells: ["签到历史", "每月签到记录和里程碑数据", "是，立即删除"] },
        { cells: ["用户资料", "金币余额、道具库存、头像、推送通知令牌", "是，立即删除"] },
        { cells: ["AI 聊天和日记", "与猫咪的聊天记录和自动生成的日记内容（存储在本地）", "是，立即删除"] },
        { cells: ["应用偏好设置", "设置项、AI 开关状态、已选择的 AI 供应商（存储在本地）", "是，立即删除"] },
        { cells: ["崩溃报告", "Firebase Crashlytics 收集的堆栈追踪和设备信息", "否，最长 90 天"] },
        { cells: ["分析事件", "Firebase Analytics 收集的使用模式和页面浏览", "否，按 Google 政策"] },
      ],
    },
    sections: [
      {
        heading: "云端数据与本地数据",
        content:
          "你的数据存储在两个位置：\n\n\u2022 云端（Firebase）：账号信息、任务、专注记录、猫咪、成就、签到历史和用户资料存储在 Google Cloud Firestore 中。删除账号时，这些数据将从服务器上永久删除。\n\n\u2022 本地（设备）：AI 聊天消息、日记内容、应用偏好设置和计划中的通知存储在你的设备上。这些数据将在删除流程中被清除。\n\n云端和本地数据都会在账号删除流程中被移除。",
      },
      {
        heading: "第三方数据保留",
        content:
          "崩溃报告（Firebase Crashlytics）、分析事件（Firebase Analytics）和性能数据（Firebase Performance Monitoring）由 Google 收集和管理。这些数据可能由 Google 保留最长 90 天或按 Google 的数据保留政策保留。Hachimi 无法直接删除这些数据。更多信息请参阅 Google 隐私政策。",
      },
      {
        heading: "联系方式",
        content:
          "如果你对数据删除有任何疑问或需要帮助，请通过以下方式联系我们：\n\n网站：https://hachimi.ai\nGitHub：https://github.com/sinnohzeng/hachimi-app",
      },
    ],
  },
};
