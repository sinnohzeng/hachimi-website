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
}: PageProps<"/[locale]/terms">): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  return localizedPageMetadata({
    locale,
    path: "/terms",
    ...getTranslations(locale).meta.terms,
  });
}

export default async function TermsPage({
  params,
}: PageProps<"/[locale]/terms">): Promise<ReactNode> {
  const locale = toLocale((await params).locale);
  const t = getTranslations(locale);

  return (
    <>
      <BreadcrumbStructuredData
        locale={locale}
        path="/terms"
        pageTitle={t.meta.terms.title}
      />
      <main id="main-content" className="flex-1">
        <LegalDocument kind="terms" locale={locale} />
      </main>
      <Footer t={t} locale={locale} />
    </>
  );
}
