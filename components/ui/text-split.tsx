"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE_OUT } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type TextSplitProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span";
  className?: string;
  split?: "words" | "chars";
  stagger?: number;
  delay?: number;
  duration?: number;
  fromY?: number | string;
  scrollTrigger?: boolean;
  scrollStart?: string;
};

export function TextSplit({
  text,
  as: Tag = "div",
  className,
  split = "words",
  stagger = 0.06,
  delay = 0,
  duration = 0.75,
  fromY = "110%",
  scrollTrigger = true,
  scrollStart = "top 85%",
}: TextSplitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const units = split === "words" ? text.split(" ") : text.split("");

  useGSAP(
    () => {
      if (reducedMotion) return;
      const inners = containerRef.current?.querySelectorAll<HTMLElement>("[data-split-inner]");
      if (!inners?.length) return;

      const vars: gsap.TweenVars = { y: fromY, duration, ease: EASE_OUT, stagger };
      if (scrollTrigger) {
        vars.scrollTrigger = { trigger: containerRef.current, start: scrollStart, once: true };
      } else {
        vars.delay = delay;
      }
      gsap.from(inners, vars);
    },
    { scope: containerRef, dependencies: [reducedMotion, text] },
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={containerRef as any} className={className}>
      {units.map((unit, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "bottom",
            lineHeight: "inherit",
            paddingBottom: "0.1em",
            marginBottom: "-0.1em",
          }}
        >
          <span data-split-inner="" style={{ display: "inline-block" }}>
            {unit}
          </span>
          {split === "words" && i < units.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
