"use client";

import { useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { TextSplit } from "@/components/ui/text-split";
import { gsap, useGSAP } from "@/lib/gsap";
import { industries } from "@/lib/industries";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const BUBBLE_EASE = "power4.out";

export function IndustriesSection() {
  const [active, setActive] = useState<number | null>(null);
  const bubbleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    breakpoints: {
      "(min-width: 1024px)": { active: false },
    },
  });

  function selectIndustry(index: number, shouldScroll: boolean) {
    setActive(index);
    if (shouldScroll) emblaApi?.scrollTo(index);
  }

  useGSAP(
    () => {
      bubbleRefs.current.forEach((bubble, index) => {
        if (!bubble) return;

        const open = index === active;
        gsap.killTweensOf(bubble);

        if (open || reducedMotion) {
          bubble.style.opacity = open ? "1" : "0";
          bubble.style.visibility = "visible";
          bubble.style.backgroundColor = "#111015";
        }

        if (reducedMotion) {
          gsap.set(bubble, {
            scale: 1,
            rotation: 0,
          });
          return;
        }

        if (open) {
          gsap.fromTo(
            bubble,
            {
              scale: 0.18,
              rotation: -11,
              transformOrigin: "50% 46%",
            },
            {
              scale: 1,
              rotation: 0,
              duration: 0.9,
              ease: BUBBLE_EASE,
              overwrite: "auto",
            },
          );
          return;
        }

        gsap.to(bubble, {
          scale: 0.18,
          rotation: -11,
          opacity: 0,
          duration: 0.45,
          ease: "power3.inOut",
          overwrite: "auto",
        });
      });
    },
    { dependencies: [active, reducedMotion] },
  );

  return (
    <Section id="industries" background="white" className="scroll-mt-20">
      <Tag variant="indigo">Industries</Tag>
      <TextSplit
        text="Industries we build for."
        as="h2"
        className="mt-3 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] md:text-6xl"
        stagger={0.05}
        scrollStart="top 85%"
      />

      <div
        ref={emblaRef}
        className="mt-12 overflow-hidden md:mt-16 lg:overflow-visible"
      >
        <div
          className="flex border-y border-near-black/10 lg:border-l"
          role="list"
          onMouseLeave={() => setActive(null)}
        >
          {industries.map((industry, index) => {
            const selected = index === active;

            return (
              <div
                id={industry.id}
                key={industry.id}
                role="listitem"
                className="relative min-w-0 flex-[0_0_82%] scroll-mt-24 border-r border-near-black/10 sm:flex-[0_0_44%] lg:flex-[0_0_25%]"
              >
                <button
                  type="button"
                  aria-pressed={selected}
                  onMouseEnter={() => selectIndustry(index, false)}
                  onFocus={() => selectIndustry(index, true)}
                  onBlur={(event) => {
                    const next = event.relatedTarget;
                    if (!(next instanceof Node) || !event.currentTarget.parentElement?.parentElement?.contains(next)) {
                      setActive(null);
                    }
                  }}
                  className="group relative flex h-72 w-full items-center justify-center px-6 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-lilac sm:h-80"
                >
                  <span className="sr-only">
                    {industry.name}. {industry.description}{" "}
                    {industry.offerings.map((offering) => offering.name).join(", ")},{" "}
                    {industry.region}.
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-display text-[1.65rem] font-bold tracking-[-0.04em] text-near-black transition-colors duration-300 ease-out group-hover:text-sanct-indigo"
                  >
                    {industry.name}
                  </span>
                </button>

                <div
                  ref={(node) => {
                    bubbleRefs.current[index] = node;
                  }}
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-3 top-4 bottom-4 z-20 origin-center scale-[0.18] -rotate-[11deg] rounded-[22px] bg-[#111015] opacity-0"
                  style={{ backgroundColor: "#111015" }}
                >
                  <div className="relative h-full overflow-hidden rounded-[22px]">
                    <div
                      className={`flex h-full flex-col justify-between p-6 text-left text-white transition-opacity duration-300 ease-out ${
                        selected ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div>
                        <p className="font-display text-xl font-bold tracking-[-0.03em]">
                          {industry.name}
                        </p>
                        <p className="mt-3 max-w-[15rem] text-sm leading-relaxed text-white/55">
                          {industry.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {industry.offerings.map((offering) => (
                          <span
                            key={offering.name}
                            className="inline-flex h-7 items-center rounded-md bg-white/10 px-2.5 font-terminal text-[10px] uppercase tracking-[0.14em] text-white/85"
                          >
                            {offering.name}
                          </span>
                        ))}
                        <span className="inline-flex h-7 items-center rounded-md bg-white/10 px-2.5 font-terminal text-[10px] uppercase tracking-[0.14em] text-white/85">
                          {industry.region}
                        </span>
                      </div>
                    </div>
                    <span className="absolute top-1/2 right-0 size-11 -translate-y-1/2 translate-x-1/2 rounded-full bg-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
