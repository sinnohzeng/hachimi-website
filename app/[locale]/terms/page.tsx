import { Footer } from "@/components/footer";
import { LegalDocument } from "@/components/legal-document";
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
    path: "/terms",
    title: t.legalMeta.terms.title,
    description: t.legalMeta.terms.description,
  });
}

export default async function TermsPage({
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
        path="/terms"
        pageTitle={t.legalMeta.terms.title}
      />
      <main id="main-content" className="flex-1">
        <LegalDocument kind="terms" locale={locale} />
      </main>
      <Footer t={t} locale={locale} />
    </>
  );
}
