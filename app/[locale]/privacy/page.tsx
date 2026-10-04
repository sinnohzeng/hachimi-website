import { Footer } from "@/components/footer";
import { LegalDocument } from "@/components/legal-document";
import { BreadcrumbStructuredData } from "@/components/structured-data";
import { getTranslations } from "@/lib/i18n";
import { toLocale } from "@/lib/locale";
import { localizedPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  return localizedPageMetadata({
    locale,
    path: "/privacy",
    ...getTranslations(locale).meta.privacy,
  });
}

export default async function PrivacyPage({
  params,
}: PageProps<"/[locale]/privacy">): Promise<ReactNode> {
  const locale = toLocale((await params).locale);
  const t = getTranslations(locale);

  return (
    <>
      <BreadcrumbStructuredData
        locale={locale}
        path="/privacy"
        pageTitle={t.meta.privacy.title}
      />
      <main id="main-content" className="flex-1">
        <LegalDocument kind="privacy" locale={locale} />
      </main>
      <Footer t={t} locale={locale} />
    </>
  );
}
