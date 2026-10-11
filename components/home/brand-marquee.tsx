"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { brands } from "@/lib/brands";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const MARQUEE_REPEATS = 4;

function BrandItem({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="group flex shrink-0 cursor-default items-center gap-3 transition-transform duration-300 ease-out hover:scale-105">
      <Image
        src={logo}
        alt=""
        width={56}
        height={56}
        className="h-14 w-14 object-contain grayscale transition-all duration-300 ease-out group-hover:scale-110 group-hover:grayscale-0"
      />
      <span className="whitespace-nowrap text-sm font-medium text-on-light-muted transition-colors duration-300 ease-out group-hover:text-near-black">
        {name}
      </span>
    </div>
  );
}

function BrandTrack({
  ariaHidden = false,
  trackId,
}: {
  ariaHidden?: boolean;
  trackId: string;
}) {
  const items = Array.from({ length: MARQUEE_REPEATS }, () => brands).flat();

  return (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={ariaHidden || undefined}
    >
      {items.map((brand, index) => (
        <div
          key={`${trackId}-${brand.name}-${index}`}
          className="mx-6 shrink-0 md:mx-8"
        >
          <BrandItem name={brand.name} logo={brand.logo} />
        </div>
      ))}
    </div>
  );
}

export function BrandMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track || reducedMotion) return;

      const trackWidth = track.scrollWidth / 2;

      gsap.to(track, {
        x: -trackWidth,
        duration: 60,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: containerRef, dependencies: [reducedMotion] },
  );

  return (
    <div
      ref={containerRef}
      className="relative mt-16 w-full md:mt-20"
      aria-label="Accreditations and partnerships"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent md:w-24" />

      {reducedMotion ? (
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 px-4 md:gap-x-16">
          {brands.map((brand) => (
            <BrandItem key={brand.name} name={brand.name} logo={brand.logo} />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex w-max items-center will-change-transform"
          >
            <BrandTrack trackId="a" />
            <BrandTrack trackId="b" ariaHidden />
          </div>
        </div>
      )}
    </div>
  );
}
