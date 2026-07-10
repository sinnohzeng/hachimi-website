"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { LangSwitch } from "./lang-switch";
import type { Translations } from "@/lib/i18n";

const ease = [0.23, 1, 0.32, 1] as const;

function HamburgerIcon({
  isOpen,
  color = "white",
}: {
  isOpen: boolean;
  color?: string;
}): ReactNode {
  return (
    <div className="relative flex h-4 w-6 cursor-pointer flex-col justify-between">
      <motion.span
        className="block h-0.5 w-full origin-center rounded-full"
        style={{ backgroundColor: color }}
        animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease }}
      />
      <motion.span
        className="block h-0.5 w-full origin-center rounded-full"
        style={{ backgroundColor: color }}
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.span
        className="block h-0.5 w-full origin-center rounded-full"
        style={{ backgroundColor: color }}
        animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease }}
      />
    </div>
  );
}

// 三项制：怎么玩（首页锚）· 起卦的门道（真页，作品集观众的确定入口）·
// 常见问题（首页锚）。数说道长移出一级导航，页脚保留锚点。
const navItems = [
  { key: "features", hash: "#features" },
  { key: "methodology", hash: null },
  { key: "faq", hash: "#faq" },
] as const;

export function Header({
  locale,
  t,
}: {
  locale: string;
  t: Translations;
}): ReactNode {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;
  const isMethodologyPage = pathname.startsWith(`/${locale}/methodology`);

  // 首页用裸 hash（走 Lenis 平滑滚动），子页回跳首页对应锚点。
  const anchorHref = (hash: string) =>
    isHomePage ? hash : `/${locale}${hash}`;
  const navHref = (item: (typeof navItems)[number]) =>
    item.hash === null ? `/${locale}/methodology` : anchorHref(item.hash);

  const getLabel = (key: string) => {
    return t.nav[key as keyof typeof t.nav] ?? key;
  };

  return (
    <>
      <div
        className="pointer-events-none fixed top-0 left-0 z-1001 h-25 w-full"
        style={{
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          maskImage: "linear-gradient(black 0%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(black 0%, black 40%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Desktop header */}
      <header className="fixed top-0 right-0 left-0 z-1003 hidden mix-blend-exclusion lg:block">
        <div className="mx-auto flex h-20 w-full items-center justify-between px-6 sm:px-8">
          <motion.a
            href={`/${locale}`}
            className="flex items-center gap-2"
            aria-label="Home"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
          >
            <span className="text-lg font-semibold tracking-tight text-white">
              HACHIMI AI
            </span>
          </motion.a>

          <motion.nav
            className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1"
            aria-label="Main navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
          >
            {navItems.map((item) => (
              <a
                key={item.key}
                href={navHref(item)}
                aria-current={
                  item.key === "methodology" && isMethodologyPage
                    ? "page"
                    : undefined
                }
                className={`px-4 py-2 text-sm font-semibold tracking-tight transition-colors hover:text-white ${
                  item.key === "methodology" && isMethodologyPage
                    ? "text-white"
                    : "text-white/80"
                }`}
              >
                {getLabel(item.key)}
              </a>
            ))}
          </motion.nav>

          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
          >
            <LangSwitch locale={locale} />
            <a
              href={anchorHref("#download")}
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold tracking-tighter text-black transition-colors hover:bg-white/90"
            >
              {t.nav.download}
            </a>
          </motion.div>
        </div>
      </header>

      {/* Mobile header */}
      <header className="fixed top-0 right-0 left-0 z-1003 mix-blend-exclusion lg:hidden">
        <div className="mx-auto flex h-16 w-full items-center justify-between px-6 sm:px-8">
          <motion.a
            href={`/${locale}`}
            className="flex items-center gap-2"
            aria-label="Home"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
          >
            <span className="text-lg font-semibold tracking-tight text-white">
              HACHIMI AI
            </span>
          </motion.a>
          {/* 触控目标 44x44：h-11 w-11 固定命中区，-mr-2.5 保持图标与右缘对齐 */}
          <motion.button
            className="-mr-2.5 flex h-11 w-11 items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
          >
            <HamburgerIcon isOpen={false} color="white" />
          </motion.button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-background fixed top-0 right-0 left-0 z-1004 lg:hidden"
          >
            <div className="flex h-16 w-full items-center justify-between px-6 sm:px-8">
              <a
                href={`/${locale}`}
                className="flex items-center gap-2"
                aria-label="Home"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-foreground text-lg font-semibold tracking-tight">
                  HACHIMI AI
                </span>
              </a>
              <button
                className="-mr-2.5 flex h-11 w-11 items-center justify-center"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <HamburgerIcon isOpen={true} color="currentColor" />
              </button>
            </div>

            <nav
              className="max-h-[calc(100vh-4rem)] overflow-y-auto px-6 py-4"
              aria-label="Mobile navigation"
            >
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={navHref(item)}
                  className="text-foreground border-border block border-b py-4 text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {getLabel(item.key)}
                </a>
              ))}

              <div className="flex flex-col gap-3 pt-6">
                <a
                  href={anchorHref("#download")}
                  className="text-background bg-foreground hover:bg-foreground/90 w-full rounded-full py-3 text-center text-sm font-medium tracking-tight transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.nav.download}
                </a>
                <div className="flex justify-center pt-2">
                  <LangSwitch locale={locale} variant="dark" />
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
