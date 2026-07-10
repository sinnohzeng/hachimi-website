"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { siteConfig } from "@/lib/config";
import type { Translations } from "@/lib/i18n";

type Badge = { src: string; width: number; height: number };

// 官方徽章排布规则（Apple / Google 品牌规范）：并排必用黑色版、App Store 徽章
// 在前、两枚视觉等高、留白不小于徽章高的 1/4。Play 官方 PNG 的透明边距在
// en / zh 两版比例不同（168/250 与 192/250），CSS 无法统一补偿，故素材已裁掉
// 纯透明边距（徽章图形本体未动），两家徽章按同一显示高度排布即视觉等高。
const appleBadges: { en: Badge; zh: Badge } = {
  en: { src: "/badges/app-store-en.svg", width: 120, height: 40 },
  zh: { src: "/badges/app-store-zh.svg", width: 109, height: 40 },
};

const playBadges: { en: Badge; zh: Badge } = {
  en: { src: "/badges/google-play-en.png", width: 564, height: 168 },
  zh: { src: "/badges/google-play-zh.png", width: 646, height: 192 },
};

const sizes = {
  // Apple 规范屏显最小 40px，主推位用 48px。
  md: { apple: "h-12", play: "h-12" },
  // 页脚等次要位置（非主推位，允许低于 40px 首选值）。
  sm: { apple: "h-9", play: "h-9" },
} as const;

// UA 是会话内常量，无需订阅变更；useSyncExternalStore 的 server 快照返回
// null（双徽章），客户端快照按 UA 收敛（与 lib/motion.tsx 同一 hydration
// 安全范式，见 react-hooks/set-state-in-effect）。
function subscribeNoop(): () => void {
  return () => {};
}

function getPlatformSnapshot(): "ios" | "android" | null {
  const ua = navigator.userAgent;
  if (
    /iPhone|iPad|iPod/.test(ua) ||
    // iPadOS 13+ 的桌面级 Safari 自报 MacIntel，靠触点数辨认
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  ) {
    return "ios";
  }
  if (/Android/.test(ua)) {
    return "android";
  }
  return null;
}

function getPlatformServerSnapshot(): "ios" | "android" | null {
  return null;
}

/**
 * App Store + Google Play 官方下载徽章对。
 *
 * SSG 首帧与桌面端渲染双徽章；挂载后按 UA 收敛为单徽章（iOS 只剩 App Store，
 * Android 只剩 Google Play）。server 快照为 null（双徽章），服务端与客户端
 * 首帧一致，无 hydration mismatch；收敛发生在 motion 入场动画之前，肉眼不可见。
 */
export function StoreBadges({
  locale,
  t,
  size = "md",
  className = "",
}: {
  locale: string;
  t: Translations;
  size?: keyof typeof sizes;
  className?: string;
}): ReactNode {
  const platform = useSyncExternalStore(
    subscribeNoop,
    getPlatformSnapshot,
    getPlatformServerSnapshot
  );

  const apple = locale === "zh" ? appleBadges.zh : appleBadges.en;
  const play = locale === "zh" ? playBadges.zh : playBadges.en;
  const badgeSize = sizes[size];

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {platform !== "android" && (
        <a
          href={siteConfig.appStore}
          className="transition-opacity duration-150 hover:opacity-80"
        >
          <img
            src={apple.src}
            alt={t.store.appStoreAlt}
            width={apple.width}
            height={apple.height}
            className={`w-auto ${badgeSize.apple}`}
          />
        </a>
      )}
      {platform !== "ios" && (
        <a
          href={siteConfig.googlePlay}
          className="transition-opacity duration-150 hover:opacity-80"
        >
          <img
            src={play.src}
            alt={t.store.googlePlayAlt}
            width={play.width}
            height={play.height}
            className={`w-auto ${badgeSize.play}`}
          />
        </a>
      )}
    </div>
  );
}
