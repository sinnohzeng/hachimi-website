import { LegalPageContent } from "@/components/legal-page";
import { SubPage, subPageMetadata } from "@/components/sub-page";
import { toLocale } from "@/lib/locale";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export function generateMetadata({
  params,
}: PageProps<"/[locale]/data-deletion">): Promise<Metadata> {
  return subPageMetadata("dataDeletion", params);
}

export default async function DataDeletionPage({
  params,
}: PageProps<"/[locale]/data-deletion">): Promise<ReactNode> {
  const locale = toLocale((await params).locale);
  return (
    <SubPage page="dataDeletion" locale={locale}>
      <LegalPageContent page="dataDeletion" locale={locale} />
    </SubPage>
  );
}
