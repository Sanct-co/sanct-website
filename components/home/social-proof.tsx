"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";

const QUOTE_WORDS =
  "Sanct didn’t just build us software, they understood how our stores actually run. The dashboard feels like it was designed by someone who’s worked a shift on the floor.".split(
    " ",
  );

export function SocialProof() {
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      const words = quoteRef.current?.querySelectorAll<HTMLElement>("[data-quote-word]");
      if (!words?.length) return;

      gsap.fromTo(
        words,
        { color: "rgba(17,16,31,0.15)" },
        {
          color: "rgba(17,16,31,1)",
          stagger: 0.6,
          ease: "none",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 80%",
            end: "bottom 25%",
            scrub: 1.2,
          },
        },
      );
    },
    { scope: quoteRef, dependencies: [reducedMotion] },
  );

  return (
    <Section background="ghost">
      <Reveal>
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
          <Tag variant="indigo">What Clients Say</Tag>
          <h2 className="mt-3 font-display text-4xl font-extrabold leading-tight tracking-[-0.02em] md:text-5xl">
            Trusted by teams who know their business inside out.
          </h2>
        </div>
      </Reveal>

      <blockquote className="mx-auto max-w-5xl text-center">
        <p
          ref={quoteRef}
          suppressHydrationWarning
          className={`font-display text-4xl font-extrabold leading-[1.1] tracking-[-0.02em] md:text-5xl lg:text-6xl${reducedMotion ? " text-near-black" : ""}`}
          style={reducedMotion ? undefined : { color: "rgba(17,16,31,0.15)" }}
        >
          &ldquo;
          {QUOTE_WORDS.map((word, i) => (
            <span key={i}>
              <span data-quote-word="">{word}</span>
              {i < QUOTE_WORDS.length - 1 && " "}
            </span>
          ))}
          &rdquo;
        </p>
        <footer className="mt-10 md:mt-12">
          <cite className="not-italic">
            <span className="block text-lg font-bold text-near-black md:text-xl">
              Elena Morales
            </span>
            <span className="mt-1 block text-base text-on-light-muted md:text-lg">
              Operations Director, MetroMart PH
            </span>
          </cite>
        </footer>
      </blockquote>
    </Section>
  );
}
