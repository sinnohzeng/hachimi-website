import { Footer } from "@/components/footer";
import { PrivacyPolicy } from "@/components/privacy-policy";
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
    path: "/privacy",
    title: t.privacy.title,
    description:
      locale === "zh"
        ? "Hachimi 隐私政策。了解我们如何收集、使用和保护你的数据。"
        : "Master Hachimi Privacy Policy. Learn what data we use and how we keep it safe.",
  });
}

export default async function PrivacyPage({
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
        path="/privacy"
        pageTitle={t.privacy.title}
      />
      <main id="main-content" className="flex-1">
        <PrivacyPolicy t={t} />
      </main>
      <Footer t={t} locale={locale} />
    </>
  );
}
