import { Footer } from "@/components/footer";
import { LegalPageContent } from "@/components/legal-page";
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
    path: "/data-deletion",
    title: t.dataDeletion.title,
    description:
      locale === "zh"
        ? "在 App 里删除命例、卦历和道长记下的要点。"
        : "Delete your cases, reading history and the Master's notes in the app.",
  });
}

export default async function DataDeletionPage({
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
        path="/data-deletion"
        pageTitle={t.dataDeletion.title}
      />
      <main id="main-content" className="flex-1">
        <LegalPageContent data={t.dataDeletion} />
      </main>
      <Footer t={t} locale={locale} />
    </>
  );
}
