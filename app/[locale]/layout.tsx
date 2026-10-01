import { Header } from "@/components/header";
import { Providers } from "@/components/providers";
import { SkipToContent } from "@/components/skip-to-content";
import { SiteStructuredData } from "@/components/structured-data";
import { ThemeSwitch } from "@/components/theme-switch";
import { generateStaticParams as genParams, getTranslations } from "@/lib/i18n";
import { platformScript } from "@/lib/platform";
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
            可绘制之前执行（与 next-themes 同一保证），首帧前写好
            html[data-platform] 与 html[data-wechat]，再移除 no-js 类。CSS 据
            平台把下载徽章收敛成单枚，首帧即定，hydration 前后高度不变，
            不会挤动 hero h1。判断写在 lib/platform.ts，与 /get 的 Function 同一出处。 */}
        <script dangerouslySetInnerHTML={{ __html: platformScript() }} />
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
