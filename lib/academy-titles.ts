import type { Locale } from "./locale.ts";

/**
 * 学堂跑马灯上跑的书名。
 *
 * 真源是 hachimi-ios 的 `App/Resources/content/academy/catalog.zh-Hans.json`。这里只挑了
 * 二十四本随包公版古籍，按山医命相卜五科分配：山 3、医 5、命 6、相 5、卜 5。
 *
 * 选书判据只有一条：作者朝代在民国之前的公版古籍。近人整理本、民国与现代作者的书
 * 一律不取（constitution §七 版权：用户可见内容不出现受版权保护著作的书名）。
 *
 * 英文页跑的是五科科名加书名拼音：英文读者认不出汉字书名，拼音至少读得出来，科名
 * 把这批书是什么一眼交代清楚。
 */

/** 五科。id 与 catalog 里的 subject id 同名。 */
type AcademySubjectId = "shan" | "yi" | "ming" | "xiang" | "bu";

type AcademySubject = {
  id: AcademySubjectId;
} & Record<Locale, string>;

const ACADEMY_SUBJECTS: readonly AcademySubject[] = [
  { id: "shan", zh: "山", en: "Mountain" },
  { id: "yi", zh: "医", en: "Medicine" },
  { id: "ming", zh: "命", en: "Fate" },
  { id: "xiang", zh: "相", en: "Physiognomy" },
  { id: "bu", zh: "卜", en: "Divination" },
];

/** 一本书：zh 是简体书名，en 是书名拼音。 */
type AcademyTitle = {
  subject: AcademySubjectId;
} & Record<Locale, string>;

const ACADEMY_TITLES: readonly AcademyTitle[] = [
  { subject: "shan", zh: "易筋经", en: "Yi Jin Jing" },
  { subject: "shan", zh: "五禽戏", en: "Wu Qin Xi" },
  {
    subject: "shan",
    zh: "十二段锦",

    en: "Shi Er Duan Jin",
  },
  { subject: "yi", zh: "本草纲目", en: "Ben Cao Gang Mu" },
  {
    subject: "yi",
    zh: "黄帝内经",

    en: "Huang Di Nei Jing",
  },
  {
    subject: "yi",
    zh: "伤寒杂病论",

    en: "Shang Han Za Bing Lun",
  },
  {
    subject: "yi",
    zh: "神农本草经",

    en: "Shen Nong Ben Cao Jing",
  },
  { subject: "yi", zh: "千金翼方", en: "Qian Jin Yi Fang" },
  {
    subject: "ming",
    zh: "渊海子平",

    en: "Yuan Hai Zi Ping",
  },
  {
    subject: "ming",
    zh: "三命通会",

    en: "San Ming Tong Hui",
  },
  {
    subject: "ming",
    zh: "滴天髓阐微",

    en: "Di Tian Sui Chan Wei",
  },
  {
    subject: "ming",
    zh: "子平真诠",

    en: "Zi Ping Zhen Quan",
  },
  {
    subject: "ming",
    zh: "穷通宝鉴",

    en: "Qiong Tong Bao Jian",
  },
  {
    subject: "ming",
    zh: "紫微斗数全书",

    en: "Zi Wei Dou Shu Quan Shu",
  },
  {
    subject: "xiang",
    zh: "麻衣神相",

    en: "Ma Yi Shen Xiang",
  },
  {
    subject: "xiang",
    zh: "柳庄神相",

    en: "Liu Zhuang Shen Xiang",
  },
  { subject: "xiang", zh: "冰鉴", en: "Bing Jian" },
  {
    subject: "xiang",
    zh: "太清神鉴",

    en: "Tai Qing Shen Jian",
  },
  { subject: "xiang", zh: "撼龙经", en: "Han Long Jing" },
  { subject: "bu", zh: "易经", en: "Yi Jing" },
  { subject: "bu", zh: "梅花易数", en: "Mei Hua Yi Shu" },
  {
    subject: "bu",
    zh: "卜筮正宗",

    en: "Bu Shi Zheng Zong",
  },
  { subject: "bu", zh: "增删卜易", en: "Zeng Shan Bu Yi" },
  { subject: "bu", zh: "六壬大全", en: "Liu Ren Da Quan" },
];

/** 跑马灯的条目：每一科先出科名，再出这一科的书名。 */
export function academyMarqueeItems(
  locale: Locale
): readonly { key: string; label: string; isSubject: boolean }[] {
  return ACADEMY_SUBJECTS.flatMap((subject) => [
    { key: `s-${subject.id}`, label: subject[locale], isSubject: true },
    ...ACADEMY_TITLES.filter((title) => title.subject === subject.id).map(
      (title) => ({
        key: `${subject.id}-${title.en}`,
        label: title[locale],
        isSubject: false,
      })
    ),
  ]);
}
