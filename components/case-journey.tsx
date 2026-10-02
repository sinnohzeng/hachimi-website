"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Device from "@/components/react-bits/device";
import { ShotScreens, type ShotName } from "@/components/app-shot";
import { keepPanguSpaces } from "@/components/reveal-headline";
import type { Translations } from "@/lib/i18n";
import { useReducedMotion } from "@/lib/motion";
import { DUR, EASE, STAGGER, reveal } from "@/lib/motion-tokens";

/**
 * 第三节：一个人，一份命例（#case）。
 *
 * 桌面端一只钉住的手机随滚动换五屏，左侧同步换文字；窄屏与减弱动态退化成一张手机
 * 加一份有序步骤列表，字一个不少。
 *
 * 换屏是原地交叉渐变，照 App 里在这几屏之间切换的样子演。
 *
 * 断点靠 CSS 类分流而不是 JS 量宽度：静态导出的首帧必须与水合后一致，用
 * matchMedia 会在窄屏上先渲染桌面版再跳一下。减弱动态是 JS 才知道的事，只好条件
 * 渲染，代价是那一档会卸掉钉住那棵树。
 *
 * 两处要知道的做法，都是本机实测逼出来的：
 *
 * 一、钉住用 `position: sticky`，前提是 body 不能是滚动容器。app/globals.css 曾给 body
 * 写 `overflow-x: hidden`，按 CSS 规范这会把 body 的 `overflow-y` 算成 auto，body 就成了
 * 滚动容器，sticky 只认它、随页面一起滚走。现在 body 是 `overflow-x: clip`：只裁不滚，
 * sticky 照常认视口。别把它改回 hidden。
 *
 * 二、换屏不用 `useTransform` 把滚动进度接到 opacity 上。本站实测 MotionValue 驱动
 * 的 transform 每帧都更新，MotionValue 驱动的 opacity 却一直停在首帧的值，连客户端
 * 样式都没写进去。所以这里把滚动进度先落成一个步序 state，再用 `animate` 驱动，
 * opacity 走的是与全站入场动画同一条路，那条是好的。
 *
 * 五张截图的顺序写死在 SHOTS 里，与 i18n 的 case.steps、case.shotAlts 一一对应：
 * 改一处要三处一起改。
 */
const SHOTS = [
  "case-list",
  "ziwei-sanhe",
  "bazi-pillars",
  "cast-result",
  "case-casts",
] as const satisfies readonly ShotName[];

const STEP_COUNT = SHOTS.length;

/** 文字进出的位移档：上一步往上退，下一步从下面来。只是一点余韵，主角是淡入淡出。 */
const STEP_DRIFT = 12;

/** 新一屏淡入时从这一档缩回原大，淡出时反过来。 */
const SCREEN_SETTLE = 1.02;

/**
 * 屏幕层：五层按序叠放，后一层压在前一层上面。当前这屏与它之前的都不透明，后面的
 * 透明。往前滚是新一层在上面淡入，往回滚是最上面那层淡出，下面那层始终不透明，所以
 * 过渡当中不会露出机身底色。缩放放在里面那层，屏幕的圆角裁切不跟着动。
 */
function ScreenLayer({
  index,
  active,
  name,
  alt,
}: {
  index: number;
  active: number;
  name: ShotName;
  alt: string;
}): ReactNode {
  const shown = index <= active;

  return (
    <motion.div
      initial={false}
      animate={{ opacity: shown ? 1 : 0 }}
      transition={{ duration: DUR.slow, ease: EASE }}
      className="bg-muted absolute inset-0 overflow-hidden"
    >
      <motion.div
        initial={false}
        animate={{ scale: shown ? 1 : SCREEN_SETTLE }}
        transition={{ duration: DUR.slower, ease: EASE }}
        className="h-full w-full"
      >
        <ShotScreens
          name={name}
          alt={alt}
          sizes="(min-width: 1024px) 300px, 60vw"
        />
      </motion.div>
    </motion.div>
  );
}

function StepText({
  index,
  active,
  step,
}: {
  index: number;
  active: number;
  step: { title: string; body: string };
}): ReactNode {
  const isActive = index === active;

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isActive ? 1 : 0,
        y: isActive ? 0 : index < active ? -STEP_DRIFT : STEP_DRIFT,
      }}
      transition={{ duration: DUR.base, ease: EASE }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <div className="flex items-center gap-4">
        <span className="text-accent font-mono text-xs font-medium">
          0{index + 1}
        </span>
        <motion.span
          initial={false}
          animate={{ scaleX: isActive ? 1 : 0 }}
          transition={{ duration: DUR.base, ease: EASE }}
          style={{ originX: 0 }}
          className="bg-foreground/30 block h-px w-12"
        />
      </div>
      <h3 className="text-foreground mt-5 font-serif text-3xl leading-tight font-medium xl:text-4xl">
        {step.title}
      </h3>
      <p className="text-foreground/70 mt-4 max-w-sm leading-relaxed">
        {keepPanguSpaces(step.body)}
      </p>
    </motion.div>
  );
}

