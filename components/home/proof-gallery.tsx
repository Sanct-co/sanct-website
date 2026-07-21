"use client";

import Image from "next/image";
import { useRef } from "react";
import { EASE_OUT, gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";

const PROOF_IMAGES = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];

const TILE_STYLES = [
  "rotate-[-6deg] translate-y-0",
  "rotate-[4deg] translate-y-8",
  "rotate-[-3deg] -translate-y-4",
  "rotate-[5deg] translate-y-10",
  "rotate-[-4deg] translate-y-2",
];

const SLIDE_SECONDS = 2.6;

export function ProofGallery() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      const slides =
        carouselRef.current?.querySelectorAll<HTMLElement>("[data-slide]");
      const dots =
        carouselRef.current?.querySelectorAll<HTMLElement>("[data-dot]");
      if (!slides?.length || !dots?.length) return;

      const tl = gsap.timeline({ repeat: -1 });

      slides.forEach((slide, i) => {
        const dot = dots[i];
        const start = i * SLIDE_SECONDS;
        const end = start + SLIDE_SECONDS - 0.6;

        tl.to(slide, { opacity: 1, duration: 0.6, ease: EASE_OUT }, start)
          .to(dot, { opacity: 1, duration: 0.3 }, start)
          .to(slide, { opacity: 0, duration: 0.6, ease: EASE_OUT }, end)
          .to(dot, { opacity: 0.35, duration: 0.3 }, end);
      });
    },
    { scope: carouselRef, dependencies: [reducedMotion] },
  );

  return (
    <Section background="white">
      {/* <Reveal>
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
          <Tag variant="indigo">Proof</Tag>
          <h2 className="mt-3 font-display text-4xl font-extrabold leading-tight tracking-[-0.02em] md:text-5xl">
            Real clients, real conversations.
          </h2>
        </div>
      </Reveal> */}

      {/* Desktop: offset, skewed polaroid wall */}
      <div className="hidden md:grid md:grid-cols-5 md:items-start md:gap-6 md:px-2">
        {PROOF_IMAGES.map((file, i) => (
          <div
            key={file}
            className={`group relative aspect-[3/4] overflow-hidden rounded-card border border-border-dark/10 bg-white shadow-lg transition-transform duration-300 ease-out will-change-transform hover:z-10 hover:rotate-0 hover:translate-y-0 hover:scale-105 ${TILE_STYLES[i]}`}
          >
            <Image
              src={`/proofpic/${file}`}
              alt="Client conversation proof"
              fill
              className="object-cover"
              sizes="20vw"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* Mobile: auto-advancing carousel */}
      <div ref={carouselRef} className="mx-auto max-w-sm md:hidden">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card shadow-lg">
          {PROOF_IMAGES.map((file, i) => (
            <div
              key={file}
              data-slide=""
              className="absolute inset-0"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <Image
                src={`/proofpic/${file}`}
                alt="Client conversation proof"
                fill
                className="object-cover"
                sizes="100vw"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {PROOF_IMAGES.map((file, i) => (
            <span
              key={file}
              data-dot=""
              className="h-1.5 w-1.5 rounded-full bg-sanct-indigo"
              style={{ opacity: i === 0 ? 1 : 0.35 }}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
