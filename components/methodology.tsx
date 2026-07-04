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
        <span className="font-mono text-sm font-medium text-accent">{step}</span>
        <span className="h-px w-8 bg-accent/40" />
        <span className="inline-flex items-center gap-1.5 text-sm font-medium tracking-wide text-foreground/60">
          <span className="text-accent">{icon}</span>
          {kicker}
        </span>
      </motion.div>
      <motion.h2
        {...fade(0.05)}
        className="mt-5 font-serif text-2xl leading-snug font-medium text-foreground sm:text-3xl"
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
      <section className="relative w-full overflow-hidden bg-background pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-accent/[0.07] to-transparent"
        />
        <div className="relative mx-auto max-w-3xl px-6 sm:px-8">
          <motion.div {...fade()} className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent" strokeWidth={1.5} />
            <span className="text-sm font-medium text-foreground/60">
              {m.badge}
            </span>
          </motion.div>
          <motion.h1
            {...fade(0.05)}
            className="mt-6 font-serif text-4xl leading-tight font-medium text-foreground sm:text-5xl"
          >
            {m.title1}
            <span className="italic">{m.title2}</span>
          </motion.h1>
          <motion.p
            {...fade(0.1)}
            className="mt-6 text-base leading-relaxed text-foreground/70 sm:text-lg"
          >
            {m.intro}
          </motion.p>
        </div>
      </section>

      {/* ---- Step 01 · The cast ---- */}
      <section className="relative w-full border-t border-border bg-muted/40 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <StepHeader
            step={m.cast.step}
            kicker={m.cast.kicker}
            title={m.cast.title}
            icon={stepIcons[0]}
          />
          <motion.p
            {...fade(0.1)}
            className="mt-6 leading-relaxed text-foreground/70"
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
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                />
                <div>
                  <h3 className="font-medium text-foreground">{p.term}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/60">
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Fingerprint chip */}
          <motion.div
            {...fade(0.2)}
            className="mt-10 rounded-lg border border-accent/20 bg-accent/[0.04] p-5"
          >
            <div className="flex items-center gap-2">
              <Fingerprint className="h-4 w-4 text-accent" strokeWidth={1.5} />
              <span className="text-xs font-medium tracking-wide text-foreground/70">
                {m.cast.fingerprintLabel}
              </span>
            </div>
            <p className="mt-3 overflow-x-auto font-mono text-xs leading-relaxed break-all text-foreground/80">
              {SAMPLE_FINGERPRINT}
            </p>
            <p className="mt-3 text-xs text-foreground/50">
              {m.cast.fingerprintNote}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ---- Step 02 · The reading ---- */}
      <section className="relative w-full border-t border-border bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <StepHeader
            step={m.ai.step}
            kicker={m.ai.kicker}
            title={m.ai.title}
            icon={stepIcons[1]}
          />
          <motion.p
            {...fade(0.1)}
            className="mt-6 leading-relaxed text-foreground/70"
          >
            {m.ai.body}
          </motion.p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* What the AI writes */}
            <motion.div
              {...fade(0.12)}
              className="rounded-lg border border-border bg-muted/30 p-6"
            >
              <div className="mb-4 flex items-center gap-2">
                <PenLine className="h-4 w-4 text-foreground/60" strokeWidth={1.5} />
                <h3 className="text-sm font-semibold text-foreground">
                  {m.ai.writesTitle}
                </h3>
              </div>
              <ul className="space-y-3">
                {m.ai.writes.map((item) => (
                  <li
                    key={item}
                    className="text-sm leading-relaxed text-foreground/70"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* What the system locks */}
            <motion.div
              {...fade(0.18)}
              className="rounded-lg border border-accent/30 bg-accent/[0.05] p-6"
            >
              <div className="mb-4 flex items-center gap-2">
                <Lock className="h-4 w-4 text-accent" strokeWidth={1.5} />
                <h3 className="text-sm font-semibold text-foreground">
                  {m.ai.lockedTitle}
                </h3>
              </div>
              <ul className="space-y-3">
                {m.ai.locked.map((item) => (
                  <li
                    key={item}
                    className="text-sm leading-relaxed text-foreground/80"
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
      <section className="relative w-full border-t border-border bg-muted/40 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <StepHeader
            step={m.eval.step}
            kicker={m.eval.kicker}
            title={m.eval.title}
            icon={stepIcons[2]}
          />
          <motion.p
            {...fade(0.1)}
            className="mt-6 leading-relaxed text-foreground/70"
          >
            {m.eval.body}
          </motion.p>

          {/* Stat tiles */}
          <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {m.eval.stats.map((s, i) => (
              <motion.div
                key={s.label}
                {...fade(0.1 + i * 0.06)}
                className="flex flex-col rounded-lg border border-border bg-background p-5"
              >
                <span className="font-serif text-2xl font-medium text-foreground sm:text-3xl">
                  {s.value}
                </span>
                <span className="mt-2 text-xs leading-relaxed text-foreground/55">
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
                className="flex gap-4 rounded-lg border border-border bg-background p-6"
              >
                <span className="mt-0.5 shrink-0 text-accent">
                  {i === 0 ? (
                    <ShieldCheck className="h-5 w-5" strokeWidth={1.5} />
                  ) : (
                    <Scale className="h-5 w-5" strokeWidth={1.5} />
                  )}
                </span>
                <div>
                  <h3 className="font-medium text-foreground">{layer.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/60">
                    {layer.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- What the Master won't do ---- */}
      <section className="relative w-full border-t border-border bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 sm:px-8">
          <div className="mx-auto max-w-3xl">
            <motion.span
              {...fade()}
              className="text-sm font-medium tracking-wide text-accent"
            >
              {m.limits.kicker}
            </motion.span>
            <motion.h2
              {...fade(0.05)}
              className="mt-4 font-serif text-2xl leading-snug font-medium text-foreground sm:text-3xl"
            >
              {m.limits.title}
            </motion.h2>
            <motion.p
              {...fade(0.1)}
              className="mt-5 leading-relaxed text-foreground/70"
            >
              {m.limits.body}
            </motion.p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {m.limits.cards.map((card, i) => (
              <motion.div
                key={card.title}
                {...fade(0.1 + i * 0.08)}
                className="rounded-lg border border-border bg-muted/30 p-6"
              >
                <span className="text-accent">{limitIcons[i]}</span>
                <h3 className="mt-4 font-serif text-lg font-medium text-foreground">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Closing ---- */}
      <section className="relative w-full border-t border-border bg-muted/40 py-20 sm:py-28">
        <div className="mx-auto max-w-2xl px-6 text-center sm:px-8">
          <motion.p
            {...fade()}
            className="font-serif text-xl leading-relaxed font-medium text-foreground sm:text-2xl"
          >
            {m.closing.text}
          </motion.p>
          <motion.div
            {...fade(0.1)}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href={`/${locale}#features`}
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              {m.closing.ctaHome}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={`/${locale}/privacy`}
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground/80 transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              {m.closing.ctaPrivacy}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
