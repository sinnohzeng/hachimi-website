"use client";

import { SmoothScroll } from "@/components/smooth-scroll";
import { ReducedMotionProvider } from "@/lib/motion";
import { MotionConfig } from "motion/react";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }): ReactNode {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <MotionConfig reducedMotion="user">
        <ReducedMotionProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </ReducedMotionProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
