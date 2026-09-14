"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import type { Translations } from "@/lib/i18n";
import { useReducedMotion } from "@/lib/motion";
import { DUR, STAGGER, reveal } from "@/lib/motion-tokens";

// 只放核得出处的产品事实，不编用户指标。逐条出处：随包古籍 154 本 2408 章与
// 词条 287 条（spec 045）、格局规则 84 条（spec 034）、紫微盘式三种（spec 031）、
// 山医命相卜五科（spec 045）、限流面板出厂七层（spec 032）、无需账号。
// 顺序与 i18n 的 stats.items 一一对应，改一处必须两处一起改。
const statsData = [
  { value: 154, suffix: "" },
  { value: 2408, suffix: "" },
  { value: 287, suffix: "" },
  { value: 84, suffix: "" },
  { value: 3, suffix: "" },
  { value: 5, suffix: "" },
  { value: 7, suffix: "" },
  { value: 0, suffix: "" },
];

function AnimatedCounter({
  value,
  suffix,
  prefix = "",
  duration = 2000,
}: {
  value: number;
  suffix: string;
  prefix?: string;
  duration?: number;
}): ReactNode {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const hasAnimated = useRef(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // 减动效用户不跑计数动画（渲染端直接显示终值，见下方 display）。
    if (reducedMotion || !isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const isDecimal = value % 1 !== 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = easeOut * value;

      setCount(
        isDecimal
          ? Math.round(currentValue * 10) / 10
          : Math.floor(currentValue)
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration, reducedMotion]);

  const display = reducedMotion ? value : count;

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display.toLocaleString("en-US", {
        minimumFractionDigits: value % 1 !== 0 ? 1 : 0,
        maximumFractionDigits: 1,
      })}
      {suffix}
    </span>
  );
}

export function Stats({ t }: { t: Translations }): ReactNode {
  return (
    <section
      id="tech"
      className="bg-muted relative w-full scroll-mt-28 overflow-hidden pt-4 pb-16 sm:pt-6 sm:pb-20"
    >
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4 lg:gap-x-12">
          {statsData.map((stat, index) => (
            <motion.div
              key={t.stats.items[index]?.label ?? index}
              {...reveal(index * STAGGER.grid, { duration: DUR.base })}
              className="flex flex-col items-center text-center"
            >
              <div className="text-foreground mb-2 font-serif text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-foreground/70 text-sm sm:text-base">
                {t.stats.items[index]?.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
