import { Footer } from "@/components/footer";
import { LegalPageContent } from "@/components/legal-page";
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
    title: `${t.support.title} — Hachimi`,
    description:
      locale === "zh"
        ? "需要帮助？联系哈基米道长支持团队，或查看常见问题。"
        : "Need help with Master Hachimi? Contact support or browse common questions.",
    alternates: {
      canonical: `/${locale}/support`,
      languages: {
        en: "/en/support",
        zh: "/zh/support",
      },
    },
  };
}

export default async function SupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<ReactNode> {
  const { locale } = await params;
  const t = getTranslations(locale);

  return (
    <>
      <main id="main-content" className="flex-1">
        <LegalPageContent data={t.support} />
      </main>
      <Footer t={t} />
    </>
  );
}
