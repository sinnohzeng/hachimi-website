"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/motion";

// Licensed React Bits Pro Device, installed via @reactbits-starter/device-tw.
// Local changes: responsive CSS proportions, children-only screen, fixed hover strengths,
// reduced motion. Source and update procedure: design/brand/README.md.

/** Hover parallax in px and rotation in degrees, the same on every surface. */
const PARALLAX = 6;
const ROTATE = 2;

export interface DeviceProps {
  /** Additional CSS classes for the wrapper */
  className?: string;

  /** Content to display inside the device screen */
  children: React.ReactNode;
}

export default function Device({
  className,
  children,
}: DeviceProps): React.ReactNode {
  const reducedMotion = useReducedMotion();
  const deviceRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const rotateZ = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 200,
    damping: 25,
    mass: 0.5,
  });
  const springY = useSpring(y, {
    stiffness: 200,
    damping: 25,
    mass: 0.5,
  });
  const springRotateX = useSpring(rotateX, {
    stiffness: 200,
    damping: 25,
    mass: 0.5,
  });
  const springRotateY = useSpring(rotateY, {
    stiffness: 200,
    damping: 25,
    mass: 0.5,
  });
  const springRotateZ = useSpring(rotateZ, {
    stiffness: 200,
    damping: 25,
    mass: 0.5,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !deviceRef.current) return;

    const rect = deviceRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = (e.clientX - centerX) / (rect.width / 2);
    const mouseY = (e.clientY - centerY) / (rect.height / 2);

    x.set(mouseX * PARALLAX);
    y.set(-mouseY * PARALLAX);
    rotateX.set(-mouseY * ROTATE);
    rotateY.set(mouseX * ROTATE);
    rotateZ.set(mouseX * ROTATE * 0.5);
  };

  const handleMouseEnter = () => {
    if (!reducedMotion) setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
    rotateZ.set(0);
  };

  return (
    <div
      className={cn(
        "[container-type:inline-size] relative block aspect-[356/722] w-full",
        className
      )}
      data-device="react-bits-pro"
      data-device-motion={reducedMotion ? "reduced" : "hover"}
    >
      <div
        className="absolute inset-0"
        style={{ fontSize: "calc(100cqw / 35.6)" }}
      >
        <motion.div
          ref={deviceRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            x: reducedMotion ? 0 : springX,
            y: reducedMotion ? 0 : springY,
            rotateX: reducedMotion ? 0 : springRotateX,
            rotateY: reducedMotion ? 0 : springRotateY,
            rotateZ: reducedMotion ? 0 : springRotateZ,
            transformStyle: "preserve-3d",
            display: "inline-block",
          }}
          animate={{
            scale: !reducedMotion && isHovering ? 1.02 : 1,
          }}
          transition={{
            scale: {
              type: "spring",
              stiffness: 300,
              damping: 25,
            },
          }}
          className="relative"
        >
          <div
            className={cn(
              "relative flex h-[72.2em] w-[35.6em] justify-center rounded-[6em] select-none",
              "bg-black transition-shadow duration-300"
            )}
            style={{
              boxShadow:
                !reducedMotion && isHovering
                  ? "0 30px 60px -12px rgba(0, 0, 0, 0.3), 0 18px 36px -18px rgba(0, 0, 0, 0.25)"
                  : "0 0 2em 1em rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="absolute inset-[1.9em] overflow-hidden rounded-[5em]">
              {children}
            </div>

            <div className="absolute top-[2.8em] left-1/2 z-10 flex h-[3.7em] w-[12.6em] -translate-x-1/2 items-center justify-between rounded-[3em] bg-black px-[1.5em]">
              <div className="flex shrink-0 gap-[0.25em]">
                <div
                  className="h-[0.4em] w-[0.4em] rounded-full"
                  style={{
                    backgroundColor: "#1a1a2e",
                    border: "0.1em solid #0a0a15",
                  }}
                />
                <div
                  className="h-[0.4em] w-[0.4em] rounded-full"
                  style={{
                    backgroundColor: "#1a1a2e",
                    border: "0.1em solid #0a0a15",
                  }}
                />
              </div>

              <div className="mx-[0.75em] flex flex-1 items-center justify-center gap-[0.15em]">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="h-[1.2em] w-[0.15em] rounded-full bg-[#0a0a15] opacity-60"
                  />
                ))}
              </div>

              <div
                className="h-[1.1em] w-[1.1em] shrink-0 rounded-full"
                style={{
                  backgroundColor: "#1a1a2e",
                  border: "0.15em solid #0a0a15",
                  boxShadow: "inset 0 0 0.3em rgba(0, 100, 200, 0.5)",
                }}
              />
            </div>

            <div
              className="absolute top-[9.8em] left-[-0.2em] h-[2.5em] w-[0.3em] rounded-tl-[0.3em] rounded-bl-[0.3em] bg-[#484848]"
              style={{
                border: "0.1em solid rgba(0, 0, 0, 0.1)",
                borderRight: "none",
              }}
            />

            <div
              className="absolute top-[15em] left-[-0.2em] h-[5em] w-[0.3em] rounded-tl-[0.3em] rounded-bl-[0.3em] bg-[#484848]"
              style={{
                border: "0.1em solid rgba(0, 0, 0, 0.1)",
                borderRight: "none",
              }}
            />

            <div
              className="absolute top-[21.6em] left-[-0.2em] h-[5em] w-[0.3em] rounded-tl-[0.3em] rounded-bl-[0.3em] bg-[#484848]"
              style={{
                border: "0.1em solid rgba(0, 0, 0, 0.1)",
                borderRight: "none",
              }}
            />

            <div
              className="absolute top-[16.9em] right-[-0.3em] h-[5em] w-[0.3em] rounded-tl-[0.3em] rounded-bl-[0.3em] bg-[#484848]"
              style={{
                border: "0.1em solid rgba(0, 0, 0, 0.1)",
                borderRight: "none",
                transform: "rotate(180deg)",
              }}
            />

            <div className="pointer-events-none absolute inset-0 rounded-[6em] border-[0.4em] border-[#484848]" />

            <div className="pointer-events-none absolute inset-[0.3em] rounded-[5.6em] border-[1.6em] border-black" />

            <div
              className="pointer-events-none absolute inset-[1.1em] rounded-[5em] border-[0.3em] border-[#484848] opacity-50"
              style={{ filter: "blur(1px)" }}
            />

            <div
              className="pointer-events-none absolute inset-[0.7em] rounded-[5.6em] border-[0.4em] border-[#bcbcbc] opacity-50"
              style={{ filter: "blur(1px)" }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
