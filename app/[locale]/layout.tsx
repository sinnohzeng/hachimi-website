import { Header } from "@/components/header";
import { Providers } from "@/components/providers";
import { SkipToContent } from "@/components/skip-to-content";
import { SiteStructuredData } from "@/components/structured-data";
import { ThemeSwitch } from "@/components/theme-switch";
import { generateStaticParams as genParams, getTranslations } from "@/lib/i18n";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import type { ReactNode } from "react";
import "../globals.css";

export { genParams as generateStaticParams };

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} bg-background text-foreground flex min-h-screen flex-col font-sans antialiased`}
      >
        <SiteStructuredData locale={locale} />
        <Providers>
          <SkipToContent />
          <Header locale={locale} t={t} />
          <ThemeSwitch />
          {children}
        </Providers>
      </body>
    </html>
  );
}
