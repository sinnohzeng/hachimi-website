import { AcademyMarquee } from "@/components/academy-marquee";
import { CaseJourney } from "@/components/case-journey";
import { FAQ } from "@/components/faq";
import { FinalCTA } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Manifesto } from "@/components/manifesto";
import { Principles } from "@/components/principles";
import { RemembersReveal } from "@/components/reveal-headline";
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
    // 首屏只剩主标题，描述从定位那一节取：搜索结果那一行要说清这是个什么东西。
    description: t.what.title,
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
        {/* 九节，顺序即 spec 005 的节表：一句首屏 → 定位 → 一份命例四面都在 →
            四件工具 → 道长记得 → 学堂 → 本机 → 常见问题 → 收尾。加节先改 spec，
            不在这里悄悄插。 */}
        <Hero t={t} locale={locale} />
        <Manifesto t={t} />
        <CaseJourney t={t} />
        <ToolCards t={t} />
        <RemembersReveal t={t} />
        <AcademyMarquee t={t} locale={locale} />
        <Principles t={t} />
        <FAQ t={t} />
        <FinalCTA t={t} locale={locale} />
      </main>
      <Footer t={t} locale={locale} />
    </>
  );
}
