"use client";

import { type ReactNode } from "react";
import Device from "@/components/react-bits/device";

/**
 * 站上的 App 截图。第四版五张：命例列表、紫微三合盘、八字四柱页、起卦结果页、命例
 * 的问事面，命例走查一节按这个顺序换屏，首屏与收尾各自另取。
 *
 * 每张的固有尺寸都是 iPhone 17 Pro Max 整屏 1320 × 2868，写死宽高把版面撑住，图到位
 * 时不跳。取图口径与裁切规则在 scripts/build-shots.mjs。
 *
 * `widths` 是这张图实际出了哪几档宽度，`dark` 是有没有深色版。按张记而不是一刀切，
 * 哪天多一张只出一档、没有深色版的图，调用方一个字都不用改。
 */
const SHOTS = {
  "case-list": { widths: [660, 1320], dark: true },
  "ziwei-sanhe": { widths: [660, 1320], dark: true },
  "bazi-pillars": { widths: [660, 1320], dark: true },
  "cast-result": { widths: [660, 1320], dark: true },
  "case-casts": { widths: [660, 1320], dark: true },
} as const satisfies Record<
  string,
  { widths: readonly number[]; dark: boolean }
>;

export type ShotName = keyof typeof SHOTS;

const SHOT_W = 1320;
const SHOT_H = 2868;

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
  const widest = widths[widths.length - 1] ?? 660;
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
 * 光屏幕层，不带手机边框。有深色版的跟着 `html.dark` 换。
 *
 * 两张 img 叠着放、各由 `dark:` 决定显隐。被 `display: none` 的那张不进无障碍树，
 * 多数情况下浏览器也不会去取。唯独首屏那张要 eager，eager 绕开懒加载，深色下会
 * 白取一次浅色版；只有首屏一张，换来 LCP 不被推迟。
 *
 * 截图拍的是中文界面，en 页共用同一批文件，所以路径不带 locale。
 *
 * 单独导出是给命例走查用的：那一节要在同一只手机里叠五屏，边框只能有一个，
 * 所以由它自己拿 Device 当壳，屏幕层一张张塞进去。
 */
export function ShotScreens({
  name,
  alt,
  sizes = "(min-width: 1024px) 260px, 60vw",
  eager = false,
}: {
  name: ShotName;
  alt: string;
  sizes?: string;
  eager?: boolean;
}): ReactNode {
  const { widths, dark } = SHOTS[name];
  const base = `/screenshots/zh/${name}`;
  return (
    <>
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
    </>
  );
}

/** 一张 App 截图，套在手机边框里。 */
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
  return (
    <Device
      className={className}
      parallaxStrength={6}
      rotateStrength={2}
      autoAnimate={false}
    >
      <ShotScreens name={name} alt={alt} sizes={sizes} eager={eager} />
    </Device>
  );
}
