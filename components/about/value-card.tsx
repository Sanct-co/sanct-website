"use client";

import { useRef } from "react";
import { EASE_OUT, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type ValueCardProps = {
  title: string;
  description: string;
};

const BORDER_DEFAULT = "rgba(255, 255, 255, 0.12)";
const BORDER_HOVER = "rgba(160, 156, 245, 0.45)";
const SURFACE_DEFAULT = "rgba(28, 22, 41, 1)";
const SURFACE_HOVER = "rgba(36, 30, 52, 1)";

export function ValueCard({ title, description }: ValueCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const onMouseEnter = () => {
    const card = cardRef.current;
    if (!card || reducedMotion) return;

    gsap.to(card, {
      y: -8,
      scale: 1.02,
      borderColor: BORDER_HOVER,
      backgroundColor: SURFACE_HOVER,
      boxShadow: "0 24px 48px -16px rgba(160, 156, 245, 0.2)",
      duration: 0.4,
      ease: EASE_OUT,
      overwrite: "auto",
    });
  };

  const onMouseLeave = () => {
    const card = cardRef.current;
    if (!card || reducedMotion) return;

    gsap.to(card, {
      y: 0,
      scale: 1,
      borderColor: BORDER_DEFAULT,
      backgroundColor: SURFACE_DEFAULT,
      boxShadow: "0 0 0 0 rgba(160, 156, 245, 0)",
      duration: 0.45,
      ease: EASE_OUT,
      overwrite: "auto",
    });
  };

  return (
    <div
      ref={cardRef}
      className="rounded-card border border-border-dark bg-dark-surface p-7 will-change-transform"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <h3 className="font-display text-xl font-bold text-lilac">{title}</h3>
      <p className="mt-4 text-base leading-relaxed text-text-secondary">
        {description}
      </p>
    </div>
  );
}
