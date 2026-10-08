import { LegalPageContent } from "@/components/legal-page";
import { SubPage, subPageMetadata } from "@/components/sub-page";
import { toLocale } from "@/lib/locale";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export function generateMetadata({
  params,
}: PageProps<"/[locale]/support">): Promise<Metadata> {
  return subPageMetadata("support", params);
}

export default async function SupportPage({
  params,
}: PageProps<"/[locale]/support">): Promise<ReactNode> {
  const locale = toLocale((await params).locale);
  return (
    <SubPage page="support" locale={locale}>
      <LegalPageContent page="support" locale={locale} />
    </SubPage>
  );
}
