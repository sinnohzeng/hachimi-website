"use client";

import { type ReactNode } from "react";
import { Showcase, type ShotName } from "@/components/showcase";
import type { Translations } from "@/lib/i18n";

// 学堂只有一行：根屏、书那一页、阅读页，顺序对 academy.shotAlts。
const ACADEMY_SHOTS: readonly (readonly ShotName[])[] = [
  ["academy-home", "academy-book", "academy-reading"],
];

export function AcademyShowcase({ t }: { t: Translations }): ReactNode {
  return (
    <Showcase
      id="academy"
      kicker={t.academy.kicker}
      title={t.academy.title}
      subtitle={t.academy.subtitle}
      blocks={[
        {
          // 抬头由 section 头部承担，block 这一层留空。
          kicker: "",
          title: "",
          body: t.academy.body,
          bullets: t.academy.bullets,
          shotAlts: t.academy.shotAlts,
        },
      ]}
      shots={ACADEMY_SHOTS}
    />
  );
}
