import { type ReactNode } from "react";

import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { TextSplit } from "@/components/ui/text-split";

type Step = {
  title: string;
  description: string;
  icon: ReactNode;
};

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const steps: Step[] = [
  {
    title: "Discover",
    description:
      "Tell us the problem, not the spec. We ask about your team, your users, and your constraints until the real scope is clear.",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m20 20-4.8-4.8" />
      </svg>
    ),
  },
  {
    title: "Plan",
    description:
      "You get a fixed scope, timeline, and price before a line of code ships. No surprises halfway through the build.",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <rect x="5" y="4" width="14" height="17" rx="2" />
        <path d="M9 3.5h6a1 1 0 0 1 1 1V6H8V4.5a1 1 0 0 1 1-1Z" />
        <path d="M8.5 11h7M8.5 14.5h7M8.5 18h4" />
      </svg>
    ),
  },
  {
    title: "Build",
    description:
      "Weekly demos, not monthly guesswork. You watch the product take shape and can redirect early, when it's cheap to.",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 0 5.4-5.4l-2.65 2.65-2.1-2.1L14.7 6.3Z" />
      </svg>
    ),
  },
  {
    title: "Launch",
    description:
      "We stay on after go-live, watching, fixing, improving. Support is part of the build, not a separate contract.",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="M12 2.5c2.5 1.5 4.5 4.8 4.5 8.5 0 2-1 4.3-2.2 5.9h-4.6C8.5 15.3 7.5 13 7.5 11c0-3.7 2-7 4.5-8.5Z" />
        <circle cx="12" cy="10" r="1.6" />
        <path d="M9.7 16.9 8 21l3-1.7M14.3 16.9 16 21l-3-1.7" />
      </svg>
    ),
  },
];

export function ProcessSection() {
  return (
    <Section id="process" background="indigo">
      <Reveal>
        <Tag variant="lilac">How We Work</Tag>
      </Reveal>
      <TextSplit
        text="Four steps, no detours for every project we take on."
        as="h2"
        className="mt-3 max-w-2xl font-display text-4xl font-extrabold leading-tight md:text-5xl"
        stagger={0.05}
        scrollStart="top 85%"
      />

      <div className="mt-14 grid gap-y-12 border-t border-white/15 pt-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-10 lg:pt-12">
        {steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.08}>
            <article className="relative pr-4 lg:border-l lg:border-white/15 lg:pl-8 lg:first:border-l-0 lg:first:pl-0">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-lilac">
                  {step.icon}
                </span>
                <h3 className="font-display text-2xl font-bold">{step.title}</h3>
              </div>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">
                {step.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
