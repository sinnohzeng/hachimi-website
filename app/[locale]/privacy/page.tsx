import { LegalDocument } from "@/components/legal-document";
import { SubPage, subPageMetadata } from "@/components/sub-page";
import { toLocale } from "@/lib/locale";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export function generateMetadata({
  params,
}: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  return subPageMetadata("privacy", params);
}

export default async function PrivacyPage({
  params,
}: PageProps<"/[locale]/privacy">): Promise<ReactNode> {
  const locale = toLocale((await params).locale);
  return (
    <SubPage page="privacy" locale={locale}>
      <LegalDocument kind="privacy" locale={locale} />
    </SubPage>
  );
}
