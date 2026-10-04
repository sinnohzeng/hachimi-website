import { Footer } from "@/components/footer";
import { StoreBadges } from "@/components/store-badges";
import { BreadcrumbStructuredData } from "@/components/structured-data";
import { siteConfig } from "@/lib/config";
import { getTranslations } from "@/lib/i18n";
import { toLocale } from "@/lib/locale";
import { localizedPageMetadata } from "@/lib/metadata";
import { iPadOSStoreScript } from "@/lib/platform";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { renderSVG } from "uqr";

// 构建期生成，静态导出时内联进 HTML，客户端不带二维码库。
const downloadQr = renderSVG(`${siteConfig.url}/get`, { ecc: "M", border: 2 });

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/get">): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  return localizedPageMetadata({
    locale,
    path: "/get",
    ...getTranslations(locale).meta.get,
  });
}

/**
 * 下载落地页：hachimi.ai/get 在微信里、桌面上与认不出的平台落到这里
 * （functions/get.ts）。两枚商店徽章恒并排；二维码指回 /get，只在桌面宽度
 * 出现；微信提示只在微信里出现（html[data-wechat]，见 lib/platform.ts）。
 */
export default async function GetPage({
  params,
}: PageProps<"/[locale]/get">): Promise<ReactNode> {
  const locale = toLocale((await params).locale);
  const t = getTranslations(locale);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: iPadOSStoreScript() }} />
      <BreadcrumbStructuredData
        locale={locale}
        path="/get"
        pageTitle={t.get.title}
      />
      <main
        id="main-content"
        className="flex flex-1 items-center justify-center px-6 py-32 sm:px-8"
      >
        <div className="flex w-full max-w-xl flex-col items-center text-center">
          <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            {t.get.title}
          </h1>
          <p className="text-foreground/70 mt-4 text-base leading-relaxed">
            {t.get.body}
          </p>
          <p
            data-wechat-hint
            className="border-accent/40 bg-accent/10 text-foreground mt-6 rounded-lg border px-4 py-3 text-sm leading-relaxed"
          >
            {t.get.wechatHint}
          </p>
          <StoreBadges
            locale={locale}
            t={t}
            followPlatform={false}
            className="mt-8 justify-center"
          />
          <figure className="mt-12 hidden flex-col items-center lg:flex">
            <div
              aria-hidden="true"
              className="w-40 rounded-xl bg-white p-1 [&>svg]:block [&>svg]:h-auto [&>svg]:w-full"
              dangerouslySetInnerHTML={{ __html: downloadQr }}
            />
            <figcaption className="text-foreground/60 mt-3 text-sm">
              {t.get.qrCaption}
            </figcaption>
          </figure>
        </div>
      </main>
      <Footer t={t} locale={locale} />
    </>
  );
}
