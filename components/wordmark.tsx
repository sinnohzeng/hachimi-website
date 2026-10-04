import type { ReactNode } from "react";
import { siteConfig } from "@/lib/config";

/** 字标：品牌名的文字版，顶栏、手机菜单与页脚共用。 */
export function Wordmark({
  className = "",
}: {
  className?: string;
}): ReactNode {
  return (
    <span className={`text-lg font-semibold tracking-tight ${className}`}>
      {siteConfig.name}
    </span>
  );
}
