import { Footer } from "@/components/footer";
import { Methodology } from "@/components/methodology";
import { BreadcrumbStructuredData } from "@/components/structured-data";
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
    path: "/methodology",
    title: `${t.methodology.metaTitle} — Master Hachimi`,
    description: t.methodology.metaDescription,
  });
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
      <BreadcrumbStructuredData
        locale={locale}
        path="/methodology"
        pageTitle={t.methodology.metaTitle}
      />
      <main id="main-content" className="flex-1">
        <Methodology t={t} locale={locale} />
      </main>
      <Footer t={t} />
    </>
  );
}
