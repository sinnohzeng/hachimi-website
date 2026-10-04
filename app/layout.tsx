import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/lib/config";
import { baseMetadata } from "@/lib/metadata";

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: siteConfig.themeColor.light,
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: siteConfig.themeColor.dark,
    },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/**
 * 根布局只透传。`<html>` 与 `<body>` 在 app/[locale]/layout.tsx，lang 随语言走；
 * 认不出的网址由 app/global-not-found.tsx 给一整份文档。
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return children;
}
