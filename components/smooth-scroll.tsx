"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useReducedMotion } from "@/lib/motion";

/**
 * Lenis 平滑滚动。减弱动态时不建实例，偏好中途改了就随之销毁或重建。
 *
 * 同页锚点（`#case` 或 `/zh#case` 这种落在当前页的）由这里接管：拦下浏览器的原生跳锚，
 * 交给 Lenis 滑过去。Lenis 的 scrollTo 自己让出目标的 `scroll-margin-top`，与原生跳锚
 * （跨页进来、减弱动态）停在同一处。Lenis 自带的 `anchors` 选项不拦原生跳锚，所以不用它。
 * 开着的模态 `<dialog>` 里的滚轮不归 Lenis，背后页面由 globals.css 锁住。
 */
export function SmoothScroll({ children }: { children: ReactNode }): ReactNode {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      prevent: (node) => node.nodeName === "DIALOG",
    });

    function handleAnchorClick(event: MouseEvent): void {
      const anchor = (
        event.target as Element | null
      )?.closest<HTMLAnchorElement>('a[href*="#"]');
      if (!anchor || !anchor.hash || anchor.hash === "#") return;
      if (anchor.origin !== window.location.origin) return;
      if (anchor.pathname !== window.location.pathname) return;
      const target = document.querySelector<HTMLElement>(anchor.hash);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target);
    }

    document.addEventListener("click", handleAnchorClick);
    return () => {
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
