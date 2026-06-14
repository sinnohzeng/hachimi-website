import { Footer } from "@/components/footer";
import { LegalSections } from "@/components/legal-sections";
import { getTranslations } from "@/lib/i18n";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale);
  return {
    title: `${t.terms.title} — Master Hachimi`,
    description:
      locale === "zh"
        ? "哈基米道长使用条款与免责声明——仅供娱乐与情绪陪伴，绝不预测、不改命。"
        : "Master Hachimi Terms of Use & Disclaimer — for entertainment and emotional comfort only, never prediction.",
    alternates: {
      canonical: `/${locale}/terms`,
      languages: {
        en: "/en/terms",
        zh: "/zh/terms",
      },
    },
  };
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
      <main id="main-content" className="flex-1">
        <LegalSections data={t.terms} />
      </main>
      <Footer t={t} />
    </>
  );
}
