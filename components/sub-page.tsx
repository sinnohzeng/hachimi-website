import { Footer } from "@/components/footer";
import { BreadcrumbStructuredData } from "@/components/structured-data";
import { getTranslations } from "@/lib/i18n";
import { toLocale, type Locale } from "@/lib/locale";
import { localizedPageMetadata } from "@/lib/metadata";
import { PAGES, type PageKey } from "@/lib/pages";
import type { Metadata } from "next";
import type { ReactNode } from "react";

/** 子页的元数据：路径取 lib/pages.ts 的总表，标题与描述取 i18n `meta` 里同名那一格。 */
export async function subPageMetadata(
  page: PageKey,
  params: Promise<{ locale: string }>
): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  return localizedPageMetadata({
    locale,
    path: PAGES[page].path,
    ...getTranslations(locale).meta[page],
  });
}

/**
 * 支持、删除数据、隐私与条款四页共用的外壳：面包屑结构化数据、正文与页脚。路径与标题
 * 取总表，各页只给正文。
 */
export function SubPage({
  page,
  locale,
  children,
}: {
  page: PageKey;
  locale: Locale;
  children: ReactNode;
}): ReactNode {
  const t = getTranslations(locale);
  return (
    <>
      <BreadcrumbStructuredData
        locale={locale}
        path={PAGES[page].path}
        pageTitle={t.meta[page].title}
      />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer t={t} locale={locale} />
    </>
  );
}
