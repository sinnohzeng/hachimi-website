import { Header } from "@/components/header";
import { Providers } from "@/components/providers";
import { SkipToContent } from "@/components/skip-to-content";
import { SiteStructuredData } from "@/components/structured-data";
import { ThemeSwitch } from "@/components/theme-switch";
import { generateStaticParams as genParams, getTranslations } from "@/lib/i18n";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import type { ReactNode } from "react";
import "../globals.css";

export { genParams as generateStaticParams };

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale);

  return (
    // no-js 类由下方内联脚本在首帧前移除；JS 失效时 globals.css 的
    // html.no-js [data-animate] 救援规则强制回显所有入场动画元素。
    <html lang={locale} suppressHydrationWarning className="no-js">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} bg-background text-foreground flex min-h-screen flex-col font-sans antialiased`}
      >
        {/* 必须是 <body> 首个子节点：parser-blocking 内联脚本在后续任何内容
            可绘制之前执行（与 next-themes 同一保证），在首帧前完成两件事——
            1) html[data-platform]=ios|android|other，CSS 据此收敛下载徽章为
               单枚（消灭 hydration 后高度塌缩挤动 hero h1 的 CLS）；
            2) 移除 no-js 类。iPadOS 13+ 桌面级 Safari 自报 MacIntel，靠触点
            数辨认。 */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(){try{var ua=navigator.userAgent,p="other";if(/iPhone|iPad|iPod/.test(ua)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1))p="ios";else if(/Android/.test(ua))p="android";var h=document.documentElement;h.dataset.platform=p;h.classList.remove("no-js")}catch(e){}})();',
          }}
        />
        <SiteStructuredData locale={locale} />
        <Providers>
          <SkipToContent />
          <Header locale={locale} t={t} />
          <ThemeSwitch />
          {children}
        </Providers>
      </body>
    </html>
  );
}
