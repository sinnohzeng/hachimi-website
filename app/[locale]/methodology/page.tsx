import { Footer } from "@/components/footer";
import { Methodology } from "@/components/methodology";
import { getTranslations } from "@/lib/i18n";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale);
  return {
    title: `${t.methodology.metaTitle} — Master Hachimi`,
    description: t.methodology.metaDescription,
    alternates: {
      canonical: `/${locale}/methodology`,
      languages: {
        en: "/en/methodology",
        zh: "/zh/methodology",
      },
    },
  };
}

export default async function MethodologyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<ReactNode> {
  const { locale } = await params;
  const t = getTranslations(locale);

  return (
    <>
      <main id="main-content" className="flex-1">
        <Methodology t={t} locale={locale} />
      </main>
      <Footer t={t} />
    </>
  );
}
