"use client";

import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";

const TESTIMONIAL = {
  quote:
    "Sanct didn’t just build us software, they understood how our stores actually run. The dashboard feels like it was designed by someone who’s worked a shift on the floor.",
  name: "Elena Gonzales",
  role: "Operations Manager, CrowdHomes",
};

const INDICATOR_COUNT = 3;

export function SocialProof() {
  return (
    <Section id="clients" background="ghost">
      <Reveal>
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
          <Tag variant="indigo">What Clients Say</Tag>
          <h2 className="mt-3 font-display text-4xl font-extrabold leading-tight tracking-[-0.02em] md:text-5xl">
            Trusted by teams who know their business inside out.
          </h2>
        </div>
      </Reveal>

      <div className="mx-auto max-w-2xl">
        <blockquote>
          <p className="text-xl leading-relaxed text-near-black md:text-2xl">
            &ldquo;{TESTIMONIAL.quote}&rdquo;
          </p>
          <footer className="mt-8">
            <cite className="not-italic">
              <span className="block font-bold text-near-black">
                {TESTIMONIAL.name}
              </span>
              <span className="mt-1 block text-sm text-on-light-muted">
                {TESTIMONIAL.role}
              </span>
            </cite>
          </footer>
        </blockquote>

        <div className="mt-10 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: INDICATOR_COUNT }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full bg-sanct-indigo ${
                  i === 0 ? "w-6 opacity-100" : "w-1.5 opacity-30"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Previous testimonial"
              disabled
              className="cursor-not-allowed text-on-light-muted opacity-40"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M19 12H5M5 12l6-6M5 12l6 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              disabled
              className="cursor-not-allowed text-on-light-muted opacity-40"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
