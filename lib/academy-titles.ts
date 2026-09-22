/**
 * 学堂跑马灯上跑的书名。
 *
 * 真源是 hachimi-ios 的 `App/Resources/content/academy/catalog.zh-Hans.json` 与
 * `catalog.zh-Hant.json`，两份按书的 id 一一对应，繁体名直接取自后者。这里只挑了
 * 二十四本随包公版古籍，按山医命相卜五科分配：山 3、医 5、命 6、相 5、卜 5。
 *
 * 选书判据只有一条：作者朝代在民国之前的公版古籍。近人整理本、民国与现代作者的书
 * 一律不取（constitution §七 版权：用户可见内容不出现受版权保护著作的书名）。
 *
 * 英文页跑的是五科科名加书名拼音：英文读者认不出汉字书名，拼音至少读得出来，科名
 * 把这批书是什么一眼交代清楚。
 */

/** 五科。id 与 catalog 里的 subject id 同名。 */
export type AcademySubjectId = "shan" | "yi" | "ming" | "xiang" | "bu";

export type AcademySubject = {
  id: AcademySubjectId;
  hans: string;
  hant: string;
  en: string;
};

export const ACADEMY_SUBJECTS: readonly AcademySubject[] = [
  { id: "shan", hans: "山", hant: "山", en: "Mountain" },
  { id: "yi", hans: "医", hant: "醫", en: "Medicine" },
  { id: "ming", hans: "命", hant: "命", en: "Fate" },
  { id: "xiang", hans: "相", hant: "相", en: "Physiognomy" },
  { id: "bu", hans: "卜", hant: "卜", en: "Divination" },
];

export type AcademyTitle = {
  subject: AcademySubjectId;
  hans: string;
  hant: string;
  /** 书名拼音，英文页用。 */
  en: string;
};

export const ACADEMY_TITLES: readonly AcademyTitle[] = [
  { subject: "shan", hans: "易筋经", hant: "易筋經", en: "Yi Jin Jing" },
  { subject: "shan", hans: "五禽戏", hant: "五禽戲", en: "Wu Qin Xi" },
  {
    subject: "shan",
    hans: "十二段锦",
    hant: "十二段錦",
    en: "Shi Er Duan Jin",
  },
  { subject: "yi", hans: "本草纲目", hant: "本草綱目", en: "Ben Cao Gang Mu" },
  {
    subject: "yi",
    hans: "黄帝内经",
    hant: "黃帝內經",
    en: "Huang Di Nei Jing",
  },
  {
    subject: "yi",
    hans: "伤寒杂病论",
    hant: "傷寒雜病論",
    en: "Shang Han Za Bing Lun",
  },
  {
    subject: "yi",
    hans: "神农本草经",
    hant: "神農本草經",
    en: "Shen Nong Ben Cao Jing",
  },
  { subject: "yi", hans: "千金翼方", hant: "千金翼方", en: "Qian Jin Yi Fang" },
  {
    subject: "ming",
    hans: "渊海子平",
    hant: "淵海子平",
    en: "Yuan Hai Zi Ping",
  },
  {
    subject: "ming",
    hans: "三命通会",
    hant: "三命通會",
    en: "San Ming Tong Hui",
  },
  {
    subject: "ming",
    hans: "滴天髓阐微",
    hant: "滴天髓闡微",
    en: "Di Tian Sui Chan Wei",
  },
  {
    subject: "ming",
    hans: "子平真诠",
    hant: "子平真詮",
    en: "Zi Ping Zhen Quan",
  },
  {
    subject: "ming",
    hans: "穷通宝鉴",
    hant: "窮通寶鑑",
    en: "Qiong Tong Bao Jian",
  },
  {
    subject: "ming",
    hans: "紫微斗数全书",
    hant: "紫微斗數全書",
    en: "Zi Wei Dou Shu Quan Shu",
  },
  {
    subject: "xiang",
    hans: "麻衣神相",
    hant: "麻衣神相",
    en: "Ma Yi Shen Xiang",
  },
  {
    subject: "xiang",
    hans: "柳庄神相",
    hant: "柳莊神相",
    en: "Liu Zhuang Shen Xiang",
  },
  { subject: "xiang", hans: "冰鉴", hant: "冰鑑", en: "Bing Jian" },
  {
    subject: "xiang",
    hans: "太清神鉴",
    hant: "太清神鑑",
    en: "Tai Qing Shen Jian",
  },
  { subject: "xiang", hans: "撼龙经", hant: "撼龍經", en: "Han Long Jing" },
  { subject: "bu", hans: "易经", hant: "易經", en: "Yi Jing" },
  { subject: "bu", hans: "梅花易数", hant: "梅花易數", en: "Mei Hua Yi Shu" },
  {
    subject: "bu",
    hans: "卜筮正宗",
    hant: "卜筮正宗",
    en: "Bu Shi Zheng Zong",
  },
  { subject: "bu", hans: "增删卜易", hant: "增刪卜易", en: "Zeng Shan Bu Yi" },
  { subject: "bu", hans: "六壬大全", hant: "六壬大全", en: "Liu Ren Da Quan" },
];

/**
 * 跑马灯的条目：每一科先出科名，再出这一科的书名。
 *
 * 站上只有 zh 与 en 两个 locale，繁体那一份留在数据里备用：iOS 侧三语齐备，官网哪天
 * 加 zh-Hant 时不必再回 catalog 取一遍。
 */
export function academyMarqueeItems(
  locale: string
): readonly { key: string; label: string; isSubject: boolean }[] {
  const field = locale === "en" ? "en" : "hans";
  return ACADEMY_SUBJECTS.flatMap((subject) => [
    { key: `s-${subject.id}`, label: subject[field], isSubject: true },
    ...ACADEMY_TITLES.filter((title) => title.subject === subject.id).map(
      (title) => ({
        key: `${subject.id}-${title.en}`,
        label: title[field],
        isSubject: false,
      })
    ),
  ]);
}
