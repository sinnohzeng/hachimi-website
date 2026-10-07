import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import { LOCALES, defaultLocale, locales, type Locale } from "@/lib/locale";

/**
 * 全站共用的元数据，挂在根布局上：标题模板、图标、manifest 与 iOS 的智能横幅。
 * canonical、hreflang、robots 与 og:url 都是“哪一页”的事，只在 localizedPageMetadata 里给，
 * 404 这类不经它的路由就不会继承一份指向首页的 canonical。
 */
export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seoTitle,
    template: `%s | ${siteConfig.seoTitle}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [...siteConfig.authors],
  creator: siteConfig.creator,
  publisher: siteConfig.seoTitle,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-icon.png",
    other: [
      {
        rel: "mask-icon",
        url: "/brand/mask-icon.svg",
        color: siteConfig.themeColor.dark,
      },
    ],
  },
  // Smart App Banner (iOS Safari): renders <meta name="apple-itunes-app">.
  itunes: {
    appId: siteConfig.appStoreId,
    appArgument: siteConfig.url,
  },
};

/**
 * app/[locale] 下每一页的元数据：canonical 与各语言的 hreflang（x-default 指缺省语言）、
 * og:locale、本页的标题与描述，以及本语言的分享卡。卡图由 app/[locale]/opengraph-image.tsx
 * 生成；子页一声明 openGraph 就会盖掉上层按文件约定挂的图，所以这里每页都写明。
 *
 * `path` 是去掉语言段的路径，首页为空串，其余如 `"/privacy"`。
 */
export function localizedPageMetadata({
  locale,
  path = "",
  title,
  description,
}: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
}): Metadata {
  const card = {
    url: `/${locale}/opengraph-image`,
    width: 1200,
    height: 630,
    type: "image/png",
    alt: siteConfig.seoTitle,
  };
  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        ...Object.fromEntries(
          locales.map((each) => [LOCALES[each].htmlLang, `/${each}${path}`])
        ),
        "x-default": `/${defaultLocale}${path}`,
      },
    },
    openGraph: {
      type: "website",
      locale: LOCALES[locale].ogLocale,
      alternateLocale: locales
        .filter((each) => each !== locale)
        .map((each) => LOCALES[each].ogLocale),
      url: `${siteConfig.url}/${locale}${path}`,
      title,
      description,
      siteName: siteConfig.seoTitle,
      images: [card],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: siteConfig.creator,
      images: [card],
    },
  };
}
