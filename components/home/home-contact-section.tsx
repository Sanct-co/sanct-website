"use client";

import { useRef } from "react";
import { EASE_OUT, gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const labelClass =
  "block text-[0.65rem] font-bold uppercase tracking-[0.12em] text-text-secondary";

const inputClass =
  "w-full border-b border-border-dark bg-transparent pb-2.5 pt-1.5 text-base text-white placeholder:text-text-muted focus:border-lilac focus:outline-none transition-[border-color] duration-150 ease-out";

function CharMask({ char }: { char: string }) {
  return (
    <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
      <span data-contact-char="" style={{ display: "inline-block" }}>{char}</span>
    </span>
  );
}

export function HomeContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      const chars = sectionRef.current?.querySelectorAll<HTMLElement>("[data-contact-char]");
      const details = sectionRef.current?.querySelector<HTMLElement>("[data-contact-details]");
      const form = sectionRef.current?.querySelector<HTMLElement>("[data-contact-form]");

      if (chars?.length) {
        gsap.from(chars, {
          y: "100%",
          duration: 0.75,
          ease: EASE_OUT,
          stagger: 0.035,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        });
      }

      if (details) {
        gsap.from(details, {
          autoAlpha: 0,
          y: 24,
          duration: 0.65,
          ease: EASE_OUT,
          delay: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        });
      }

      if (form) {
        gsap.from(form, {
          autoAlpha: 0,
          y: 32,
          duration: 0.8,
          ease: EASE_OUT,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <section ref={sectionRef} id="contact" className="bg-near-black py-(--spacing-section-y) px-(--spacing-section-x)">
      <div className="mx-auto grid w-full max-w-(--max-width-container) gap-16 lg:grid-cols-2 lg:gap-24">
        {/* Left */}
        <div className="flex flex-col justify-center">
          <h2 className="font-display text-[clamp(3.5rem,8vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-white">
            {"LET'S".split("").map((char, i) => (
              <CharMask key={`l${i}`} char={char} />
            ))}
            <br />
            {"BUILD.".split("").map((char, i) => (
              <CharMask key={`b${i}`} char={char} />
            ))}
          </h2>
          <p data-contact-details="" className="mt-8 max-w-sm text-lg leading-relaxed text-text-secondary">
            Tell us what you need. We&apos;ll show you how fast we can make it
            happen.
          </p>
        </div>

        {/* Right: form */}
        <form data-contact-form="" className="space-y-8" noValidate>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <label htmlFor="hs-name" className={labelClass}>
                Name
              </label>
              <input
                id="hs-name"
                name="name"
                type="text"
                placeholder="What is your name?"
                autoComplete="name"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="hs-email" className={labelClass}>
                Email Address
              </label>
              <input
                id="hs-email"
                name="email"
                type="email"
                placeholder="What is your email address?"
                autoComplete="email"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="hs-company" className={labelClass}>
              Company (Optional)
            </label>
            <input
              id="hs-company"
              name="company"
              type="text"
              placeholder="What is your company's name? (Optional)"
              autoComplete="organization"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="hs-looking" className={labelClass}>
              What Are You Looking For?
            </label>
            <input
              id="hs-looking"
              name="looking"
              type="text"
              placeholder="What are you looking for?"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="hs-source" className={labelClass}>
              How Did You Hear About Us?
            </label>
            <select
              id="hs-source"
              name="source"
              defaultValue=""
              className={`${inputClass} appearance-none`}
            >
              <option value="" disabled className="bg-near-black">
                How did you hear about us?
              </option>
              <option value="referral" className="bg-near-black">
                Referral
              </option>
              <option value="social" className="bg-near-black">
                Social Media
              </option>
              <option value="search" className="bg-near-black">
                Search Engine
              </option>
              <option value="other" className="bg-near-black">
                Other
              </option>
            </select>
          </div>

          <div>
            <label htmlFor="hs-details" className={labelClass}>
              Any Additional Info About What You&apos;re Looking For? (Optional)
            </label>
            <textarea
              id="hs-details"
              name="details"
              rows={3}
              placeholder="Feel free to share any additional details. (Optional)"
              className={`${inputClass} resize-none`}
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-pill bg-sanct-indigo py-4 text-sm font-bold uppercase tracking-[0.1em] text-white transition-[background-color] duration-150 ease-out hover:bg-indigo-mid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lilac"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
