import { AcademyMarquee } from "@/components/academy-marquee";
import { CaseJourney } from "@/components/case-journey";
import { FAQ } from "@/components/faq";
import { FinalCTA } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Manifesto } from "@/components/manifesto";
import { ToolCards } from "@/components/tool-cards";
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
    // 描述取定位那一节的称呼与记忆锤：搜索结果那一行先说清给谁用，再落到一个人一份命例。
    description:
      locale === "zh"
        ? `${t.what.eyebrow}。${t.what.title}`
        : `${t.what.eyebrow}. ${t.what.title}`,
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
        {/* 七节：一句首屏 → 定位 → 一个人一份命例 → 四件工具 → 学堂 →
            常见问题 → 收尾。加节先改 spec，不在这里悄悄插。 */}
        <Hero t={t} locale={locale} />
        <Manifesto t={t} />
        <CaseJourney t={t} />
        <ToolCards t={t} />
        <AcademyMarquee t={t} locale={locale} />
        <FAQ t={t} />
        <FinalCTA t={t} locale={locale} />
      </main>
      <Footer t={t} locale={locale} />
    </>
  );
}
