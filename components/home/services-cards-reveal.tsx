"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { EASE_OUT, gsap, useGSAP } from "@/lib/gsap";
import { useMediaQuery } from "@/lib/use-media-query";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { services } from "@/lib/services";

const SCROLL_DISTANCE_PER_CARD = 420;
const RESTING_OPACITY = 0.35;
const HEADER_HEIGHT = 72;
const PIN_QUERY = "(min-width: 1024px)";

export function ServicesCardsReveal({ heading }: { heading?: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const highlightRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion();
  const canPin = useMediaQuery(PIN_QUERY);

  useGSAP(
    () => {
      const container = containerRef.current;
      const cards = cardRefs.current.filter(
        (el): el is HTMLDivElement => el !== null,
      );
      const highlights = highlightRefs.current.filter(
        (el): el is HTMLDivElement => el !== null,
      );
      if (!container || cards.length === 0) return;

      if (reducedMotion || !canPin) {
        gsap.set(cards, { autoAlpha: 1, filter: "grayscale(0)" });
        gsap.set(highlights, { autoAlpha: 0 });
        return;
      }

      const [activeCard, ...restCards] = cards;
      const [activeHighlight, ...restHighlights] = highlights;

      gsap.set(activeCard, { autoAlpha: 1, filter: "grayscale(0)" });
      gsap.set(restCards, {
        autoAlpha: RESTING_OPACITY,
        filter: "grayscale(1)",
      });
      gsap.set(activeHighlight, { autoAlpha: 1 });
      gsap.set(restHighlights, { autoAlpha: 0 });

      if (restCards.length === 0) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: `top top+=${HEADER_HEIGHT}`,
          end: () => `+=${restCards.length * SCROLL_DISTANCE_PER_CARD}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(
          restCards,
          {
            autoAlpha: 1,
            filter: "grayscale(0)",
            ease: EASE_OUT,
            stagger: 0.6,
          },
          0,
        )
        .to(
          restHighlights,
          {
            autoAlpha: 1,
            ease: EASE_OUT,
            stagger: 0.6,
          },
          0,
        );
    },
    { scope: containerRef, dependencies: [reducedMotion, canPin] },
  );

  const revealDistance = Math.max(0, services.length - 1) * SCROLL_DISTANCE_PER_CARD;

  return (
    <div
      ref={containerRef}
      style={
        canPin
          ? { minHeight: `calc(100vh - ${HEADER_HEIGHT}px + ${revealDistance}px)` }
          : undefined
      }
    >
      <div
        className={
          canPin
            ? "sticky flex flex-col justify-center"
            : "flex flex-col justify-center"
        }
        style={
          canPin
            ? { top: HEADER_HEIGHT, height: `calc(100vh - ${HEADER_HEIGHT}px)` }
            : undefined
        }
      >
        {heading}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:mt-14 lg:grid-cols-3">
          {services.map((service, i) => {
            return (
              <div
                key={service.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="h-full"
              >
                <article className="service-card relative flex h-full flex-col rounded-[28px] border border-white/10 bg-white/4 p-6">
                  <div
                    ref={(el) => {
                      highlightRefs.current[i] = el;
                    }}
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-10 rounded-[28px] opacity-0 ring-2 ring-lilac ring-inset"
                  />
                  <h3 className="font-display text-xl font-bold leading-snug">
                    {service.name}
                  </h3>
                  <p className="service-card-copy mt-3 text-sm leading-relaxed text-text-secondary">
                    {service.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag.name}
                        className="service-card-tag rounded-pill border border-white/15 px-3 py-1 text-xs text-white/70"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>

                  <div className="service-card-visual relative mt-6 aspect-4/3 w-full overflow-hidden rounded-2xl border border-white/8 bg-near-black">
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      className="object-cover object-right"
                      sizes="(min-width: 1024px) 30vw, 90vw"
                    />
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
