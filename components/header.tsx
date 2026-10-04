"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useRef, type ReactNode } from "react";
import { LangSwitch } from "./lang-switch";
import { Wordmark } from "./wordmark";
import type { Translations } from "@/lib/i18n";
import type { Locale } from "@/lib/locale";
import { NAV_ITEMS } from "@/lib/nav";
import { mountDrop } from "@/lib/motion-tokens";

/** 三条线的菜单图标；在菜单里那一枚转成叉。 */
function MenuIcon({ close = false }: { close?: boolean }): ReactNode {
  return (
    <span
      aria-hidden="true"
      className="relative flex h-4 w-6 flex-col justify-between"
    >
      <span
        className={`block h-0.5 w-full origin-center rounded-full bg-current transition-transform duration-200 ${close ? "translate-y-[7px] rotate-45" : ""}`}
      />
      <span
        className={`block h-0.5 w-full rounded-full bg-current transition-opacity duration-150 ${close ? "opacity-0" : ""}`}
      />
      <span
        className={`block h-0.5 w-full origin-center rounded-full bg-current transition-transform duration-200 ${close ? "-translate-y-[7px] -rotate-45" : ""}`}
      />
    </span>
  );
}

/**
 * 顶栏。宽屏是一行导航；窄屏一个菜单按钮，菜单是原生 `<dialog>` 的模态：背景 inert、Esc 关、
 * 焦点留在框里、关闭后焦点回到菜单按钮，页面滚动由 globals.css 的 `html:has(dialog:modal)` 锁住。
 */
export function Header({
  locale,
  t,
}: {
  locale: Locale;
  t: Translations;
}): ReactNode {
  const menu = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

  // 首页用裸 hash（走 Lenis 平滑滚动），子页回跳首页对应锚点。
  const anchorHref = (hash: string): string =>
    isHomePage ? hash : `/${locale}${hash}`;

  const closeMenu = (): void => menu.current?.close();

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
            {...mountDrop(0.1)}
          >
            <Wordmark className="text-white" />
          </motion.a>

          <motion.nav
            className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1"
            aria-label={t.a11y.mainNav}
            {...mountDrop(0.2)}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.key}
                href={anchorHref(item.hash)}
                className="px-4 py-2 text-sm font-semibold tracking-tight text-white/80 transition-colors hover:text-white"
              >
                {t.nav[item.key]}
              </a>
            ))}
          </motion.nav>

          <motion.div className="flex items-center gap-4" {...mountDrop(0.3)}>
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
            {...mountDrop(0.1)}
          >
            <Wordmark className="text-white" />
          </motion.a>
          {/* 触控目标 44x44：h-11 w-11 固定命中区，-mr-2.5 保持图标与右缘对齐 */}
          <motion.button
            type="button"
            className="-mr-2.5 flex h-11 w-11 cursor-pointer items-center justify-center text-white"
            onClick={() => menu.current?.showModal()}
            aria-haspopup="dialog"
            aria-controls="mobile-menu"
            aria-label={t.a11y.openMenu}
            {...mountDrop(0.2)}
          >
            <MenuIcon />
          </motion.button>
        </div>
      </header>

      <dialog
        ref={menu}
        id="mobile-menu"
        aria-label={t.a11y.mobileNav}
        className="site-sheet bg-background text-foreground lg:hidden"
        onClick={(event) => {
          // 点在框外（::backdrop 算 dialog 自己）即关。
          if (event.target === event.currentTarget) closeMenu();
        }}
      >
        <div className="flex h-16 w-full items-center justify-between px-6 sm:px-8">
          <a
            href={`/${locale}`}
            className="flex items-center gap-2"
            onClick={closeMenu}
          >
            <Wordmark className="text-foreground" />
          </a>
          <button
            type="button"
            className="-mr-2.5 flex h-11 w-11 cursor-pointer items-center justify-center"
            onClick={closeMenu}
            aria-label={t.a11y.closeMenu}
          >
            <MenuIcon close />
          </button>
        </div>

        <nav className="px-6 py-4" aria-label={t.a11y.mobileNav}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={anchorHref(item.hash)}
              className="text-foreground border-border block border-b py-4 text-base font-medium"
              onClick={closeMenu}
            >
              {t.nav[item.key]}
            </a>
          ))}

          <div className="flex flex-col gap-3 pt-6">
            <a
              href={anchorHref("#download")}
              className="text-background bg-foreground hover:bg-foreground/90 w-full rounded-full py-3 text-center text-sm font-medium tracking-tight transition-colors"
              onClick={closeMenu}
            >
              {t.nav.download}
            </a>
            <div className="flex justify-center pt-2">
              <LangSwitch locale={locale} variant="dark" />
            </div>
          </div>
        </nav>
      </dialog>
    </>
  );
}
