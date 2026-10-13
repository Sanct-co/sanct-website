"use client";

import { useRef } from "react";
import { FeaturedWork } from "@/components/home/featured-work";
import { HeroSection } from "@/components/home/hero-section";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useMediaQuery } from "@/lib/use-media-query";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useLenis } from "lenis/react";

const PIN_QUERY = "(min-width: 1024px)";

function getPanelPinStart(panel: HTMLElement) {
  return panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom";
}

export function HomePanels() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroPanelRef = useRef<HTMLElement>(null);
  const featuredPanelRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const lenis = useLenis();
  const canPin = useMediaQuery(PIN_QUERY);

  useGSAP(
    () => {
      const hero = heroPanelRef.current;
      const featured = featuredPanelRef.current;

      if (!hero || reducedMotion || !lenis || !canPin) return;

      gsap.set(hero, { zIndex: 10 });
      if (featured) gsap.set(featured, { zIndex: 20 });

      // Only pin the hero so it stacks over featured work. Featured scrolls
      // naturally into the sections below without a pin-spacer gap.
      // Pinning on small screens fights the mobile browser chrome and snaps
      // the scroll position backward, so this stays desktop-only.
      const trigger = ScrollTrigger.create({
        trigger: hero,
        start: () => getPanelPinStart(hero),
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      return () => {
        trigger.kill();
      };
    },
    { scope: containerRef, dependencies: [reducedMotion, lenis, canPin] },
  );

  if (reducedMotion) {
    return (
      <>
        <HeroSection />
        <FeaturedWork />
      </>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <section
        ref={heroPanelRef}
        className="home-panel relative min-h-[calc(100svh-4.5rem)] bg-white"
      >
        <HeroSection />
      </section>
      <section
        ref={featuredPanelRef}
        className="home-panel relative overflow-hidden rounded-t-card bg-near-black"
      >
        <FeaturedWork />
      </section>
    </div>
  );
}
