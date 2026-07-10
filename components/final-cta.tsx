"use client";

import { type ReactNode } from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { StoreBadges } from "@/components/store-badges";
import type { Translations } from "@/lib/i18n";

const ease = [0.16, 1, 0.3, 1] as const;

// three.js 随 shader 组件按需加载，不进首屏共享 vendor chunk（LCP 修复，与 hero 同型）。
// 本区块在页面末端，shader 分包加载期间由 section 默认背景顶住，无需渐变兜底。
const FinalCtaShader = dynamic(
  () =>
    import("@/components/final-cta-shader").then((mod) => mod.FinalCtaShader),
  { ssr: false }
);

export function FinalCTA({
  locale,
  t,
}: {
  locale: string;
  t: Translations;
}): ReactNode {
  return (
    // id="download"：header 与移动菜单"下载 App"CTA 的落点。
    <section
      id="download"
      className="relative flex min-h-[20vh] w-full items-center justify-center overflow-hidden"
    >
      <FinalCtaShader />
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center sm:px-8 sm:py-32">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-foreground mx-auto max-w-md font-serif text-4xl leading-tight font-medium md:text-5xl"
        >
          {t.finalCta.headline}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <StoreBadges locale={locale} t={t} className="justify-center" />
          <p className="text-foreground/60 text-sm">{t.finalCta.note}</p>
        </motion.div>
      </div>
    </section>
  );
}
