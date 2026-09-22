"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { academyMarqueeItems } from "@/lib/academy-titles";
import { keepPanguSpaces } from "@/components/reveal-headline";
import type { Translations } from "@/lib/i18n";
import { useReducedMotion } from "@/lib/motion";
import { reveal } from "@/lib/motion-tokens";

/**
 * 第六节：学堂（#academy）。一句话加一条书名跑马灯，不放截图。
 *
 * 跑的是随包古籍的真书名，表在 lib/academy-titles.ts；英文页跑五科科名与书名拼音。
 * 滚动越快跑得越快，反向滚动会倒着跑。
 *
 * 可达性：滚动的那条是同一批字重复五份的装饰层，整条 aria-hidden；书名本体另出一
 * 份 sr-only 列表，读屏只读一遍。减弱动态时换成可横向滚动的静态一排。
 */
const COPIES = 5;
const SET_FRACTION = 100 / COPIES;
const BASE_SPEED = 0.5;
const MAX_VELOCITY_BOOST = 4;

function wrap(min: number, max: number, value: number): number {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

type Item = { key: string; label: string; isSubject: boolean };

function Chip({ item }: { item: Item }): ReactNode {
  return item.isSubject ? (
    <span className="text-accent mr-6 shrink-0 font-serif text-2xl leading-none font-medium sm:text-3xl">
      {item.label}
    </span>
  ) : (
    <span className="text-foreground/70 border-foreground/10 mr-3 shrink-0 rounded-full border px-4 py-2 text-sm whitespace-nowrap">
      {item.label}
    </span>
  );
}

function MarqueeRow({
  items,
  direction,
}: {
  items: readonly Item[];
  direction: 1 | -1;
}): ReactNode {
  const baseX = useMotionValue(direction === 1 ? -SET_FRACTION / 2 : 0);
  const directionFactor = useRef<number>(direction);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(
    smoothVelocity,
    [0, 1200],
    [0, MAX_VELOCITY_BOOST],
    { clamp: false }
  );

  const x = useTransform(baseX, (value) => `${wrap(-SET_FRACTION, 0, value)}%`);

  useAnimationFrame((_, delta) => {
    const step = BASE_SPEED * (delta / 1000);
    const boost = velocityFactor.get();
    if (boost < 0) directionFactor.current = -direction;
    else if (boost > 0) directionFactor.current = direction;
    baseX.set(
      baseX.get() + directionFactor.current * step * (1 + Math.abs(boost)) * -1
    );
  });

  return (
    <div className="overflow-hidden" aria-hidden="true">
      <motion.div style={{ x }} className="flex w-max items-center">
        {Array.from({ length: COPIES }, (_, copy) =>
          items.map((item) => <Chip key={`${copy}-${item.key}`} item={item} />)
        )}
      </motion.div>
    </div>
  );
}

function StaticRow({ items }: { items: readonly Item[] }): ReactNode {
  return (
    <div
      className="scrollbar-hide overflow-x-auto px-6 sm:px-8"
      aria-hidden="true"
    >
      <div className="flex w-max items-center">
        {items.map((item) => (
          <Chip key={item.key} item={item} />
        ))}
      </div>
    </div>
  );
}

export function AcademyMarquee({
  locale,
  t,
}: {
  locale: string;
  t: Translations;
}): ReactNode {
  const reducedMotion = useReducedMotion();
  const items = academyMarqueeItems(locale);
  const half = Math.ceil(items.length / 2);
  const rowA = items.slice(0, half);
  const rowB = items.slice(half);

  return (
    <section
      id="academy"
      className="bg-muted text-foreground w-full scroll-mt-28 overflow-hidden py-20 sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        <motion.p
          {...reveal()}
          className="text-center font-serif text-xl leading-relaxed font-medium text-balance sm:text-2xl md:text-3xl"
        >
          {keepPanguSpaces(t.academy.text)}
        </motion.p>
      </div>

      <div className="mt-12 flex flex-col gap-4">
        {reducedMotion ? (
          <>
            <StaticRow items={rowA} />
            <StaticRow items={rowB} />
          </>
        ) : (
          <>
            <MarqueeRow items={rowA} direction={1} />
            <MarqueeRow items={rowB} direction={-1} />
          </>
        )}
      </div>

      <ul className="sr-only">
        {items.map((item) => (
          <li key={item.key}>{item.label}</li>
        ))}
      </ul>
    </section>
  );
}
