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
    <div className="w-6 h-4 relative flex flex-col justify-between cursor-pointer">
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

const navAnchors = [
  { key: "features", href: "#features" },
  { key: "tech", href: "#tech" },
  { key: "faq", href: "#faq" },
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

  const getLabel = (key: string) => {
    return t.nav[key as keyof typeof t.nav] ?? key;
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-25 z-1001 pointer-events-none"
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
      <header className="hidden lg:block fixed top-0 left-0 right-0 z-1003 mix-blend-exclusion">
        <div className="mx-auto flex h-20 w-full items-center justify-between px-6 sm:px-8">
          <motion.a
            href={`/${locale}`}
            className="flex items-center gap-2"
            aria-label="Home"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
          >
            <span className="text-lg font-semibold text-white tracking-tight">
              HACHIMI AI
            </span>
          </motion.a>

          {isHomePage && (
            <motion.nav
              className="flex items-center gap-1 absolute left-1/2 -translate-x-1/2"
              aria-label="Main navigation"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
            >
              {navAnchors.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  className="px-4 py-2 text-sm font-semibold tracking-tight text-white/80 hover:text-white transition-colors"
                >
                  {getLabel(link.key)}
                </a>
              ))}
            </motion.nav>
          )}

          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
          >
            <LangSwitch locale={locale} />
            <a
              href="#features"
              className="px-5 py-2.5 text-sm font-semibold tracking-tighter text-black bg-white rounded-full hover:bg-white/90 transition-colors"
            >
              {t.hero.cta}
            </a>
          </motion.div>
        </div>
      </header>

      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-1003 mix-blend-exclusion">
        <div className="mx-auto flex h-16 w-full items-center justify-between px-6 sm:px-8">
          <motion.a
            href={`/${locale}`}
            className="flex items-center gap-2"
            aria-label="Home"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
          >
            <span className="text-lg font-semibold text-white tracking-tight">
              HACHIMI AI
            </span>
          </motion.a>
          <motion.button
            className="p-2 -mr-2"
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
            className="lg:hidden fixed top-0 left-0 right-0 z-1004 bg-background"
          >
            <div className="flex h-16 w-full items-center justify-between px-6 sm:px-8">
              <a
                href={`/${locale}`}
                className="flex items-center gap-2"
                aria-label="Home"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-lg font-semibold text-foreground tracking-tight">
                  HACHIMI AI
                </span>
              </a>
              <button
                className="p-2 -mr-2"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <HamburgerIcon isOpen={true} color="currentColor" />
              </button>
            </div>

            <nav
              className="px-6 py-4 overflow-y-auto max-h-[calc(100vh-4rem)]"
              aria-label="Mobile navigation"
            >
              {isHomePage && navAnchors.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  className="block py-4 text-base font-medium text-foreground border-b border-border"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {getLabel(link.key)}
                </a>
              ))}

              <div className="flex flex-col gap-3 pt-6">
                <a
                  href="#features"
                  className="w-full py-3 text-center text-sm font-medium tracking-tight text-background bg-foreground rounded-full hover:bg-foreground/90 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.hero.cta}
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
