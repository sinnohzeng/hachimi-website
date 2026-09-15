"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/motion";
import type { OrbModel } from "@/lib/orb/types";

let modelPromise: Promise<OrbModel> | undefined;
function loadModel(): Promise<OrbModel> {
  modelPromise ??= fetch("/brand/orb-model.json")
    .then(async (response) => {
      if (!response.ok) throw new Error("Orb asset unavailable");
      const model = (await response.json()) as OrbModel;
      if (model.schema !== 1 || model.behaviors.length !== 35)
        throw new Error("Orb asset version mismatch");
      return model;
    })
    .catch((error) => {
      modelPromise = undefined;
      throw error;
    });
  return modelPromise;
}

export function CatOrb({
  program = "hero",
  className = "",
}: {
  program?: string;
  className?: string;
}): ReactNode {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const element = host.current,
      surface = canvas.current;
    if (!element || !surface || reduced) return;
    let disposed = false,
      visible = false,
      raf = 0,
      last = 0,
      pointerAt = -Infinity;
    let stop: (() => void) | undefined;
    let wake = (): void => {};
    const observer = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? false;
      if (!visible) {
        last = 0;
        stop?.();
        cancelAnimationFrame(raf);
        raf = 0;
      } else {
        wake();
      }
    });
    observer.observe(element);
    Promise.all([
      loadModel(),
      import("@/lib/orb/motion"),
      import("@/lib/orb/painter"),
    ])
      .then(([model, { OrbMotion }, { OrbPainter }]) => {
        if (disposed) return;
        const engine = new OrbMotion(model, program);
        const painter = new OrbPainter(surface, model);
        const clear = (): void => {
          engine.pointer = null;
          pointerAt = -Infinity;
        };
        stop = clear;
        const pointer = (event: PointerEvent): void => {
          if (!visible || document.hidden) return;
          const rect = element.getBoundingClientRect();
          engine.pointer = {
            x: (event.clientX - rect.left - rect.width / 2) / (rect.width / 2),
            y: (event.clientY - rect.top - rect.height / 2) / (rect.height / 2),
          };
          pointerAt =
            event.pointerType === "touch" ? performance.now() : Infinity;
        };
        const visibility = (): void => {
          last = 0;
          clear();
          cancelAnimationFrame(raf);
          raf = 0;
          if (!document.hidden) wake();
        };
        const frame = (now: number): void => {
          raf = 0;
          if (disposed) return;
          if (visible && !document.hidden) {
            if (now - pointerAt > 1500) clear();
            painter.resize(element.getBoundingClientRect().width);
            painter.paint(engine.advance(last ? (now - last) / 1000 : 0));
            element.dataset.orbState = engine.behavior.id;
            element.dataset.orbTime = engine.time.toFixed(3);
            element.dataset.orbGaze = engine
              .frame()
              .gaze.map((v) => v.toFixed(2))
              .join(",");
            element.dataset.orbReady = "true";
            last = now;
          } else {
            last = 0;
          }
          if (visible && !document.hidden) raf = requestAnimationFrame(frame);
        };
        wake = (): void => {
          if (!disposed && visible && !document.hidden && !raf)
            raf = requestAnimationFrame(frame);
        };
        window.addEventListener("pointermove", pointer, { passive: true });
        window.addEventListener("pointerdown", pointer, { passive: true });
        document.documentElement.addEventListener("pointerleave", clear);
        window.addEventListener("blur", visibility);
        document.addEventListener("visibilitychange", visibility);
        wake();
        stop = (): void => {
          clear();
          if (!disposed) return;
          window.removeEventListener("pointermove", pointer);
          window.removeEventListener("pointerdown", pointer);
          document.documentElement.removeEventListener("pointerleave", clear);
          window.removeEventListener("blur", visibility);
          document.removeEventListener("visibilitychange", visibility);
          painter.dispose();
        };
      })
      .catch(() => {
        delete element.dataset.orbReady;
      });
    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(raf);
      stop?.();
      delete element.dataset.orbReady;
    };
  }, [program, reduced]);

  return (
    <div
      ref={host}
      className={`group/orb pointer-events-none relative aspect-square ${className}`}
      aria-hidden="true"
      data-orb-program={program}
    >
      <Image
        src="/brand/orb-idle.png"
        alt=""
        width={800}
        height={800}
        unoptimized
        className="absolute inset-0 h-full w-full object-contain group-data-[orb-ready=true]/orb:invisible"
      />
      <canvas
        ref={canvas}
        className="invisible absolute inset-0 h-full w-full group-data-[orb-ready=true]/orb:visible"
      />
    </div>
  );
}
