"use client";

import { usePathname } from "next/navigation";
import { Fragment, type ReactNode } from "react";
import { LOCALES, locales, type Locale } from "@/lib/locale";

/**
 * 语言切换。每个标签用它自己的语言标注 lang，读屏按那种语言念；链接带 hrefLang。
 * 触控目标 44px：py-3 撑高命中区（20px 行高 + 24px padding），px-3 -mx-1 加宽且不改变视觉间距。
 */
export function LangSwitch({
  locale,
  variant = "light",
}: {
  locale: Locale;
  variant?: "light" | "dark";
}): ReactNode {
  const pathname = usePathname();

  const isLight = variant === "light";
  const activeClass = isLight
    ? "text-white font-medium"
    : "text-foreground font-medium";
  const inactiveClass = isLight
    ? "text-white/60 hover:text-white"
    : "text-foreground/60 hover:text-foreground";
  const separatorClass = isLight ? "text-white/30" : "text-foreground/30";

  return (
    <div className="flex items-center gap-1 text-sm">
      {locales.map((each, index) => {
        const { htmlLang, label } = LOCALES[each];
        return (
          <Fragment key={each}>
            {index > 0 ? (
              <span className={separatorClass} aria-hidden="true">
                |
              </span>
            ) : null}
            {each === locale ? (
              <span
                aria-current="page"
                lang={htmlLang}
                className={`-mx-1 rounded px-3 py-3 ${activeClass}`}
              >
                {label}
              </span>
            ) : (
              <a
                href={pathname.replace(`/${locale}`, `/${each}`)}
                lang={htmlLang}
                hrefLang={htmlLang}
                className={`-mx-1 rounded px-3 py-3 transition-colors ${inactiveClass}`}
              >
                {label}
              </a>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
