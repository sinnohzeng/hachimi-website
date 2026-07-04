import { FAQ } from "@/components/faq";
import { FeatureCards } from "@/components/feature-cards";
import { FeatureHighlight } from "@/components/feature-highlight";
import { FinalCTA } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Principles } from "@/components/principles";
import { ScenarioCards } from "@/components/scenario-cards";
import { Stats } from "@/components/stats";
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
    title: `Hachimi — ${t.hero.headline1} ${t.hero.headline2}`,
    description: t.hero.description,
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
        <Hero t={t} />
        <ScenarioCards t={t} />
        <FeatureCards t={t} locale={locale} />
        <FeatureHighlight t={t} locale={locale} />
        <Principles t={t} locale={locale} />
        <Stats t={t} />
        <FAQ t={t} />
        <FinalCTA t={t} />
      </main>
      <Footer t={t} />
    </>
  );
}
