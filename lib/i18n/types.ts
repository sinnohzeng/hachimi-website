import type { JOURNEY_SHOTS } from "../shots.ts";

/** 一页的 `<title>` 与 meta 描述。品牌由根上的 title.template 补，这里不写。 */
export type PageMeta = { title: string; description: string };

/** 命例走查的一步。顺序就是走查顺序，与 lib/shots.ts 的 JOURNEY_SHOTS 一一对应。 */
export type CaseStep = { title: string; body: string; shotAlt: string };

/** 与一张表等长的元组：表里有几屏，走查就有几步。 */
type StepsFor<T extends readonly unknown[]> = {
  readonly [K in keyof T]: CaseStep;
};

export type Translations = {
  // Header：四个首页锚加一个下载。
  nav: {
    case: string;
    tools: string;
    academy: string;
    faq: string;
    download: string;
  };

  /** 读屏念的控件名。版面上不出现，但读屏用户听到的就是这些字，随页面语言走。 */
  a11y: {
    skip: string;
    mainNav: string;
    mobileNav: string;
    openMenu: string;
    closeMenu: string;
    close: string;
    darkTheme: string;
  };

  // Store badges (official badge wording, used as alt text)
  store: {
    appStoreAlt: string;
    googlePlayAlt: string;
  };

  /** 各页的 `<title>` 与描述。首页标题就是首屏口号，只有描述写在这里。 */
  meta: {
    home: { description: string };
    get: PageMeta;
    support: PageMeta;
    dataDeletion: PageMeta;
    privacy: PageMeta;
    terms: PageMeta;
  };

  // 第一节 首屏：口号、过桥句、商店徽章、一张起卦结果图。
  hero: {
    headline: string;
    /** 首屏主标题按这几行断开排。连起来读与 headline 是同一句。 */
    headlineLines: string[];
    /** 口号下一行，把起卦接到命例上。定稿句 C2，真源是 hachimi-ios docs/copy-canon.md。 */
    bridge: string;
    shotAlt: string;
  };

  // 第二节 定位（#what）：先点称呼，再一句记忆锤随滚动逐字点亮，下面三件事各一张小卡。
  what: {
    /** 称呼与品类，节标题。定稿句 C3。 */
    eyebrow: string;
    /** 记忆锤。定稿句 C4。 */
    title: string;
    /** 断行写死在文案里，每行是一个不折开的块，宽屏上并排成一行。连起来读与 title 是同一句。 */
    titleLines: string[];
    items: { title: string; body: string }[];
  };

  // 第三节 命例走查（#case）：一句引言加五步，桌面端钉住手机随滚动换屏。
  case: {
    title: string;
    lead: string;
    steps: StepsFor<typeof JOURNEY_SHOTS>;
  };

  // 第四节 四件工具（#tools）：四张卡，卡面只有名字与一句，点开才见机制事实。
  tools: {
    title: string;
    /** 卡组上方那句操作提示。 */
    hint: string;
    cards: {
      name: string;
      line: string;
      /** 展开后的机制事实，出处见 https://github.com/sinnohzeng/hachimi-website/blob/archive-docs-20261006/docs/research/2026-09-22-site-v4-research.md 第三节 App 能力清单。 */
      detail: string;
    }[];
  };

  // 第五节 学堂（#academy）：一句加书名跑马灯，书名在 lib/academy-titles.ts。
  academy: {
    text: string;
  };

  // 第六节 常见问题（#faq）。
  faq: {
    title: string;
    items: {
      question: string;
      answer: string;
    }[];
    stillHaveQuestions: string;
    contact: string;
  };

  // 第七节 收尾（#download）：一句加商店徽章，底下是五张截图的扇形。
  finalCta: {
    headline: string;
  };

  /** 页脚。产品一栏由导航生成，链接地址由组件按语言拼，这里只放字。 */
  footer: {
    /** 字标下面那一句定位语。 */
    tagline: string;
    copyright: string;
    productTitle: string;
    contactTitle: string;
    support: string;
    legal: { privacy: string; terms: string; dataDeletion: string };
  };

  // 下载落地页（/{locale}/get）：/get 在微信里与桌面上落到这里。
  get: {
    title: string;
    body: string;
    /** 二维码下面那一行，只在桌面宽度出现。 */
    qrCaption: string;
    /** 只在微信里显示。 */
    wechatHint: string;
  };

  /** 认不出的网址（app/global-not-found.tsx）上的一行与回首页的链接。 */
  notFound: { body: string; home: string };

  /** 页面日期前的标签，日期本身由 lib/config.ts 的 pageDates 按语言排。 */
  lastUpdated: string;

  // 删除数据页与支持页（同一个 LegalPageContent 渲染器），标题取 meta。
  dataDeletion: LegalPage;
  support: LegalPage;
};

export type LegalPage = {
  intro: string;
  steps: {
    heading: string;
    items: string[];
  };
  /** 支持页的联系方式表。 */
  table?: {
    heading: string;
    columns: string[];
    rows: { cells: string[] }[];
  };
  /** 删除数据页的几节说明。 */
  sections?: {
    heading: string;
    content: string;
  }[];
};
