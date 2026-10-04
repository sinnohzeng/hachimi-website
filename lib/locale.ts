/**
 * 站上的语言，一张表。路由段、`<html lang>`、hreflang、og:locale、JSON-LD 的 inLanguage、
 * 法律件文件名的语言后缀、语言切换的标签与页面日期的写法都从这里取。
 *
 * 不引 Next 模块：Pages Function（functions/）与 Node 直接跑的脚本也读它。
 */
export const LOCALES = {
  zh: { htmlLang: "zh-Hans", ogLocale: "zh_CN", label: "中文" },
  en: { htmlLang: "en", ogLocale: "en_US", label: "EN" },
} as const;

export type Locale = keyof typeof LOCALES;

export const locales = Object.keys(LOCALES) as Locale[];

/** hreflang 的 x-default，也是 Accept-Language 认不出时的去向。 */
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return Object.hasOwn(LOCALES, value);
}

/**
 * 路由入口收窄一次。`app/[locale]/layout.tsx` 关了 dynamicParams，走到页面里的段只会是
 * 表里的键，认不出即是代码错了。
 */
export function toLocale(value: string): Locale {
  if (!isLocale(value)) throw new Error(`不认识的 locale：${value}`);
  return value;
}

/**
 * 页面上的“最后更新”日期。中文按站上数字与汉字之间留空格的写法排成“2026 年 10 月 2 日”，
 * 英文是“October 2, 2026”。`iso` 是 YYYY-MM-DD，按 UTC 读，不随构建机时区漂一天。
 */
export function formatDate(locale: Locale, iso: string): string {
  const parts = new Intl.DateTimeFormat(LOCALES[locale].htmlLang, {
    dateStyle: "long",
    timeZone: "UTC",
  }).formatToParts(new Date(`${iso}T00:00:00Z`));
  if (locale === "zh") {
    return parts
      .map((part) => part.value.trim())
      .filter(Boolean)
      .join(" ");
  }
  return parts.map((part) => part.value).join("");
}
