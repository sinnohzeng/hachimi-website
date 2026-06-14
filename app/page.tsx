"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { ReactNode } from "react";

// Root "/" redirect to the default locale. The server-side redirect() emits a
// broken __next_error__ shell under `output: "export"`, so we redirect on the
// client instead: a <meta http-equiv="refresh"> handles JS-disabled browsers
// and crawlers, useEffect handles the SPA case, and a visible <a> is the
// no-JS / no-meta fallback. (GitHub Pages — no Cloudflare _redirects.)
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
      <body>
        <p style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
          Redirecting to{" "}
          {/* Deliberate plain anchor: this is the no-JS / no-router fallback,
              so next/link (which needs the client runtime) is not appropriate. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/en">Master Hachimi</a>…
        </p>
      </body>
    </html>
  );
}
