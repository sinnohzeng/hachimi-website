"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { CSSProperties, ReactNode } from "react";

// Root "/" fallback. In production Cloudflare Pages serves public/_redirects
// (`/ /en 302`) at the edge before this page can ever render; this component
// only shows in `next dev` and on non-CF hosts. The server-side redirect()
// emits a broken __next_error__ shell under `output: "export"`, so the
// fallback still redirects on the client: a <meta http-equiv="refresh">
// handles JS-disabled browsers and crawlers, useEffect handles the SPA case,
// and a visible <a> is the no-JS / no-meta fallback. Styling is inline (this
// page renders its own <html> without globals.css) and mirrors the hero's
// dark gradient so even a brief glimpse never flashes white.
const pageStyle: CSSProperties = {
  minHeight: "100dvh",
  margin: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background:
    "radial-gradient(85% 60% at 50% 100%, rgba(180, 95, 45, 0.28) 0%, rgba(60, 30, 60, 0.18) 45%, rgba(5, 5, 15, 0) 75%), linear-gradient(to bottom, #050510 0%, #08081a 70%, #120d20 100%)",
  color: "#fafafa",
  fontFamily: "system-ui, sans-serif",
  textAlign: "center",
};

export default function RootPage(): ReactNode {
  const router = useRouter();

  useEffect(() => {
    router.replace("/en");
  }, [router]);

  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content="0; url=/en" />
        <link rel="canonical" href="/en" />
        <title>Master Hachimi · 哈基米道长</title>
      </head>
      <body style={pageStyle}>
        <main style={{ padding: "2rem" }}>
          <p style={{ fontSize: "1.25rem", fontWeight: 600, margin: 0 }}>
            哈基米道长 · Master Hachimi
          </p>
          <p style={{ marginTop: "0.75rem", color: "rgba(250,250,250,0.7)" }}>
            正在前往官网… / Taking you to the site…
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            {/* Deliberate plain anchor: this is the no-JS / no-router fallback,
                so next/link (which needs the client runtime) is not appropriate. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/en" style={{ color: "#f59e0b" }}>
              hachimi.ai/en
            </a>
          </p>
        </main>
      </body>
    </html>
  );
}
