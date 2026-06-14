import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config";

// Build-time generated Open Graph card (1200x630). Replaces the missing
// /og-image.png so social cards resolve to a real file under output: "export".
// Required for image routes under `output: "export"` so the PNG is emitted at
// build time rather than served dynamically.
export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = siteConfig.name;

export default function OpengraphImage(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
          color: "#ffffff",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          Master Hachimi
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            marginTop: 8,
          }}
        >
          哈基米道长
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            marginTop: 32,
            color: "rgba(255,255,255,0.88)",
          }}
        >
          {siteConfig.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
