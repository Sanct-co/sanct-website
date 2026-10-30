"use client";

import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Section } from "@/components/ui/section";

import { industries } from "@/lib/industries";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import "./hallmark/industries.css";

export function IndustriesSection() {
  const [active, setActive] = useState<number | null>(null);

  const rowRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef(false);
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
    if (shouldScroll) emblaApi?.scrollTo(index, reducedMotion);
  }

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const desktop = window.matchMedia("(min-width: 1024px)");
    let inView = false;

    const syncDesktop = () => {
      desktopRef.current = desktop.matches;
      if (desktop.matches) setActive(null);
    };

    const openSelected = () => {
      if (desktopRef.current) return;
      setActive(emblaApi?.selectedScrollSnap() ?? 0);
    };

    syncDesktop();
    emblaApi?.on("select", openSelected);
    emblaApi?.on("reInit", openSelected);

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (desktopRef.current) return;
        if (entry.intersectionRatio >= 0.35) openSelected();
        else if (entry.intersectionRatio <= 0.08) setActive(null);
      },
      { threshold: [0, 0.08, 0.35, 0.6] },
    );
    observer.observe(row);

    const onDesktopChange = () => {
      syncDesktop();
      if (!desktop.matches && inView) openSelected();
    };
    desktop.addEventListener("change", onDesktopChange);

    return () => {
      emblaApi?.off("select", openSelected);
      emblaApi?.off("reInit", openSelected);
      observer.disconnect();
      desktop.removeEventListener("change", onDesktopChange);
    };
  }, [emblaApi]);

  return (
    <Section id="industries" background="white" className="sanct-industries scroll-mt-20">
      <div className="sanct-industries__layout">
        <h2 className="sanct-industries__heading">Industries <br />we build for.</h2>
        <div
          ref={(node) => {
            rowRef.current = node;
            emblaRef(node);
          }}
          className="sanct-industries__viewport"
          data-lenis-prevent-touch=""
        >
          <div
            className="sanct-industries__list"
            role="list"
            onMouseLeave={() => {
              if (desktopRef.current) setActive(null);
            }}
          >
            {industries.map((industry, index) => {
              const selected = index === active;
              return (
                <div
                  id={industry.id}
                  key={industry.id}
                  role="listitem"
                  className="sanct-industries__item"
                  data-selected={selected || undefined}
                >
                  <button
                    type="button"
                    aria-pressed={selected}
                    onMouseEnter={() => {
                      if (desktopRef.current) selectIndustry(index, false);
                    }}
                    onFocus={() => {
                      if (desktopRef.current) selectIndustry(index, true);
                    }}
                    onClick={() => selectIndustry(index, true)}
                    onBlur={(event) => {
                      if (!desktopRef.current) return;
                      const next = event.relatedTarget;
                      if (!(next instanceof Node) || !event.currentTarget.parentElement?.parentElement?.contains(next)) {
                        setActive(null);
                      }
                    }}
                    className="sanct-industries__row"
                  >
                    <span className="sanct-industries__name">{industry.name}</span>
                    <span className="sanct-industries__details">
                      <span className="sanct-industries__description">{industry.description}</span>
                      <span className="sanct-industries__offerings">
                        {industry.offerings.map((offering) => <span key={offering.name}>{offering.name}</span>)}
                      </span>
                    </span>
                    <span className="sanct-industries__region">{industry.region}</span>
                  </button>
                  {selected && index < industries.length - 1 && (
                    <button
                      type="button"
                      aria-label={`Next: ${industries[index + 1].name}`}
                      onClick={() => {
                        selectIndustry(index + 1, true);
                        rowRef.current
                          ?.querySelectorAll<HTMLButtonElement>(".sanct-industries__row")[index + 1]
                          ?.focus({ preventScroll: true });
                      }}
                      className="sanct-industries__next"
                    >
                      <svg viewBox="0 0 12 12" width="16" height="16" fill="none" aria-hidden="true">
                        <path d="M4.25 2.25 8 6l-3.75 3.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