function SegmentTick({
  index,
  active,
}: {
  index: number;
  active: number;
}): ReactNode {
  return (
    <span className="bg-foreground/15 h-[3px] w-8 overflow-hidden rounded-full">
      <motion.span
        initial={false}
        animate={{ scaleX: index <= active ? 1 : 0 }}
        transition={{ duration: DUR.base, ease: EASE }}
        style={{ originX: 0 }}
        className="bg-accent block h-full w-full"
      />
    </span>
  );
}

/** 窄屏与减弱动态那一档：一张手机加有序步骤列表。 */
function StaticJourney({ t }: { t: Translations }): ReactNode {
  return (
    <div className="mx-auto mt-14 flex max-w-5xl flex-col gap-14 px-6 sm:px-8">
      <div className="flex justify-center">
        <Device
          className="w-56 sm:w-64"
          parallaxStrength={6}
          rotateStrength={2}
          autoAnimate={false}
        >
          {/* 垫一层 bg-muted：截图还没到位时屏幕是纸色而不是机身的黑，与钉住那档
              的 ScreenLayer 一致。 */}
          <div className="bg-muted h-full w-full">
            <ShotScreens
              name={SHOTS[0]}
              alt={t.case.shotAlts[0] ?? ""}
              sizes="(min-width: 640px) 256px, 224px"
            />
          </div>
        </Device>
      </div>
      <ol className="flex flex-col gap-10">
        {t.case.steps.map((step, i) => (
          <motion.li
            key={step.title}
            {...reveal(i * STAGGER.tight, { duration: DUR.base })}
          >
            <div className="flex items-center gap-4">
              <span className="text-accent font-mono text-xs font-medium">
                0{i + 1}
              </span>
              <span className="bg-foreground/30 block h-px w-12" />
            </div>
            <h3 className="text-foreground mt-4 font-serif text-2xl leading-tight font-medium sm:text-3xl">
              {step.title}
            </h3>
            <p className="text-foreground/70 mt-3 max-w-md leading-relaxed">
              {keepPanguSpaces(step.body)}
            </p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

export function CaseJourney({ t }: { t: Translations }): ReactNode {
  const reducedMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // 同值 setState 会被 React 直接短路，不会每帧重渲染。
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActive(
      Math.min(STEP_COUNT - 1, Math.max(0, Math.floor(value * STEP_COUNT)))
    );
  });

  return (
    <section
      id="case"
      className="bg-background text-foreground w-full scroll-mt-28 pt-24 sm:pt-32"
    >
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <motion.h2
          {...reveal()}
          className="text-center font-serif text-3xl leading-tight font-medium text-balance sm:text-4xl lg:text-5xl"
        >
          {t.case.title}
        </motion.h2>
        <motion.p
          {...reveal(0.1, { duration: DUR.base })}
          className="zh-display text-foreground/70 mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-balance"
        >
          {keepPanguSpaces(t.case.lead)}
        </motion.p>
      </div>

      {reducedMotion ? (
        <div className="pb-24 sm:pb-32">
          <StaticJourney t={t} />
        </div>
      ) : (
        <>
          {/* 钉住那一档：420svh 的滚动跑道，里面那块 sticky 在视口顶上。 */}
          <div ref={wrapperRef} className="relative hidden h-[420svh] lg:block">
            <div className="sticky top-0 flex h-svh items-center overflow-hidden">
              <div className="mx-auto grid w-full max-w-6xl grid-cols-[1fr_auto] items-center gap-x-16 px-10">
                <div className="relative h-[320px]">
                  {t.case.steps.map((step, i) => (
                    <StepText
                      key={step.title}
                      index={i}
                      active={active}
                      step={step}
                    />
                  ))}
                </div>

                <div className="flex flex-col items-center gap-6">
                  <Device
                    className="w-[min(300px,36svh)]"
                    parallaxStrength={6}
                    rotateStrength={2}
                    autoAnimate={false}
                  >
                    {SHOTS.map((name, i) => (
                      <ScreenLayer
                        key={name}
                        index={i}
                        active={active}
                        name={name}
                        alt={t.case.shotAlts[i] ?? ""}
                      />
                    ))}
                  </Device>
                  <div className="flex items-center gap-2" aria-hidden="true">
                    {SHOTS.map((name, i) => (
                      <SegmentTick key={name} index={i} active={active} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pb-24 sm:pb-32 lg:hidden">
            <StaticJourney t={t} />
          </div>
        </>
      )}
    </section>
  );
}
