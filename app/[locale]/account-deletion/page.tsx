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
    path: "/account-deletion",
    title: `${t.accountDeletion.title} — Hachimi`,
    description:
      locale === "zh"
        ? "哈基米道长没有账号——无需登录即可使用，没有账号可删。卦历只存在你的设备上：了解具体存了什么，以及如何清除。"
        : "Master Hachimi has no accounts — you use it without signing in, so there's nothing to delete. Your reading history stays on your device: see what's stored and how to clear it.",
  });
}

export default async function AccountDeletionPage({
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
        path="/account-deletion"
        pageTitle={t.accountDeletion.title}
      />
      <main id="main-content" className="flex-1">
        <LegalPageContent data={t.accountDeletion} />
      </main>
      <Footer t={t} />
    </>
  );
}
