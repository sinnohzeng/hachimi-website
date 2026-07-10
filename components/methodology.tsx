"use client";

import { type ReactNode } from "react";
import {
  Sparkles,
  Repeat,
  Fingerprint,
  PenLine,
  Lock,
  ShieldCheck,
  Scale,
  Ban,
  CircleSlash,
  Popcorn,
  Smartphone,
  ArrowRight,
} from "lucide-react";
import { motion } from "motion/react";
import { StoreBadges } from "@/components/store-badges";
import type { Translations } from "@/lib/i18n";

const ease = [0.16, 1, 0.3, 1] as const;

// Illustrative SHA-256 digest shown in the fingerprint chip. Decorative only —
// the copy labels it as an example; it is not a real user's cast.
const SAMPLE_FINGERPRINT =
  "9f2c1e7a4b6d8035c1af92e6d47b0a8f3e5c9d21b7a640fe8c3d9152a06e4b7d";

const stepIcons = [
  <Repeat key="cast" className="h-5 w-5" strokeWidth={1.5} />,
  <Sparkles key="ai" className="h-5 w-5" strokeWidth={1.5} />,
  <ShieldCheck key="eval" className="h-5 w-5" strokeWidth={1.5} />,
];

const limitIcons = [
  <Ban key="predict" className="h-6 w-6" strokeWidth={1.25} />,
  <CircleSlash key="luck" className="h-6 w-6" strokeWidth={1.25} />,
  <Popcorn key="fun" className="h-6 w-6" strokeWidth={1.25} />,
  <Smartphone key="device" className="h-6 w-6" strokeWidth={1.25} />,
];

function fade(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, delay, ease },
  };
}

function StepHeader({
  step,
  kicker,
  title,
  icon,
}: {
  step: string;
  kicker: string;
  title: string;
  icon: ReactNode;
}): ReactNode {
  return (
    <div className="flex flex-col">
      <motion.div {...fade()} className="flex items-center gap-3">
        <span className="text-accent font-mono text-sm font-medium">
          {step}
        </span>
        <span className="bg-accent/40 h-px w-8" />
        <span className="text-foreground/60 inline-flex items-center gap-1.5 text-sm font-medium tracking-wide">
          <span className="text-accent">{icon}</span>
          {kicker}
        </span>
      </motion.div>
      <motion.h2
        {...fade(0.05)}
        className="text-foreground mt-5 font-serif text-2xl leading-snug font-medium sm:text-3xl"
      >
        {title}
      </motion.h2>
    </div>
  );
}

