import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { baseMetadata } from "@/lib/metadata";

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Pass-through root layout. The <html>/<body> shell lives in
// app/[locale]/layout.tsx so the lang attribute reflects the active locale
// (WCAG 3.1.1). The root "/" client redirect (app/page.tsx) renders its own
// <html> via metadata + a no-JS fallback.
export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return children;
}
