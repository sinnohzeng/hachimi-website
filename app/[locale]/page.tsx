import { AcademyShowcase } from "@/components/academy-showcase";
import { ChartShowcase } from "@/components/chart-showcase";
import { FAQ } from "@/components/faq";
import { FinalCTA } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Principles } from "@/components/principles";
import { Remembers } from "@/components/remembers";
import { WhatItIs } from "@/components/what-it-is";
import { FaqStructuredData } from "@/components/structured-data";
import { getTranslations } from "@/lib/i18n";
import { localizedPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale);
  return localizedPageMetadata({
    locale,
    title: t.hero.headline,
    // 首屏只剩主标题，描述从第二节的品类锚取：搜索结果那一行要说清这是个什么东西。
    description: t.whatItIs.title,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<ReactNode> {
  const { locale } = await params;
  const t = getTranslations(locale);

  return (
    <>
      <FaqStructuredData t={t} />
      <main id="main-content" className="flex-1">
        {/* 七节，顺序即 spec 001 的表：一句首屏 → 这是什么 → 道长记得 → 排一张盘
            → 学堂 → 本机算 → FAQ 与结尾。加节先改 spec，不在这里悄悄插。 */}
        <Hero t={t} locale={locale} />
        <WhatItIs t={t} />
        <Remembers t={t} />
        <ChartShowcase t={t} locale={locale} />
        <AcademyShowcase t={t} />
        <Principles t={t} />
        <FAQ t={t} />
        <FinalCTA t={t} locale={locale} />
      </main>
      <Footer t={t} locale={locale} />
    </>
  );
}
