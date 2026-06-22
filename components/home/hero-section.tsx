"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { BrandMarquee } from "@/components/home/brand-marquee";
import { EASE_OUT, gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const CODE_LINES: Array<{ tokens: Array<{ text: string; color: string }> }> = [
  {
    tokens: [
      { text: "import", color: "#c792ea" },
      { text: " { ", color: "#cdd3de" },
      { text: "createClient", color: "#82aaff" },
      { text: " } ", color: "#cdd3de" },
      { text: "from", color: "#c792ea" },
      { text: ' "@sanct/sdk"', color: "#c3e88d" },
    ],
  },
  { tokens: [] },
  {
    tokens: [
      { text: "const", color: "#c792ea" },
      { text: " app ", color: "#cdd3de" },
      { text: "=", color: "#89ddff" },
      { text: " createClient({", color: "#cdd3de" },
    ],
  },
  {
    tokens: [
      { text: "  simplicity", color: "#f07178" },
      { text: ": ", color: "#89ddff" },
      { text: "true", color: "#ff9cac" },
      { text: ",", color: "#cdd3de" },
    ],
  },
  {
    tokens: [
      { text: "  complexity", color: "#f07178" },
      { text: ": ", color: "#89ddff" },
      { text: "0", color: "#f78c6c" },
      { text: ",", color: "#cdd3de" },
    ],
  },
  {
    tokens: [
      { text: "  focus", color: "#f07178" },
      { text: ": ", color: "#89ddff" },
      { text: '"what matters"', color: "#c3e88d" },
      { text: ",", color: "#cdd3de" },
    ],
  },
  { tokens: [{ text: "})", color: "#cdd3de" }] },
  { tokens: [] },
  { tokens: [{ text: "// Ship faster. Think clearer.", color: "#546e7a" }] },
  {
    tokens: [
      { text: "app", color: "#82aaff" },
      { text: ".", color: "#cdd3de" },
      { text: "launch", color: "#82aaff" },
      { text: "()", color: "#cdd3de" },
    ],
  },
];

function HeroCodeAnimation() {
  const [lineCount, setLineCount] = useState(0);
  const [cursorOn, setCursorOn] = useState(true);
  const [showBadges, setShowBadges] = useState(false);

  useEffect(() => {
    if (lineCount < CODE_LINES.length) {
      const delay = lineCount === 0 ? 600 : 200;
      const t = setTimeout(() => setLineCount((n) => n + 1), delay);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShowBadges(true), 500);
    return () => clearTimeout(t);
  }, [lineCount]);

  useEffect(() => {
    if (!showBadges) return;
    const t = setTimeout(() => {
      setShowBadges(false);
      setLineCount(0);
    }, 3500);
    return () => clearTimeout(t);
  }, [showBadges]);

  useEffect(() => {
    const i = setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-[#0d0f16] font-mono">
      {/* title bar */}
      <div className="flex shrink-0 items-center gap-2 border-b border-white/[0.06] bg-[#13151f] px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <div className="ml-3 flex gap-0.5 text-xs">
          <span className="rounded-t bg-[#0d0f16] px-3 py-1 text-white/70">
            index.ts
          </span>
          <span className="px-3 py-1 text-white/25">api.ts</span>
          <span className="px-3 py-1 text-white/25">deploy.yml</span>
        </div>
      </div>

      {/* code area */}
      <div className="flex-1 overflow-hidden p-5 text-sm leading-7">
        {CODE_LINES.slice(0, lineCount).map((line, i) => (
          <div key={i} className="flex items-start">
            <span className="mr-5 mt-0.5 w-5 shrink-0 select-none text-right text-xs text-white/20">
              {i + 1}
            </span>
            <span>
              {line.tokens.map((tok, j) => (
                <span key={j} style={{ color: tok.color }}>
                  {tok.text}
                </span>
              ))}
              {i === lineCount - 1 && (
                <span
                  style={{
                    color: "#528bff",
                    opacity: cursorOn ? 1 : 0,
                    transition: "opacity 75ms",
                  }}
                >
                  |
                </span>
              )}
            </span>
          </div>
        ))}
      </div>

      {/* status bar */}
      <div className="flex shrink-0 items-center gap-4 bg-[#2C1FA8] px-4 py-1.5 text-xs text-white/70">
        <span className="text-white/90">TypeScript</span>
        <span>● Ready</span>
        <span className="ml-auto">Ln {lineCount}&nbsp;&nbsp;Col 1</span>
      </div>

      {/* result badges */}
      <div
        className="absolute bottom-10 right-4 flex flex-col items-end gap-2"
        style={{
          opacity: showBadges ? 1 : 0,
          transform: showBadges ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        <div className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-[#1a1d2e] px-3 py-2 text-xs text-white shadow-xl">
          <span style={{ color: "#28c840" }}>✓</span>
          Build successful &middot; 2.3s
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-[#1a1d2e] px-3 py-2 text-xs text-white shadow-xl">
          <span style={{ color: "#82aaff" }}>↑</span>
          Deployed to production
        </div>
      </div>
    </div>
  );
}

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
            <HeroCodeAnimation />
          </div>
        </div>

        <div ref={marqueeRef}>
          <BrandMarquee />
        </div>
      </div>
    </section>
  );
}