export function Methodology({
  t,
  locale,
}: {
  t: Translations;
  locale: string;
}): ReactNode {
  const m = t.methodology;

  return (
    <div className="relative w-full">
      {/* ---- Hero ---- */}
      <section className="bg-background relative w-full overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div
          aria-hidden="true"
          className="from-accent/[0.07] pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b to-transparent"
        />
        <div className="relative mx-auto max-w-3xl px-6 sm:px-8">
          <motion.div {...fade()} className="flex items-center gap-2">
            <Sparkles className="text-accent h-4 w-4" strokeWidth={1.5} />
            <span className="text-foreground/60 text-sm font-medium">
              {m.badge}
            </span>
          </motion.div>
          <motion.h1
            {...fade(0.05)}
            className="text-foreground mt-6 font-serif text-4xl leading-tight font-medium sm:text-5xl"
          >
            {m.title1} <span className="italic">{m.title2}</span>
          </motion.h1>
          <motion.p
            {...fade(0.1)}
            className="text-foreground/70 mt-6 text-base leading-relaxed sm:text-lg"
          >
            {m.intro}
          </motion.p>
          {/* 可见"最后更新"：与 lib/config.ts 的 pageDates.methodology 保持一致
              （AI 引擎信息保鲜的日期信号，页面可见文本与机器可读日期须相同）。 */}
          <motion.p {...fade(0.15)} className="text-foreground/40 mt-6 text-sm">
            {m.lastUpdated}
          </motion.p>
        </div>
      </section>

      {/* ---- Step 01 · The cast ---- */}
      <section className="border-border bg-muted/40 relative w-full border-t py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <StepHeader
            step={m.cast.step}
            kicker={m.cast.kicker}
            title={m.cast.title}
            icon={stepIcons[0]}
          />
          <motion.p
            {...fade(0.1)}
            className="text-foreground/70 mt-6 leading-relaxed"
          >
            {m.cast.body}
          </motion.p>

          <div className="mt-10 space-y-5">
            {m.cast.points.map((p, i) => (
              <motion.div
                key={p.term}
                {...fade(0.1 + i * 0.08)}
                className="flex gap-4"
              >
                <span
                  aria-hidden="true"
                  className="bg-accent mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                />
                <div>
                  <h3 className="text-foreground font-medium">{p.term}</h3>
                  <p className="text-foreground/60 mt-1 text-sm leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Fingerprint chip */}
          <motion.div
            {...fade(0.2)}
            className="border-accent/20 bg-accent/[0.04] mt-10 rounded-lg border p-5"
          >
            <div className="flex items-center gap-2">
              <Fingerprint className="text-accent h-4 w-4" strokeWidth={1.5} />
              <span className="text-foreground/70 text-xs font-medium tracking-wide">
                {m.cast.fingerprintLabel}
              </span>
            </div>
            <p className="text-foreground/80 mt-3 overflow-x-auto font-mono text-xs leading-relaxed break-all">
              {SAMPLE_FINGERPRINT}
            </p>
            <p className="text-foreground/50 mt-3 text-xs">
              {m.cast.fingerprintNote}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---- Step 02 · The reading ---- */}
      <section className="border-border bg-background relative w-full border-t py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <StepHeader
            step={m.ai.step}
            kicker={m.ai.kicker}
            title={m.ai.title}
            icon={stepIcons[1]}
          />
          <motion.p
            {...fade(0.1)}
            className="text-foreground/70 mt-6 leading-relaxed"
          >
            {m.ai.body}
          </motion.p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* What the AI writes */}
            <motion.div
              {...fade(0.12)}
              className="border-border bg-muted/30 rounded-lg border p-6"
            >
              <div className="mb-4 flex items-center gap-2">
                <PenLine
                  className="text-foreground/60 h-4 w-4"
                  strokeWidth={1.5}
                />
                <h3 className="text-foreground text-sm font-semibold">
                  {m.ai.writesTitle}
                </h3>
              </div>
              <ul className="space-y-3">
                {m.ai.writes.map((item) => (
                  <li
                    key={item}
                    className="text-foreground/70 text-sm leading-relaxed"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* What the system locks */}
            <motion.div
              {...fade(0.18)}
              className="border-accent/30 bg-accent/[0.05] rounded-lg border p-6"
            >
              <div className="mb-4 flex items-center gap-2">
                <Lock className="text-accent h-4 w-4" strokeWidth={1.5} />
                <h3 className="text-foreground text-sm font-semibold">
                  {m.ai.lockedTitle}
                </h3>
              </div>
              <ul className="space-y-3">
                {m.ai.locked.map((item) => (
                  <li
                    key={item}
                    className="text-foreground/80 text-sm leading-relaxed"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---- Step 03 · The eval gate ---- */}
      <section className="border-border bg-muted/40 relative w-full border-t py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <StepHeader
            step={m.eval.step}
            kicker={m.eval.kicker}
            title={m.eval.title}
            icon={stepIcons[2]}
          />
          <motion.p
            {...fade(0.1)}
            className="text-foreground/70 mt-6 leading-relaxed"
          >
            {m.eval.body}
          </motion.p>

          {/* Stat tiles */}
          <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {m.eval.stats.map((s, i) => (
              <motion.div
                key={s.label}
                {...fade(0.1 + i * 0.06)}
                className="border-border bg-background flex flex-col rounded-lg border p-5"
              >
                <span className="text-foreground font-serif text-2xl font-medium sm:text-3xl">
                  {s.value}
                </span>
                <span className="text-foreground/55 mt-2 text-xs leading-relaxed">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Two eval layers */}
          <div className="mt-6 space-y-4">
            {m.eval.layers.map((layer, i) => (
              <motion.div
                {...fade(0.14 + i * 0.08)}
                key={layer.name}
                className="border-border bg-background flex gap-4 rounded-lg border p-6"
              >
                <span className="text-accent mt-0.5 shrink-0">
                  {i === 0 ? (
                    <ShieldCheck className="h-5 w-5" strokeWidth={1.5} />
                  ) : (
                    <Scale className="h-5 w-5" strokeWidth={1.5} />
                  )}
                </span>
                <div>
                  <h3 className="text-foreground font-medium">{layer.name}</h3>
                  <p className="text-foreground/60 mt-1.5 text-sm leading-relaxed">
                    {layer.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- What the Master won't do ---- */}
      <section className="border-border bg-background relative w-full border-t py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 sm:px-8">
          <div className="mx-auto max-w-3xl">
            <motion.span
              {...fade()}
              className="text-accent text-sm font-medium tracking-wide"
            >
              {m.limits.kicker}
            </motion.span>
            <motion.h2
              {...fade(0.05)}
              className="text-foreground mt-4 font-serif text-2xl leading-snug font-medium sm:text-3xl"
            >
              {m.limits.title}
            </motion.h2>
            <motion.p
              {...fade(0.1)}
              className="text-foreground/70 mt-5 leading-relaxed"
            >
              {m.limits.body}
            </motion.p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {m.limits.cards.map((card, i) => (
              <motion.div
                key={card.title}
                {...fade(0.1 + i * 0.08)}
                className="border-border bg-muted/30 rounded-lg border p-6"
              >
                <span className="text-accent">{limitIcons[i]}</span>
                <h3 className="text-foreground mt-4 font-serif text-lg font-medium">
                  {card.title}
                </h3>
                <p className="text-foreground/60 mt-2 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Closing ---- */}
      <section className="border-border bg-muted/40 relative w-full border-t py-20 sm:py-28">
        <div className="mx-auto max-w-2xl px-6 text-center sm:px-8">
          <motion.p
            {...fade()}
            className="text-foreground font-serif text-xl leading-relaxed font-medium sm:text-2xl"
          >
            {m.closing.text}
          </motion.p>
          {/* 下载闭环：被技术叙事说服的读者就地下载，不必回首页再找入口。 */}
          <motion.div {...fade(0.1)} className="mt-8">
            <StoreBadges locale={locale} t={t} className="justify-center" />
          </motion.div>
          <motion.div
            {...fade(0.15)}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href={`/${locale}/privacy`}
              className="border-border text-foreground/80 hover:border-foreground/30 hover:text-foreground inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-colors"
            >
              {m.closing.ctaPrivacy}
            </a>
            <a
              href={`/${locale}#features`}
              className="group text-foreground/60 hover:text-foreground inline-flex items-center gap-1 px-2 py-3 text-sm transition-colors"
            >
              {m.closing.ctaHome}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
