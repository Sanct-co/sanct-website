"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const TESTIMONIALS = [{
  quote:
    "Working with the team was a smooth experience from start to finish. They understood what Kleros Philippines stands for and translated our vision into a website that feels warm, professional, and easy to navigate. We’re very happy with how the final website represents our organization and makes it easier for people to learn about our programs and connect with us.",
  name: "Myra Sanchez",
  role: "Founder & CEO, Kleros Philippines",
},{
  quote:
    "Sanct didn’t just build us software, they understood how our stores actually run. The dashboard feels like it was designed by someone who’s worked a shift on the floor.",
  name: "Elena Gonzales",
  role: "Operations Manager, CrowdHomes",
}, ];

export function SocialProof() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const reducedMotion = useReducedMotion();
  const autoPlay = !isHovered && !isFocused && !reducedMotion;
  const testimonial = TESTIMONIALS[activeIndex];

  useEffect(() => {
    if (!autoPlay) return;

    // Give longer quotes enough reading time; restart after manual navigation.
    const readingTime = Math.max(8000, testimonial.quote.split(/\s+/).length * 250 + 2000);
    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % TESTIMONIALS.length);
    }, readingTime);

    return () => window.clearTimeout(timer);
  }, [activeIndex, autoPlay, testimonial.quote]);

  function changeTestimonial(direction: number) {
    setActiveIndex((current) =>
      (current + direction + TESTIMONIALS.length) % TESTIMONIALS.length,
    );
  }

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

      <div
        className="mx-auto max-w-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocusCapture={() => setIsFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false);
        }}
      >
        <blockquote aria-live={autoPlay ? "off" : "polite"} aria-atomic="true">
          <p className="text-xl leading-relaxed text-near-black md:text-2xl">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          <footer className="mt-8">
            <cite className="not-italic">
              <span className="block font-bold text-near-black">
                {testimonial.name}
              </span>
              <span className="mt-1 block text-sm text-on-light-muted">
                {testimonial.role}
              </span>
            </cite>
          </footer>
        </blockquote>

        <div className="mt-10 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {TESTIMONIALS.map((item, i) => (
              <button
                key={item.name}
                type="button"
                aria-label={`Show testimonial from ${item.name}`}
                aria-pressed={i === activeIndex}
                onClick={() => setActiveIndex(i)}
                className="flex min-h-10 min-w-8 cursor-pointer items-center justify-center"
              >
                <span
                  className={`h-1.5 rounded-full bg-sanct-indigo ${
                    i === activeIndex ? "w-6 opacity-100" : "w-1.5 opacity-30"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => changeTestimonial(-1)}
              className="flex h-10 w-10 cursor-pointer items-center justify-center text-on-light-muted transition-colors hover:text-sanct-indigo"
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
              onClick={() => changeTestimonial(1)}
              className="flex h-10 w-10 cursor-pointer items-center justify-center text-on-light-muted transition-colors hover:text-sanct-indigo"
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
