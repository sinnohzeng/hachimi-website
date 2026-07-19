import { type ReactNode } from "react";
import { siteConfig } from "@/lib/config";
import type { Translations } from "@/lib/i18n";

type Badge = { src: string; width: number; height: number };

// 官方徽章排布规则（Apple / Google 品牌规范）：并排必用黑色版、App Store 徽章
// 在前、两枚视觉等高、留白不小于徽章高的 1/4。Play 官方 PNG 的透明边距在
// en / zh 两版比例不同（168/250 与 192/250），CSS 无法统一补偿，故素材已裁掉
// 纯透明边距（徽章图形本体未动），两家徽章按同一显示高度排布即视觉等高。
// Apple 规范屏显最小 40px，主推位统一用 48px（h-12）。
const appleBadges: { en: Badge; zh: Badge } = {
  en: { src: "/badges/app-store-en.svg", width: 120, height: 40 },
  zh: { src: "/badges/app-store-zh.svg", width: 109, height: 40 },
};

const playBadges: { en: Badge; zh: Badge } = {
  en: { src: "/badges/google-play-en.png", width: 564, height: 168 },
  zh: { src: "/badges/google-play-zh.png", width: 646, height: 192 },
};

/**
 * App Store + Google Play 官方下载徽章对。
 *
 * 双徽章恒渲染进静态 HTML（SEO 与无 JS 场景可见），平台收敛交给 CSS：
 * app/[locale]/layout.tsx 里 <body> 首位的内联脚本在首帧绘制前把
 * html[data-platform] 置为 ios / android / other，globals.css 据此隐藏
 * 无关徽章。首帧即为单徽章——不存在旧方案 hydration 后的高度塌缩
 * （窄屏双徽章折两行 → 收敛成一行，曾把垂直居中的 hero h1 向下挤出
 * 可见位移，即 slogan 漂移 CLS 的根因）。
 */
export function StoreBadges({
  locale,
  t,
  className = "",
}: {
  locale: string;
  t: Translations;
  className?: string;
}): ReactNode {
  const apple = locale === "zh" ? appleBadges.zh : appleBadges.en;
  const play = locale === "zh" ? playBadges.zh : playBadges.en;

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        href={siteConfig.appStore}
        data-badge="apple"
        className="transition-opacity duration-150 hover:opacity-80"
      >
        <img
          src={apple.src}
          alt={t.store.appStoreAlt}
          width={apple.width}
          height={apple.height}
          className="h-12 w-auto"
        />
      </a>
      <a
        href={siteConfig.googlePlay}
        data-badge="play"
        className="transition-opacity duration-150 hover:opacity-80"
      >
        <img
          src={play.src}
          alt={t.store.googlePlayAlt}
          width={play.width}
          height={play.height}
          className="h-12 w-auto"
        />
      </a>
    </div>
  );
}
