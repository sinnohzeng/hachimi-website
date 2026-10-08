import { LegalDocument } from "@/components/legal-document";
import { SubPage, subPageMetadata } from "@/components/sub-page";
import { toLocale } from "@/lib/locale";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export function generateMetadata({
  params,
}: PageProps<"/[locale]/terms">): Promise<Metadata> {
  return subPageMetadata("terms", params);
}

export default async function TermsPage({
  params,
}: PageProps<"/[locale]/terms">): Promise<ReactNode> {
  const locale = toLocale((await params).locale);
  return (
    <SubPage page="terms" locale={locale}>
      <LegalDocument kind="terms" locale={locale} />
    </SubPage>
  );
}
