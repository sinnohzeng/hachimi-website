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
}: PageProps<"/[locale]/support">): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  return localizedPageMetadata({
    locale,
    path: "/support",
    ...getTranslations(locale).meta.support,
  });
}

export default async function SupportPage({
  params,
}: PageProps<"/[locale]/support">): Promise<ReactNode> {
  const locale = toLocale((await params).locale);
  const t = getTranslations(locale);

  return (
    <>
      <BreadcrumbStructuredData
        locale={locale}
        path="/support"
        pageTitle={t.meta.support.title}
      />
      <main id="main-content" className="flex-1">
        <LegalPageContent
          title={t.meta.support.title}
          updated={`${t.lastUpdated}${formatDate(locale, pageDates.support)}`}
          data={t.support}
        />
      </main>
      <Footer t={t} locale={locale} />
    </>
  );
}
