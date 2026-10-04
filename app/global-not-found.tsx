import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import type { ReactNode } from "react";
import { siteConfig } from "@/lib/config";
import { getTranslations } from "@/lib/i18n";
import { LOCALES, locales } from "@/lib/locale";
import "./globals.css";

/** robots 由 Next 给 404 自动写 noindex，这里不再写一条。 */
export const metadata: Metadata = {
  title: `404 | ${siteConfig.seoTitle}`,
};

/**
 * 认不出的网址：一整份文档，不知道访客读哪种语言，所以每种语言各给一行与回首页的链接，
 * 各自标 lang。明暗跟系统走（globals.css 的 light-dark）。
 */
export default function GlobalNotFound(): ReactNode {
  return (
    <html lang={LOCALES.zh.htmlLang}>
      <body
        className={`${GeistSans.variable} bg-background text-foreground flex min-h-screen flex-col items-center justify-center gap-10 px-6 font-sans antialiased`}
      >
        <p className="font-serif text-6xl font-medium">404</p>
        <main id="main-content" className="flex flex-col gap-6 text-center">
          {locales.map((locale) => {
            const t = getTranslations(locale);
            return (
              <p key={locale} lang={LOCALES[locale].htmlLang}>
                <span className="text-foreground/70 block">
                  {t.notFound.body}
                </span>
                <a
                  href={`/${locale}`}
                  hrefLang={LOCALES[locale].htmlLang}
                  className="text-accent mt-2 inline-block font-medium underline-offset-4 hover:underline"
                >
                  {t.notFound.home}
                </a>
              </p>
            );
          })}
        </main>
      </body>
    </html>
  );
}
