"use client";

import { useRef, type ReactNode } from "react";
import { EASE_OUT, gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
};

const offsets = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
  none: {},
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const element = ref.current;
      if (!element || reducedMotion) return;

      gsap.from(element, {
        autoAlpha: 0,
        ...offsets[direction],
        duration: 0.6,
        ease: EASE_OUT,
        delay,
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: ref, dependencies: [reducedMotion, delay, direction] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
