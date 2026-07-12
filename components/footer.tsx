"use client";

import { type ReactNode } from "react";
import type { Translations } from "@/lib/i18n";

export function Footer({
  locale,
  t,
}: {
  locale: string;
  t: Translations;
}): ReactNode {
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
                <a href={`/${locale}`} className="flex items-center gap-2">
                  <span className="text-foreground text-lg font-semibold tracking-tight">
                    HACHIMI AI
                  </span>
                </a>
                {/* 下载徽章不再重复出现：紧邻的 #download（FinalCTA）已是主下载位。 */}
                <p className="text-foreground/50 mt-4 max-w-xs text-sm">
                  {t.footer.copyright}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-16">
                {t.footer.links.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-foreground/40 mb-5 text-xs font-medium tracking-wider uppercase">
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
              <span className="text-foreground/40 text-sm">Hachimi.ai</span>
              <div className="flex flex-wrap gap-6">
                {/* 触控目标 44px：py-3 撑高命中区，负外边距保持行视觉高度不变（gap-6 恰好容纳上下各 12px 外溢） */}
                {t.footer.legal.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-foreground/50 hover:text-foreground -my-3 py-3 text-sm transition-colors"
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
