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
      const panels = [heroPanelRef.current, featuredPanelRef.current].filter(
        Boolean,
      ) as HTMLElement[];

      if (!panels.length || reducedMotion || !lenis) return;

      const triggers = panels.map((panel, index) => {
        const isLastPanel = index === panels.length - 1;

        gsap.set(panel, { zIndex: 10 + index * 10 });

        return ScrollTrigger.create({
          trigger: panel,
          start: () => getPanelPinStart(panel),
          pin: true,
          // Hero stacks without extra spacing; featured restores scroll room
          // so sections below are not pulled under the pinned panel.
          pinSpacing: isLastPanel,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onLeave: isLastPanel
            ? () => {
                gsap.set(panel, { zIndex: "auto", clearProps: "transform" });
              }
            : undefined,
          onLeaveBack: isLastPanel
            ? () => {
                gsap.set(panel, { zIndex: 20 });
              }
            : undefined,
        });
      });

      const refresh = () => ScrollTrigger.refresh();
      refresh();
      window.addEventListener("load", refresh);
      window.addEventListener("resize", refresh);

      return () => {
        window.removeEventListener("load", refresh);
        window.removeEventListener("resize", refresh);
        triggers.forEach((trigger) => trigger.kill());
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
