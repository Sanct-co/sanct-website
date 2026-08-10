"use client";

import Image from "next/image";
import { useRef } from "react";
import { EASE_OUT, gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";

const PROOF_IMAGES = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "six.jpg"];

const TILE_LAYOUT = [
  "col-span-2 row-span-2 rotate-[-1.5deg]",
  "col-span-2 row-span-1 rotate-[1deg]",
  "col-span-1 row-span-1 rotate-[-1deg]",
  "col-span-1 row-span-1 rotate-[2deg]",
  "col-span-2 row-span-1 rotate-[-1deg]",
  "col-span-2 row-span-1 rotate-[1.5deg]",
];

const SLIDE_SECONDS = 2.6;

export function ProofGallery() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
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

  useGSAP(
    () => {
      if (reducedMotion) return;
      const tiles =
        galleryRef.current?.querySelectorAll<HTMLElement>("[data-tile]");
      if (!tiles?.length) return;

      gsap.from(tiles, {
        opacity: 0,
        scale: 0.85,
        duration: 0.6,
        ease: EASE_OUT,
        stagger: 0.08,
        clearProps: "transform",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: galleryRef, dependencies: [reducedMotion] },
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

      {/* Desktop: bento-style scrapbook wall */}
      <div
        ref={galleryRef}
        className="mx-auto hidden max-w-3xl md:grid md:auto-rows-[90px] md:grid-flow-row-dense md:grid-cols-4 md:gap-3 lg:max-w-4xl lg:auto-rows-[110px] lg:gap-3.5"
      >
        {PROOF_IMAGES.map((file, i) => (
          <div
            key={file}
            data-tile=""
            className={`group relative overflow-hidden rounded-card border border-border-dark/10 bg-white shadow-lg transition-transform duration-300 ease-out will-change-transform hover:z-10 hover:rotate-0 hover:scale-[1.05] ${TILE_LAYOUT[i]} ${i === 0 ? "animate-proof-glow" : ""}`}
          >
            <Image
              src={`/proofpic/${file}`}
              alt="Client conversation proof"
              fill
              className="scale-105 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.15]"
              sizes="(min-width: 1024px) 18vw, 22vw"
              priority={i === 0}
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-near-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
                className="scale-125 object-cover"
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
