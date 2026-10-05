"use client";

import { type ReactNode } from "react";
import Device from "@/components/react-bits/device";
import {
  SHOT_AVIF_WIDTHS,
  SHOT_SIZE,
  SHOT_WEBP_WIDTHS,
  type ShotName,
} from "@/lib/shots";

export type { ShotName };

function srcSet(
  base: string,
  format: "avif" | "webp",
  widths: readonly number[]
): string {
  return widths.map((w) => `${base}-${w}.${format} ${w}w`).join(", ");
}

function Screen({
  base,
  alt,
  sizes,
  eager,
  className,
}: {
  base: string;
  alt: string;
  sizes: string;
  eager: boolean;
  className: string;
}): ReactNode {
  // picture 用 contents 不占盒子，img 直接按外层的宽高排。
  return (
    <picture className="contents">
      <source
        type="image/avif"
        srcSet={srcSet(base, "avif", SHOT_AVIF_WIDTHS)}
        sizes={sizes}
      />
      <img
        src={`${base}-${SHOT_SIZE.width}.webp`}
        srcSet={srcSet(base, "webp", SHOT_WEBP_WIDTHS)}
        sizes={sizes}
        alt={alt}
        width={SHOT_SIZE.width}
        height={SHOT_SIZE.height}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
        className={`block h-full w-full object-contain select-none ${className}`}
      />
    </picture>
  );
}

/**
 * 光屏幕层，不带手机边框，浅深两版跟着 `html.dark` 换。截图表与尺寸在 lib/shots.ts。
 * `sizes` 写屏幕层的显示宽度，手机边框每侧占机身宽的 1.9/35.6。
 *
 * 两张 img 叠着放、各由 `dark:` 决定显隐。被 `display: none` 的那张不进无障碍树，
 * 多数情况下浏览器也不会去取。唯独首屏那张要 eager，eager 绕开懒加载，深色下会
 * 白取一次浅色版；只有首屏一张，换来 LCP 不被推迟。
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
  const base = `/screenshots/zh/${name}`;
  return (
    <>
      <Screen
        base={base}
        alt={alt}
        sizes={sizes}
        eager={eager}
        className="dark:hidden"
      />
      <Screen
        base={`${base}-dark`}
        alt={alt}
        sizes={sizes}
        eager={false}
        className="hidden dark:block"
      />
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
    <Device className={className}>
      <ShotScreens name={name} alt={alt} sizes={sizes} eager={eager} />
    </Device>
  );
}
