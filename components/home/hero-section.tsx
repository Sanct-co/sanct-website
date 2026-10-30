"use client";

import Image from "next/image";
import { useRef } from "react";
import { useIntro } from "@/components/providers/intro-provider";
import { ButtonLink } from "@/components/ui/button";
import { brands } from "@/lib/brands";
import { EASE_OUT, gsap, useGSAP } from "@/lib/gsap";
import "./hallmark/hero.css";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { introComplete } = useIntro();

  useGSAP(
    () => {
      if (!introComplete) return;

      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const select = gsap.utils.selector(sectionRef);
        const lines = select(".sanct-hero__title > span");
        const copy = select(".sanct-hero__aside p");
        const actions = select(".sanct-hero__actions");
        const credentials = select(".sanct-hero__credential");
        const pixels = select(".sanct-hero__edge span");

        gsap.timeline({
          defaults: { ease: EASE_OUT },
          onComplete: () => {
            gsap.set([...lines, ...copy, ...actions, ...credentials, ...pixels], {
              clearProps: "transform,opacity,transformOrigin",
            });
          },
        })
          .from(lines, { y: 32, opacity: 0, duration: 0.7, stagger: 0.12 }, 0)
          .from(copy, { y: 16, opacity: 0, duration: 0.55 }, 0.25)
          .from(actions, { y: 12, opacity: 0, duration: 0.5 }, 0.4)
          .from(credentials, { y: 12, opacity: 0, duration: 0.5, stagger: 0.06 }, 0.6)
          .from(pixels, {
            scaleY: 0,
            transformOrigin: "bottom center",
            duration: 0.6,
            stagger: { amount: 0.2, from: "center" },
          }, 0.25);
      });

      return () => media.revert();
    },
    { scope: sectionRef, dependencies: [introComplete], revertOnUpdate: true },
  );

  return (
    <section ref={sectionRef} className="sanct-hero" aria-labelledby="sanct-hero-title">
      <div className="sanct-hero__inner">
        <div className="sanct-hero__composition">
          <h1 id="sanct-hero-title" className="sanct-hero__title">
            <span>Software that </span>
            <span>strips away </span>
            <span className="sanct-hero__pixel">complexity.</span>
          </h1>
          <div className="sanct-hero__aside">
            <p>We don't let AI just create. We engineer great.</p>
            <div className="sanct-hero__actions">
              <ButtonLink href="/work" variant="primary" className="sanct-hero__primary">
                What we built
              </ButtonLink>
              <button
                type="button"
                data-cal-link="deo-talip-iwfmht/secret"
                data-cal-namespace="secret"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                className="sanct-hero__contact"
              >
                Let&apos;s talk
              </button>
            </div>
          </div>
        </div>
        <div className="sanct-hero__credentials" aria-label="Accreditations and partnerships">
          {brands.map((brand) => (
            <div key={brand.name} className="sanct-hero__credential">
              <Image src={brand.logo} alt="" width={48} height={48} className="sanct-hero__logo" />
              <span>{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="sanct-hero__edge" aria-hidden="true">
        {Array.from({ length: 72 }, (_, index) => <span key={index} />)}
      </div>
    </section>
  );
}
