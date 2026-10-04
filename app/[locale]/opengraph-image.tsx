import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config";
import { generateStaticParams, getTranslations } from "@/lib/i18n";
import { toLocale } from "@/lib/locale";

/**
 * 分享卡（1200 × 630 PNG），每种语言一张，口号取那一页的首屏口号。构建期生成，静态导出成
 * 无扩展名的 /<locale>/opengraph-image，public/_headers 给它补 Content-Type。
 *
 * 字形全部来自 assets/og/card-font.ttf，那是只含卡面字的子集，由 scripts/build-og-font.mjs
 * 生成并有门核对，构建时不联网取字。品牌图标读 public/brand/og-logo.png（design/brand/
 * gen-web-icons.py 生成）。
 */
export const dynamic = "force-static";
export { generateStaticParams };
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = siteConfig.seoTitle;

const FONT = "Card";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<ImageResponse> {
  const t = getTranslations(toLocale((await params).locale));
  const [font, logo] = await Promise.all([
    readFile(join(process.cwd(), "assets/og/card-font.ttf")),
    readFile(join(process.cwd(), "public/brand/og-logo.png"), "base64"),
  ]);

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
          "linear-gradient(135deg, #242426 0%, #111113 55%, #0d1b2a 100%)",
        color: "#ffffff",
        fontFamily: FONT,
      }}
    >
      <img
        src={`data:image/png;base64,${logo}`}
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
          letterSpacing: "-0.02em",
          textShadow: "0 2px 12px rgba(120,53,15,0.35)",
        }}
      >
        {siteConfig.name}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 58,
          marginTop: 6,
          textShadow: "0 2px 12px rgba(120,53,15,0.35)",
        }}
      >
        {siteConfig.nameZh}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 34,
          marginTop: 26,
          color: "rgba(255,255,255,0.92)",
        }}
      >
        {t.hero.headline}
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: FONT, data: font, weight: 700, style: "normal" }],
    }
  );
}
