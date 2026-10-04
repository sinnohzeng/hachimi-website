"use client";

import { type ReactNode } from "react";
import { CatOrb } from "@/components/cat-orb";
import { Wordmark } from "@/components/wordmark";
import { siteConfig } from "@/lib/config";
import type { Translations } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { NAV_ITEMS } from "@/lib/nav";

/**
 * 页脚（spec 004）：左边是道长、字标与一句定位语，右边两栏链接，最底下一行版权与法律链接。
 * 法律链接只在最底下那一行。“产品”一栏就是顶栏的四个锚，联系一栏的邮箱取 siteConfig。
 */
export function Footer({
  locale,
  t,
}: {
  locale: Locale;
  t: Translations;
}): ReactNode {
  const columns = [
    {
      title: t.footer.productTitle,
      items: NAV_ITEMS.map((item) => ({
        label: t.nav[item.key],
        href: `/${locale}${item.hash}`,
      })),
    },
    {
      title: t.footer.contactTitle,
      items: [
        { label: t.footer.support, href: `/${locale}/support` },
        { label: siteConfig.email, href: `mailto:${siteConfig.email}` },
      ],
    },
  ];
  const legal = [
    { label: t.footer.legal.privacy, href: `/${locale}/privacy` },
    { label: t.footer.legal.terms, href: `/${locale}/terms` },
    { label: t.footer.legal.dataDeletion, href: `/${locale}/data-deletion` },
  ];

  return (
    <footer className="bg-background text-foreground relative w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 sm:px-8">
        <div className="relative h-full w-full max-w-270">
          <div className="bg-foreground/10 absolute top-0 bottom-0 left-0 w-px" />
          <div className="bg-foreground/10 absolute top-0 right-0 bottom-0 w-px" />
          <div className="bg-foreground/10 absolute top-full left-0 h-screen w-px" />
          <div className="bg-foreground/10 absolute top-full right-0 h-screen w-px" />
        </div>
      </div>

      <div className="relative flex items-center justify-center px-6 pt-16 sm:px-8">
        <div className="relative w-full max-w-270">
          <div className="bg-foreground/10 absolute right-0 bottom-0 left-0 h-px" />
          <div className="bg-foreground/10 absolute right-full bottom-0 h-px w-screen" />
          <div className="bg-foreground/10 absolute bottom-0 left-full h-px w-screen" />
          <div className="bg-foreground absolute -bottom-0.75 -left-0.75 h-1.5 w-1.5" />
          <div className="bg-foreground absolute -right-0.75 -bottom-0.75 h-1.5 w-1.5" />
          <div className="relative w-full px-8 py-12 sm:px-12">
            <div className="flex flex-col justify-between gap-12 lg:flex-row lg:gap-8">
              <div className="lg:max-w-xs">
                {/* 球径与首屏同一档；球底下不铺卡片，明暗跟站点走（spec 003、004）。 */}
                <CatOrb surface="footer" className="mb-5 [--orb-d:96px]" />
                <a href={`/${locale}`} className="flex items-center gap-2">
                  <Wordmark className="text-foreground" />
                </a>
                <p className="text-foreground/60 mt-4 max-w-xs text-sm">
                  {t.footer.tagline}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8 lg:gap-16">
                {columns.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-foreground/60 mb-5 text-xs font-medium tracking-wider uppercase">
                      {section.title}
                    </h3>
                    {/* 触控目标 44px：py-3 撑高命中区（20px 行高 + 24px padding），ul 负外边距抵消首末内边距 */}
                    <ul className="-my-3">
                      {section.items.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            className="text-foreground/70 hover:text-foreground inline-block py-3 text-sm transition-colors"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex items-center justify-center px-6 pb-12 sm:px-8">
        <div className="relative w-full max-w-270">
          <div className="px-8 pt-8 sm:px-12">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <span className="text-foreground/60 text-sm">
                {t.footer.copyright}
              </span>
              <div className="flex flex-wrap gap-6">
                {/* 触控目标 44px：py-3 撑高命中区，负外边距保持行视觉高度不变（gap-6 恰好容纳上下各 12px 外溢） */}
                {legal.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-foreground/60 hover:text-foreground -my-3 py-3 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
