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
    path: "/privacy",
    title: t.legalMeta.privacy.title,
    description: t.legalMeta.privacy.description,
  });
}

export default async function PrivacyPage({
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
        path="/privacy"
        pageTitle={t.legalMeta.privacy.title}
      />
      <main id="main-content" className="flex-1">
        <LegalDocument kind="privacy" locale={locale} />
      </main>
      <Footer t={t} locale={locale} />
    </>
  );
}
