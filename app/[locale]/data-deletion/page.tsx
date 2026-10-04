import { Footer } from "@/components/footer";
import { LegalPageContent } from "@/components/legal-page";
import { BreadcrumbStructuredData } from "@/components/structured-data";
import { pageDates } from "@/lib/config";
import { getTranslations } from "@/lib/i18n";
import { formatDate, toLocale } from "@/lib/locale";
import { localizedPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/data-deletion">): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  return localizedPageMetadata({
    locale,
    path: "/data-deletion",
    ...getTranslations(locale).meta.dataDeletion,
  });
}

export default async function DataDeletionPage({
  params,
}: PageProps<"/[locale]/data-deletion">): Promise<ReactNode> {
  const locale = toLocale((await params).locale);
  const t = getTranslations(locale);

  return (
    <>
      <BreadcrumbStructuredData
        locale={locale}
        path="/data-deletion"
        pageTitle={t.meta.dataDeletion.title}
      />
      <main id="main-content" className="flex-1">
        <LegalPageContent
          title={t.meta.dataDeletion.title}
          updated={`${t.lastUpdated}${formatDate(locale, pageDates.dataDeletion)}`}
          data={t.dataDeletion}
        />
      </main>
      <Footer t={t} locale={locale} />
    </>
  );
}
