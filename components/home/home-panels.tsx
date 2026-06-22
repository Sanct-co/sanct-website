"use client";

import { useRef } from "react";
import { FeaturedWork } from "@/components/home/featured-work";
import { HeroSection } from "@/components/home/hero-section";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useLenis } from "lenis/react";

function getPanelPinStart(panel: HTMLElement) {
  return panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom";
}

export function HomePanels() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroPanelRef = useRef<HTMLElement>(null);
  const featuredPanelRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const lenis = useLenis();

  useGSAP(
    () => {
      const hero = heroPanelRef.current;
      const featured = featuredPanelRef.current;

      if (!hero || reducedMotion || !lenis) return;

      gsap.set(hero, { zIndex: 10 });
      if (featured) gsap.set(featured, { zIndex: 20 });

      // Only pin the hero so it stacks over featured work. Featured scrolls
      // naturally into the sections below without a pin-spacer gap.
      const trigger = ScrollTrigger.create({
        trigger: hero,
        start: () => getPanelPinStart(hero),
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      const refresh = () => ScrollTrigger.refresh();
      refresh();
      window.addEventListener("load", refresh);
      window.addEventListener("resize", refresh);

      return () => {
        window.removeEventListener("load", refresh);
        window.removeEventListener("resize", refresh);
        trigger.kill();
      };
    },
    { scope: containerRef, dependencies: [reducedMotion, lenis] },
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
        className="home-panel relative min-h-svh bg-white"
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
