import { readFileSync } from "fs";
import { join } from "path";
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

// 品牌 logo（哈基米道长猫）内联为 data URI——static export 下 Satori 无法远程取图，
// 构建期用 fs 读 public/brand/og-logo.png（由 design/brand/gen-web-icons.py 生成）转 base64。
const logoSrc = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public/brand/og-logo.png")
).toString("base64")}`;

export default function OpengraphImage(): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #f5d78e 0%, #d97706 55%, #b45309 100%)",
        color: "#ffffff",
        fontFamily: "Georgia, serif",
      }}
    >
      <img
        src={logoSrc}
        alt=""
        width={200}
        height={200}
        style={{
          width: 200,
          height: 200,
          borderRadius: 44,
          marginBottom: 28,
          boxShadow: "0 10px 40px rgba(120,53,15,0.35)",
        }}
      />
      <div
        style={{
          display: "flex",
          fontSize: 78,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          textShadow: "0 2px 12px rgba(120,53,15,0.35)",
        }}
      >
        Master Hachimi
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 58,
          fontWeight: 700,
          marginTop: 6,
          textShadow: "0 2px 12px rgba(120,53,15,0.35)",
        }}
      >
        哈基米道长
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 32,
          marginTop: 26,
          color: "rgba(255,255,255,0.92)",
        }}
      >
        {siteConfig.tagline}
      </div>
    </div>,
    { ...size }
  );
}
