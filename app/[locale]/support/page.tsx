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
    path: "/support",
    title: `${t.support.title} — Hachimi`,
    description:
      locale === "zh"
        ? "需要帮助？联系哈基米道长支持团队，或查看常见问题。"
        : "Need help with Master Hachimi? Contact support or browse common questions.",
  });
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
      <BreadcrumbStructuredData
        locale={locale}
        path="/support"
        pageTitle={t.support.title}
      />
      <main id="main-content" className="flex-1">
        <LegalPageContent data={t.support} />
      </main>
      <Footer t={t} />
    </>
  );
}
