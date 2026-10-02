import type { Translations } from "./types";

export const zh: Translations = {
  nav: {
    case: "命例",
    tools: "工具",
    academy: "学堂",
    faq: "常见问题",
    download: "下载 App",
  },
  langSwitch: {
    en: "EN",
    zh: "中文",
  },

  store: {
    appStoreAlt: "在 App Store 下载",
    googlePlayAlt: "下载应用，请到 Google Play",
  },

  hero: {
    headline: "慌的时候，先起一卦。",
    headlineLines: ["慌的时候，", "先起一卦。"],
    bridge: "这一卦为谁问，就记在谁名下。",
    shotAlt: "哈基米道长的起卦结果页截图，这一卦是吉，卦象在上，解读在下。",
  },

  what: {
    eyebrow: "给命理师和命理爱好者用的排盘工具",
    title: "一个人，一份命例。",
    titleLines: ["一个人，一份命例。"],
    items: [
      {
        title: "录一次生辰，两张盘一起出",
        body: "紫微斗数和八字排在同一份命例上，用的是同一个真太阳时。",
      },
      {
        title: "点开这一位，盘和卦都在",
        body: "两张盘都在这份命例里，起过的每一卦和事后补记的结局按时间排着。用得越久，这一份越厚。",
      },
      {
        title: "紫微三种盘式，八字看到六柱",
        body: "三合、飞星、四化随手切；八字四柱之外，还有带大运流年的六柱细盘。",
      },
    ],
  },

  case: {
    title: "有人报来一个生辰",
    lead: "客户、家人、朋友，或者你自己。录下来，就是一份命例。",
    steps: [
      {
        title: "建一份命例",
        body: "公历、农历、四柱都能录，出生地选到省市。",
      },
      {
        title: "排出紫微",
        body: "录完就是一张紫微盘。",
      },
      {
        title: "切到八字",
        body: "同一份生辰，不用再录一遍。",
      },
      {
        title: "为这个人起一卦",
        body: "问事时选好为谁问，卦和解读都记在这份命例名下。",
      },
      {
        title: "回看名下每一卦",
        body: "问过的事按时间排好，点开就是当时那一卦。",
      },
    ],
    shotAlts: [
      "命例列表截图，每行右侧直接显示四柱，按五行上色。",
      "紫微斗数三合盘截图，十二宫与三方四正。",
      "八字四柱表截图，年月日时四柱逐行排到纳音与神煞。",
      "起卦结果页截图，这一卦是吉。",
      "命例详情截图，名下每一卦按时间倒序列着。",
    ],
  },

  tools: {
    title: "四件工具",
    hint: "点开一张卡看细节。",
    cards: [
      {
        name: "紫微斗数",
        line: "安星按你的派别逐项调，贴一串安星码就和别人的盘对上。",
        detail:
          "格局按规则判，写明出自哪一层，要联网。紫占排盘在“我的 → 工具”里。长按盘上的字出词条。",
      },
      {
        name: "八字排盘",
        line: "原局和岁运的刑冲合害分开列，排完盘在同一页记断事笔记。",
        detail: "四柱从主星排到神煞，人元司令可选。四柱反查在“我的 → 工具”里。",
      },
      {
        name: "命例库",
        line: "命例多了，按分组、日主一筛就到。",
        detail:
          "还能按性别、生肖、出生年代筛。单条命例可以发给别人，对方点开就合进自己的库。",
      },
      {
        name: "梅花易数起卦",
        line: "报两个数字起一卦，道长再写一段解读。",
        detail:
          "本卦、互卦、变卦和体用在同一屏，相同的数字与时辰起出同一卦。不写问题也能起卦。",
      },
    ],
  },

  academy: {
    text: "断语要找出处，古籍就在 App 里，按五科分好，没网也翻得开。",
  },

  faq: {
    title: "常见问题",
    items: [
      {
        question: "真太阳时怎么算？",
        answer:
          "按出生地的经度和均时差折算。出生地选到省市，或直接填经度；海外出生的可以选时区。夏令时、闰月、晚子时、换节气，盘上会标出来。",
      },
      {
        question: "能和我现在用的盘对上吗？",
        answer: "能调成一样的。安星按派别逐项调，晚子时和年柱分界也能选。",
      },
      {
        question: "要联网吗？",
        answer:
          "排盘不用，已有命例飞行模式也能出盘。按省市选出生地要联网，解读、格局分析、紫占和四柱反查也要。解读每天有次数，由第三方 AI 服务写成。",
      },
      {
        question: "换了手机，命例还在吗？",
        answer:
          "在。iPhone 和 iPad 走 iCloud 同步，Android 随系统备份；两端都能把命例导出成文件。",
      },
      {
        question: "刚开始学，用得上吗？",
        answer:
          "用得上。盘上长按一个字就出词条，学堂里有古籍原文，起卦后道长会写一段解读。",
      },
    ],
    stillHaveQuestions: "还有别的想问？",
    contact: "联系哈基米道长",
  },

  finalCta: {
    headline: "装上哈基米道长，把第一份命例录进来。",
  },

  footer: {
    tagline: "中国民俗术数的学习与研究工具",
    copyright: "© 2026 Hachimi.ai　保留所有权利",
    links: [
      {
        title: "产品",
        items: [
          { label: "命例", href: "/zh#case" },
          { label: "工具", href: "/zh#tools" },
          { label: "学堂", href: "/zh#academy" },
          { label: "常见问题", href: "/zh#faq" },
        ],
      },
      {
        title: "联系",
        items: [
          { label: "支持与帮助", href: "/zh/support" },
          { label: "voice@hachimi.ai", href: "mailto:voice@hachimi.ai" },
        ],
      },
    ],
    legal: [
      { label: "隐私政策", href: "/zh/privacy" },
      { label: "使用条款", href: "/zh/terms" },
      { label: "删除数据", href: "/zh/data-deletion" },
    ],
  },

  get: {
    title: "下载哈基米道长",
    body: "iPhone 与 iPad 在 App Store 下载，Android 手机在 Google Play 下载。",
    qrCaption: "用手机扫码下载",
    wechatHint: "微信里打不开应用商店，点右上角“…”，选“在浏览器打开”。",
  },

  legalMeta: {
    privacy: {
      title: "隐私政策",
      description:
        "哈基米道长隐私政策：命例和卦历存在哪里，哪些功能要联网，怎么管理和删除。",
    },
    terms: {
      title: "使用条款",
      description: "哈基米道长使用条款：功能、解读、会员订阅和许可。",
    },
  },

  dataDeletion: {
    title: "删除你的数据",
    effectiveDate: "最后更新：2026 年 10 月 2 日",
    intro: "命例、卦历和道长记下的要点存在你的设备上，在 App 里就能删。",
    steps: {
      heading: "在 App 里删除",
      items: [
        "打开哈基米道长，进“我的 → 隐私与数据”。",
        "点“删除全部问事数据”并确认，卦历、草稿和道长记下的要点全部清空。iOS 版开着 iCloud 同步时，其他设备上的也会删掉。",
        "命例在命例库里逐位删除。",
        "使用统计带一个随机标识，点“重置匿名标识”就换一个新的。",
        "不想再用在线解读，在同一页打开“隐私政策”，点页底的“停用在线解读”。",
      ],
    },
    sections: [
      {
        heading: "备份里的副本",
        content:
          "iCloud 和系统备份里的副本，在手机的系统设置里管理，卸载 App 不会删掉它们。",
      },
      {
        heading: "服务器上的记录",
        content:
          "在线解读的问事记录在我们的服务器上保存一段时间后删除。删除时遇到问题，写信到 voice@hachimi.ai。",
      },
      {
        heading: "联系方式",
        content: "元竹投資有限公司，香港。邮箱 voice@hachimi.ai。",
      },
    ],
  },

  support: {
    title: "支持与帮助",
    effectiveDate: "最后更新：2026 年 10 月 2 日",
    intro: "用着遇到问题，或者想说点什么，写封邮件来就好。",
    steps: {
      heading: "先看看这几条",
      items: [
        "支持哪些设备？iPhone 要 iOS 26 及以上，iPad 要 iPadOS 26 及以上，Android 手机要 Android 16 及以上。界面有简体中文、繁体中文和英文。",
        "解读出不来？先看看网络和当天的次数。第一次用在线解读，要先点“同意并开启在线解读”；之前选了暂不使用，下次问事时可以重新选。",
        "想换语言？在“我的 → 语言”里选。",
        "想删除数据？问事数据在“我的 → 隐私与数据”里点“删除全部问事数据”，命例在命例库里逐位删除。",
        "换了手机？iPhone 和 iPad 登录同一个 iCloud 会自动同步；Android 从系统备份恢复，或者导入之前导出的备份文件。",
      ],
    },
    table: {
      heading: "联系我们",
      columns: ["渠道", "地址", "通常回复时长"],
      rows: [{ cells: ["邮箱", "voice@hachimi.ai", "3 个工作日内"] }],
    },
  },
};
