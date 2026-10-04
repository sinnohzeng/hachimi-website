import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    // 根布局在顶层动态段 [locale] 下，认不出的网址由 app/global-not-found.tsx 给整份文档。
    globalNotFound: true,
  },
};

export default nextConfig;
