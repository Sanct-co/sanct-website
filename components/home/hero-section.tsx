"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ButtonLink } from "@/components/ui/button";
import { BrandMarquee } from "@/components/home/brand-marquee";
import { EASE_OUT, gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

function HeroWingLeft() {
  return (
    <svg
      viewBox="0 0 320 520"
      fill="none"
      preserveAspectRatio="none"
      className="h-full w-full"
      aria-hidden="true"
    >
      <path d="M0 0h320v68H0V0z" fill="#2C1FA8" />
      <path d="M0 68h320L148 520H0V68z" fill="#2C1FA8" />
      <path d="M0 68h320v20H0V68z" fill="#3D35B0" opacity="0.55" />
    </svg>
  );
}

function HeroWingRight() {
  return (
    <svg
      viewBox="0 0 320 520"
      fill="none"
      preserveAspectRatio="none"
      className="h-full w-full"
      aria-hidden="true"
    >
      <path d="M0 0h320v68H0V0z" fill="#2C1FA8" />
      <path d="M320 68L172 520H0L0 68h320z" fill="#2C1FA8" />
      <path d="M0 68h320v20H0V68z" fill="#3D35B0" opacity="0.55" />
    </svg>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageBlockRef = useRef<HTMLDivElement>(null);
  const leftWingRef = useRef<HTMLDivElement>(null);
  const rightWingRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: EASE_OUT } });

      tl.from(contentRef.current, {
        autoAlpha: 0,
        y: 24,
        duration: 0.6,
      })
        .from(
          imageBlockRef.current,
          {
            autoAlpha: 0,
            y: 32,
            duration: 0.7,
          },
          "-=0.25",
        )
        .from(
          leftWingRef.current,
          {
            autoAlpha: 0,
            x: -48,
            duration: 0.9,
          },
          "-=0.55",
        )
        .from(
          rightWingRef.current,
          {
            autoAlpha: 0,
            x: 48,
            duration: 0.9,
          },
          "<",
        )
        .from(
          imageRef.current,
          {
            scale: 0.96,
            duration: 0.8,
          },
          "-=0.7",
        )
        .from(
          marqueeRef.current,
          {
            autoAlpha: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.35",
        );
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white px-(--spacing-section-x) pb-20 pt-14 text-near-black md:pb-28 md:pt-20"
    >
      <div className="mx-auto w-full max-w-(--max-width-container)">
        <div ref={contentRef} className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-[clamp(2.75rem,7vw,5.25rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            Software that strips away{" "}
            <span className="italic text-sanct-indigo">complexity.</span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg font-normal leading-relaxed text-on-light-muted md:text-xl">
            We build intuitive products that give you mental space to focus on
            what truly matters — not on the tools you use.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <ButtonLink href="/work" variant="primary">
              See Our Work
            </ButtonLink>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.08em] text-near-black transition-colors duration-150 ease-out hover:text-sanct-indigo"
            >
              Let&apos;s Talk
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div
          ref={imageBlockRef}
          className="relative mx-auto mt-16 max-w-5xl md:mt-24"
        >
          <div
            ref={leftWingRef}
            className="pointer-events-none absolute -left-[5%] top-1/2 h-[112%] w-[34%] -translate-y-1/2 md:-left-[8%] md:w-[38%]"
          >
            <HeroWingLeft />
          </div>
          <div
            ref={rightWingRef}
            className="pointer-events-none absolute -right-[5%] top-1/2 h-[112%] w-[34%] -translate-y-1/2 md:-right-[8%] md:w-[38%]"
          >
            <HeroWingRight />
          </div>

          <div
            ref={imageRef}
            className="relative z-10 mx-auto aspect-[16/10] max-w-3xl overflow-hidden rounded-card shadow-2xl shadow-sanct-indigo/20"
          >
            <Image
              src="/company-pic.jpg"
              alt="Team collaborating on software design"
              fill
              className="object-cover grayscale"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        </div>

        <div ref={marqueeRef}>
          <BrandMarquee />
        </div>
      </div>
    </section>
  );
}
