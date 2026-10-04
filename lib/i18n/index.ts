import { locales, type Locale } from "../locale.ts";
import { en } from "./en.ts";
import { zh } from "./zh.ts";
import type { Translations } from "./types.ts";

const translations: Record<Locale, Translations> = { en, zh };

export function getTranslations(locale: Locale): Translations {
  return translations[locale];
}

export function generateStaticParams(): { locale: Locale }[] {
  return locales.map((locale) => ({ locale }));
}

export type { Translations };
