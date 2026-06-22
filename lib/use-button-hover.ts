"use client";

import { useRef } from "react";
import { EASE_OUT, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const PILL_RADIUS = 100;
const SQUARE_RADIUS = 0;

export function useButtonHover() {
  const ref = useRef<HTMLAnchorElement>(null);
  const reducedMotion = useReducedMotion();

  const onMouseEnter = () => {
    const element = ref.current;
    if (!element || reducedMotion) return;

    gsap.to(element, {
      borderRadius: SQUARE_RADIUS,
      duration: 0.35,
      ease: EASE_OUT,
      overwrite: "auto",
    });
  };

  const onMouseLeave = () => {
    const element = ref.current;
    if (!element || reducedMotion) return;

    gsap.to(element, {
      borderRadius: PILL_RADIUS,
      duration: 0.4,
      ease: EASE_OUT,
      overwrite: "auto",
    });
  };

  return { ref, onMouseEnter, onMouseLeave };
}
