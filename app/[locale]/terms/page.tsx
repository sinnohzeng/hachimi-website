import { Footer } from "@/components/footer";
import { LegalSections } from "@/components/legal-sections";
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
    path: "/terms",
    title: t.terms.title,
    description:
      locale === "zh"
        ? "哈基米道长使用条款与免责声明。仅供娱乐与情绪陪伴，绝不预测、不改命。"
        : "Master Hachimi Terms of Use & Disclaimer. For entertainment and comfort only, never prediction.",
  });
}

export default async function TermsPage({
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
        path="/terms"
        pageTitle={t.terms.title}
      />
      <main id="main-content" className="flex-1">
        <LegalSections data={t.terms} />
      </main>
      <Footer t={t} locale={locale} />
    </>
  );
}
