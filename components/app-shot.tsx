"use client";

import { type ReactNode } from "react";
import Device from "@/components/react-bits/device";

/**
 * 站上的 App 截图。第三版全页只有三张：首屏一张起卦结果，第四节紫微与八字各一张。
 *
 * 每张的固有尺寸都是 iPhone 17 Pro 整屏 1206 × 2622，写死宽高把版面撑住，图到位
 * 时不跳。取图口径与裁切规则在 scripts/build-shots.mjs。
 *
 * `widths` 是这张图实际出了哪几档宽度，`dark` 是有没有深色版。占位期两张真截图
 * 齐全，起卦结果那张还是旧的匿名图，只有一档宽度、没有深色版，所以这两项要按张
 * 记而不是一刀切；换成署名图之后把它们补齐即可，调用方一个字都不用改。
 */
const SHOTS = {
  "cast-result": { widths: [603], dark: false },
  "ziwei-sanhe": { widths: [603, 1206], dark: true },
  "bazi-pillars": { widths: [603, 1206], dark: true },
} as const satisfies Record<
  string,
  { widths: readonly number[]; dark: boolean }
>;

export type ShotName = keyof typeof SHOTS;

const SHOT_W = 1206;
const SHOT_H = 2622;

function Screen({
  base,
  alt,
  sizes,
  widths,
  eager,
  className,
}: {
  base: string;
  alt: string;
  sizes: string;
  widths: readonly number[];
  eager: boolean;
  className: string;
}): ReactNode {
  const widest = widths[widths.length - 1] ?? 603;
  return (
    <img
      src={`${base}-${widest}.webp`}
      // 只出了一档宽度时不写 srcSet：给浏览器一张假的候选表，它会按 sizes 去挑一个
      // 不存在的档位。
      {...(widths.length > 1
        ? { srcSet: widths.map((w) => `${base}-${w}.webp ${w}w`).join(", ") }
        : {})}
      sizes={sizes}
      alt={alt}
      width={SHOT_W}
      height={SHOT_H}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      className={`block h-full w-full object-contain select-none ${className}`}
    />
  );
}

/**
 * 一张 App 截图，套在手机边框里。有深色版的跟着 `html.dark` 换。
 *
 * 两张 img 叠着放、各由 `dark:` 决定显隐。被 `display: none` 的那张不进无障碍树，
 * 多数情况下浏览器也不会去取。唯独首屏那张要 eager，eager 绕开懒加载，深色下会
 * 白取一次浅色版；只有首屏一张，换来 LCP 不被推迟。
 *
 * 截图拍的是中文界面，en 页共用同一批文件，所以路径不带 locale。
 */
export function AppShot({
  name,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 260px, 60vw",
  eager = false,
}: {
  name: ShotName;
  alt: string;
  className?: string;
  sizes?: string;
  eager?: boolean;
}): ReactNode {
  const { widths, dark } = SHOTS[name];
  const base = `/screenshots/zh/${name}`;
  return (
    <Device
      className={className}
      parallaxStrength={6}
      rotateStrength={2}
      autoAnimate={false}
    >
      <Screen
        base={base}
        alt={alt}
        sizes={sizes}
        widths={widths}
        eager={eager}
        className={dark ? "dark:hidden" : ""}
      />
      {dark ? (
        <Screen
          base={`${base}-dark`}
          alt={alt}
          sizes={sizes}
          widths={widths}
          eager={false}
          className="hidden dark:block"
        />
      ) : null}
    </Device>
  );
}
