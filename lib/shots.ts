/**
 * 站上的 App 截图，页面（components/app-shot.tsx）与生成脚本（scripts/build-shots.mjs）
 * 共用这一份。每张都出浅深两版、两档宽度，文件在 public/screenshots/zh/
 * `<name>-<宽>.webp` 与 `<name>-dark-<宽>.webp`。
 *
 * 截图拍的是中文界面，en 页共用同一批文件。
 */
export const SHOT_NAMES = [
  "case-list",
  "ziwei-sanhe",
  "bazi-pillars",
  "cast-result",
  "case-casts",
] as const;

export type ShotName = (typeof SHOT_NAMES)[number];

/** 每张出的宽度档，最后一档是原尺寸。 */
export const SHOT_WIDTHS = [660, 1320] as const;

/** iPhone 17 Pro Max 整屏。 */
export const SHOT_SIZE = { width: 1320, height: 2868 } as const;

/** 命例走查换屏的顺序。i18n 的 case.steps 按这张表的长度定型，一步一屏。 */
export const JOURNEY_SHOTS = [
  "case-list",
  "ziwei-sanhe",
  "bazi-pillars",
  "cast-result",
  "case-casts",
] as const satisfies readonly ShotName[];

/** 走查的每一步配上它那一屏。i18n 的步数由类型钉成与 JOURNEY_SHOTS 等长，这里不会越界。 */
export function journeyWithShots<T>(
  steps: readonly T[] & { length: (typeof JOURNEY_SHOTS)["length"] }
): { shot: ShotName; step: T }[] {
  return JOURNEY_SHOTS.map((shot, i) => ({ shot, step: steps[i] as T }));
}
