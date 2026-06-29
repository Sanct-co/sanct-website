"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { EASE_OUT, gsap, useGSAP } from "@/lib/gsap";

const RING_RADIUS = 88;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const INTRO_FAILSAFE_MS = 4500;
const REVEAL_START = 2.15;

type OpeningTransitionProps = {
  onComplete: () => void;
};

export function OpeningTransition({ onComplete }: OpeningTransitionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const logoStageRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLParagraphElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const pulseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const onCompleteRef = useRef(onComplete);
  const completedRef = useRef(false);

  onCompleteRef.current = onComplete;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const failSafe = window.setTimeout(() => {
      if (completedRef.current) return;
      completedRef.current = true;
      onCompleteRef.current();
    }, INTRO_FAILSAFE_MS);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(failSafe);
    };
  }, []);

  useGSAP(
    () => {
      const root = rootRef.current;
      const backdrop = backdropRef.current;
      const glow = glowRef.current;
      const ring = ringRef.current;
      const logoStage = logoStageRef.current;
      const logo = logoRef.current;
      const wordmark = wordmarkRef.current;
      const reveal = revealRef.current;
      const pulses = pulseRefs.current.filter(Boolean) as HTMLDivElement[];

      if (!root || !backdrop || !glow || !ring || !logoStage || !logo || !wordmark || !reveal) {
        return;
      }

      gsap.set(root, { autoAlpha: 1 });
      gsap.set(backdrop, { autoAlpha: 1 });
      gsap.set(glow, { scale: 0.4, autoAlpha: 0 });
      gsap.set(ring, {
        strokeDasharray: RING_CIRCUMFERENCE,
        strokeDashoffset: RING_CIRCUMFERENCE,
      });
      gsap.set(logo, { scale: 0.35, rotation: -18, autoAlpha: 0, filter: "blur(8px)" });
      gsap.set(wordmark, { autoAlpha: 0, y: 18, letterSpacing: "0.35em" });
      gsap.set(pulses, { scale: 0.55, autoAlpha: 0 });
      gsap.set(reveal, {
        clipPath: "circle(0% at 50% 50%)",
        autoAlpha: 1,
      });

      const completeIntro = () => {
        if (completedRef.current) return;
        completedRef.current = true;
        onCompleteRef.current();
      };

      const tl = gsap.timeline({
        defaults: { ease: EASE_OUT },
      });

      tl.to(glow, { scale: 1.15, autoAlpha: 0.85, duration: 0.9 }, 0)
        .to(
          logo,
          {
            scale: 1,
            rotation: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.95,
            ease: "back.out(1.6)",
          },
          0.15,
        )
        .to(
          ring,
          {
            strokeDashoffset: 0,
            duration: 1.05,
            ease: "power2.inOut",
          },
          0.35,
        )
        .to(
          wordmark,
          {
            autoAlpha: 1,
            y: 0,
            letterSpacing: "0.22em",
            duration: 0.65,
          },
          0.75,
        )
        .to(
          pulses,
          {
            scale: 2.35,
            autoAlpha: 0,
            duration: 1.35,
            stagger: 0.18,
            ease: "power1.out",
          },
          1.05,
        )
        .to(
          logo,
          {
            scale: 2.8,
            x: "28vw",
            y: "-32vh",
            rotation: 8,
            autoAlpha: 0,
            filter: "blur(2px)",
            duration: 0.75,
            ease: "power4.in",
          },
          2.05,
        )
        .to(
          glow,
          {
            scale: 2.4,
            autoAlpha: 0,
            duration: 0.55,
          },
          2.05,
        )
        .to(
          wordmark,
          {
            autoAlpha: 0,
            y: -12,
            duration: 0.35,
          },
          2.1,
        )
        .to(logoStage, { autoAlpha: 0, duration: 0.2 }, 2.1)
        .to(backdrop, { autoAlpha: 0, duration: 0.3 }, REVEAL_START)
        .to(
          reveal,
          {
            clipPath: "circle(155% at 50% 50%)",
            duration: 0.85,
            ease: "power3.inOut",
          },
          REVEAL_START,
        )
        .call(completeIntro, undefined, REVEAL_START + 0.85)
        .to(root, { autoAlpha: 0, duration: 0.12 }, REVEAL_START + 0.85);

      return () => {
        tl.kill();
      };
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className="intro-overlay pointer-events-none fixed inset-0 z-200 flex items-center justify-center overflow-hidden opacity-100"
      aria-hidden="true"
    >
      <div
        ref={backdropRef}
        className="intro-backdrop absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--indigo-mid)_0%,var(--sanct-indigo)_52%,#17124f_100%)]"
      />

      <div
        ref={glowRef}
        className="pointer-events-none absolute h-[min(72vw,22rem)] w-[min(72vw,22rem)] rounded-full bg-[radial-gradient(circle,rgba(160,156,245,0.45)_0%,rgba(44,31,168,0)_68%)]"
        aria-hidden="true"
      />

      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          ref={(element) => {
            pulseRefs.current[index] = element;
          }}
          className="pointer-events-none absolute h-44 w-44 rounded-full border border-white/25"
          aria-hidden="true"
        />
      ))}

      <div ref={logoStageRef} className="relative z-10 flex flex-col items-center">
        <div className="relative flex h-40 w-40 items-center justify-center md:h-44 md:w-44">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <circle
              cx="100"
              cy="100"
              r={RING_RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1.5"
            />
            <circle
              ref={ringRef}
              cx="100"
              cy="100"
              r={RING_RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.92)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          <div ref={logoRef} className="relative h-24 w-24 md:h-28 md:w-28">
            <Image
              src="/sanct-fav.png"
              alt=""
              width={512}
              height={512}
              priority
              className="h-full w-full object-contain drop-shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
            />
          </div>
        </div>

        <p
          ref={wordmarkRef}
          className="mt-8 font-display text-sm font-bold uppercase tracking-[0.22em] text-white/90 md:text-base"
        >
          Sanct
        </p>
      </div>

      <div
        ref={revealRef}
        className="pointer-events-none absolute inset-0 z-20 bg-ghost-indigo"
        aria-hidden="true"
      />
    </div>
  );
}
