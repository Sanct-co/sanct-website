"use client";

import { useRef } from "react";

import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { TextSplit } from "@/components/ui/text-split";
import { EASE_OUT, gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type Step = {
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    title: "Discover",
    description:
      "Tell us the problem, not the spec. We ask about your team, your users, and your constraints until the real scope is clear.",
  },
  {
    title: "Plan",
    description:
      "You get a fixed scope, timeline, and price before a line of code ships. No surprises halfway through the build.",
  },
  {
    title: "Build",
    description:
      "Weekly demos, not monthly guesswork. You watch the product take shape and can redirect early, when it's cheap to.",
  },
  {
    title: "Launch",
    description:
      "We stay on after go-live, watching, fixing, improving. Support is part of the build, not a separate contract.",
  },
];

const HEADER_HEIGHT = 72;
const SCROLL_DISTANCE_PER_STEP = 320;

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const squareRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const container = containerRef.current;
      const squares = squareRefs.current.filter(
        (el): el is HTMLSpanElement => el !== null,
      );
      const lines = lineRefs.current.filter(
        (el): el is HTMLDivElement => el !== null,
      );
      const content = contentRefs.current.filter(
        (el): el is HTMLDivElement => el !== null,
      );
      if (!container || squares.length === 0) return;

      if (reducedMotion) {
        gsap.set(squares, { autoAlpha: 1, scale: 1 });
        gsap.set(lines, { scaleY: 1 });
        gsap.set(content, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(squares, { autoAlpha: 0.35, scale: 0.8 });
      gsap.set(lines, { scaleY: 0 });
      gsap.set(content, { autoAlpha: 0, y: 18 });

      if (lines.length === 0) return;

      const distance = (steps.length - 1) * SCROLL_DISTANCE_PER_STEP;
      if (spacerRef.current) spacerRef.current.style.height = `${distance}px`;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: `top top+=${HEADER_HEIGHT}`,
          end: () => `+=${distance}`,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      steps.forEach((_, i) => {
        const position = i;
        if (i > 0) {
          timeline.to(
            lines[i - 1],
            { scaleY: 1, duration: 0.7, ease: "none" },
            position - 0.9,
          );
        }
        timeline
          .to(
            squares[i],
            { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(2.4)" },
            position,
          )
          .to(
            content[i],
            { autoAlpha: 1, y: 0, duration: 0.4, ease: EASE_OUT },
            position,
          );
      });
    },
    { scope: containerRef, dependencies: [reducedMotion] },
  );

  return (
    <Section id="process" background="white">
      <div ref={containerRef}>
        <div className="sticky py-4" style={{ top: HEADER_HEIGHT }}>
          <Tag variant="indigo">How We Work</Tag>
          <TextSplit
            text="Four steps, no detours for every project we take on."
            as="h2"
            className="mt-3 max-w-2xl font-display text-4xl font-extrabold leading-tight md:text-5xl"
            stagger={0.05}
            scrollStart="top 85%"
          />

          <div className="mt-10 flex flex-col lg:mt-12">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="relative flex w-full gap-6 pb-8 last:pb-0"
              >
                {i < steps.length - 1 && (
                  <div
                    className="absolute left-6 top-12 h-[calc(100%-3rem)] w-0.5 -translate-x-1/2 rounded-full bg-near-black/10"
                    aria-hidden="true"
                  >
                    <div
                      ref={(el) => {
                        lineRefs.current[i] = el;
                      }}
                      className="h-full w-full origin-top rounded-full bg-linear-to-b from-indigo-mid to-sanct-indigo"
                    />
                  </div>
                )}

                <span
                  ref={(el) => {
                    squareRefs.current[i] = el;
                  }}
                  className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-indigo-mid to-sanct-indigo font-display text-base font-bold text-white shadow-lg shadow-sanct-indigo/25"
                >
                  {i + 1}
                </span>

                <div
                  ref={(el) => {
                    contentRefs.current[i] = el;
                  }}
                  className="relative flex-1 pl-4"
                >
                  <h3 className="font-display text-2xl font-bold">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-on-light-muted">
                    {step.description}
                  </p>
                  {i === 0 && (
                    <button
                      type="button"
                      data-cal-link="deo-talip-iwfmht/secret"
                      data-cal-namespace="secret"
                      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                      className="mt-5 inline-flex cursor-pointer items-center justify-center rounded-pill bg-sanct-indigo px-7 py-3 text-sm font-semibold uppercase tracking-[0.06em] text-white transition-[background-color,border-color,color] duration-150 ease-out hover:bg-indigo-mid focus-visible:bg-indigo-mid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lilac"
                    >
                      Book a Call
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div ref={spacerRef} aria-hidden="true" />
      </div>
    </Section>
  );
}
