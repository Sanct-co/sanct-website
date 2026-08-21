"use client";

import { useRef, type ReactNode } from "react";
import { EASE_OUT, gsap, useGSAP } from "@/lib/gsap";
import { useMediaQuery } from "@/lib/use-media-query";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { services } from "@/lib/services";

const DOT_GRID_STYLE = {
  backgroundImage:
    "radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px)",
  backgroundSize: "14px 14px",
};

function BrowserVisual() {
  return (
    <div className="absolute inset-5 flex flex-col overflow-hidden rounded-lg border border-white/10 bg-near-black shadow-xl">
      <div className="flex shrink-0 items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
      </div>
      <div className="relative flex-1 bg-linear-to-br from-indigo-mid via-sanct-indigo to-near-black">
        <span
          className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-lilac/40 blur-2xl"
          aria-hidden="true"
        />
        <span className="absolute left-4 top-4 h-2 w-16 rounded-full bg-white/25" />
        <span className="absolute left-4 top-8 h-2 w-10 rounded-full bg-white/15" />
        <span className="absolute bottom-4 right-4 flex h-8 items-center justify-center rounded-full bg-white px-4 text-[9px] font-extrabold uppercase tracking-wide text-sanct-indigo shadow-lg shadow-lilac/50">
          Ship it
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="white"
          className="absolute bottom-8 right-16 h-5 w-5 rotate-[-8deg] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          aria-hidden="true"
        >
          <path d="M3 2l6.5 17 2.2-7 7-2.2L3 2z" />
        </svg>
      </div>
    </div>
  );
}

function BurstVisual() {
  const cx = 50;
  const cy = 38;
  const spokes = Array.from({ length: 8 }).map((_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    return {
      x: cx + Math.cos(angle) * 32,
      y: cy + Math.sin(angle) * 24,
      big: i % 2 === 0,
    };
  });
  return (
    <div className="absolute inset-5 flex items-center justify-center">
      <div className="animate-proof-glow absolute h-16 w-16 rounded-full bg-lilac/20 blur-xl" />
      <svg
        viewBox="0 0 100 76"
        className="relative h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="burstCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e4e2fd" />
            <stop offset="100%" stopColor="#a09cf5" />
          </radialGradient>
        </defs>
        {spokes.map((s, i) => (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={s.x}
            y2={s.y}
            stroke="rgba(160,156,245,0.5)"
            strokeWidth="1.2"
            strokeDasharray="2.5 3"
          />
        ))}
        <circle cx={cx} cy={cy} r="18" stroke="rgba(160,156,245,0.25)" strokeWidth="1.5" />
        {spokes.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.big ? 3 : 1.8}
            fill={s.big ? "#a09cf5" : "rgba(255,255,255,0.85)"}
          />
        ))}
        <circle cx={cx} cy={cy} r="10" fill="url(#burstCore)" />
        <path
          d="M48 33 L52 33 L50 39 L54 39 L47 48 L49 41 L46 41 Z"
          fill="#111015"
        />
      </svg>
    </div>
  );
}

function CompassVisual() {
  const cx = 50;
  const cy = 38;
  const ticks = Array.from({ length: 16 }).map((_, i) => {
    const angle = (i / 16) * Math.PI * 2;
    return {
      x1: cx + Math.cos(angle) * 27,
      y1: cy + Math.sin(angle) * 20,
      x2: cx + Math.cos(angle) * 31,
      y2: cy + Math.sin(angle) * 23,
    };
  });
  return (
    <svg
      viewBox="0 0 100 76"
      className="absolute inset-5 h-[calc(100%-2.5rem)] w-[calc(100%-2.5rem)]"
      fill="none"
      aria-hidden="true"
    >
      {ticks.map((t, i) => (
        <line
          key={i}
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1"
        />
      ))}
      <circle cx={cx} cy={cy} r="27" stroke="rgba(160,156,245,0.3)" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r="17" stroke="rgba(160,156,245,0.2)" strokeWidth="1" strokeDasharray="1 3" />
      <line
        x1={cx - 22}
        y1={cy + 8}
        x2={cx + 26}
        y2={cy - 20}
        stroke="#a09cf5"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d={`M${cx + 26} ${cy - 20} l-8 1 5 7 z`} fill="#a09cf5" />
      <circle cx={cx} cy={cy} r="4" fill="#111015" stroke="#a09cf5" strokeWidth="2" />
    </svg>
  );
}

const visualsByServiceId: Record<string, () => ReactNode> = {
  "custom-software": BrowserVisual,
  "ai-tools-and-automations": BurstVisual,
  consulting: CompassVisual,
};

const fallbackVisuals = [BrowserVisual, BurstVisual, CompassVisual];

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
        <div className="group/grid mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {services.map((service, i) => {
            const Visual =
              visualsByServiceId[service.id] ??
              fallbackVisuals[i % fallbackVisuals.length];
            return (
              <div
                key={service.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="h-full"
              >
                <article className="relative flex h-full flex-col rounded-card border border-white/10 bg-white/3 p-6 opacity-100 grayscale-0 transition-[opacity,filter,transform,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-lilac/40! hover:opacity-100! hover:grayscale-0! group-hover/grid:opacity-40 group-hover/grid:grayscale">
                  <div
                    ref={(el) => {
                      highlightRefs.current[i] = el;
                    }}
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-10 rounded-card opacity-0 ring-2 ring-lilac ring-inset"
                  />

                  <div
                    className="relative aspect-4/3 w-full overflow-hidden rounded-xl border border-white/8 bg-near-black/50"
                    style={DOT_GRID_STYLE}
                  >
                    <Visual />
                  </div>

                  <h3 className="mt-6 font-display text-xl font-bold leading-snug">
                    {service.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {service.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-pill border border-white/15 px-3 py-1 text-xs text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
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
