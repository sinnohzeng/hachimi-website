"use client";

import { type ReactNode } from "react";
import { Showcase, type ShotName } from "@/components/showcase";
import type { Translations } from "@/lib/i18n";

// 每个 block 配哪几张截图，顺序对 block.shotAlts。文件名是 App 内的屏名，
// 与 hachimi-ios 走查截图一一对得上。
const CHART_SHOTS: readonly (readonly ShotName[])[] = [
  ["ziwei-fortune", "ziwei-geju"],
  ["bazi-pillars", "bazi-sixpillars"],
  ["ziwei-glossary"],
];

export function ChartShowcase({ t }: { t: Translations }): ReactNode {
  return (
    <Showcase
      id="chart"
      kicker={t.chart.kicker}
      title={t.chart.title}
      subtitle={t.chart.subtitle}
      blocks={t.chart.blocks}
      shots={CHART_SHOTS}
      tinted
    />
  );
}
