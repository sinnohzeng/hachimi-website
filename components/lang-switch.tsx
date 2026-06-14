"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function LangSwitch({
  locale,
  variant = "light",
}: {
  locale: string;
  variant?: "light" | "dark";
}): ReactNode {
  const pathname = usePathname();
  const otherLocale = locale === "zh" ? "en" : "zh";
  const otherPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const isLight = variant === "light";
  const activeClass = isLight
    ? "text-white font-medium"
    : "text-foreground font-medium";
  const inactiveClass = isLight
    ? "text-white/50 hover:text-white/80"
    : "text-foreground/50 hover:text-foreground/80";
  const separatorClass = isLight ? "text-white/30" : "text-foreground/30";

  return (
    <div className="flex items-center gap-1 text-sm">
      {locale === "en" ? (
        <span aria-current="page" className={`px-2 py-1 rounded ${activeClass}`}>
          EN
        </span>
      ) : (
        <a
          href={otherPath}
          className={`px-2 py-1 rounded transition-colors ${inactiveClass}`}
        >
          EN
        </a>
      )}
      <span className={separatorClass}>|</span>
      {locale === "zh" ? (
        <span aria-current="page" className={`px-2 py-1 rounded ${activeClass}`}>
          中文
        </span>
      ) : (
        <a
          href={otherPath}
          className={`px-2 py-1 rounded transition-colors ${inactiveClass}`}
        >
          中文
        </a>
      )}
    </div>
  );
}
