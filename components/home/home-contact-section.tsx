"use client";

import { useActionState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import {
  submitHomeContact,
  type ContactFormState,
} from "@/app/(site)/contact/actions";
import { EASE_OUT, gsap, useGSAP } from "@/lib/gsap";
import { services } from "@/lib/services";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const labelClass =
  "block text-[0.65rem] font-bold uppercase tracking-[0.12em] text-text-secondary";

const inputClass =
  "w-full border-b border-border-dark bg-transparent pb-2.5 pt-1.5 text-base text-white placeholder:text-text-muted focus:border-lilac focus:outline-none transition-[border-color] duration-150 ease-out";

const serviceOptions = [
  ...services.map((s) => ({ id: s.id, name: s.name })),
  { id: "other", name: "Other" },
];

const initialState: ContactFormState = {
  success: false,
  message: "",
};

function CharMask({ char }: { char: string }) {
  return (
    <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
      <span data-contact-char="" style={{ display: "inline-block" }}>{char}</span>
    </span>
  );
}

export function HomeContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const reducedMotion = useReducedMotion();

  const [state, formAction, pending] = useActionState(
    submitHomeContact,
    initialState,
  );

  useEffect(() => {
    if (!state.message) return;
    if (state.success) {
      toast.success(state.message);
      formRef.current?.reset();
    } else {
      toast.error(state.message);
    }
  }, [state]);

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
        <form
          ref={formRef}
          data-contact-form=""
          action={formAction}
          className="space-y-8"
          noValidate
        >
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <label htmlFor="hs-name" className={labelClass}>
                Name
              </label>
              <input
                id="hs-name"
                name="name"
                type="text"
                required
                placeholder="What is your name?"
                autoComplete="name"
                className={inputClass}
                aria-invalid={!!state.errors?.name}
                aria-describedby={state.errors?.name ? "hs-name-error" : undefined}
              />
              {state.errors?.name && (
                <p id="hs-name-error" className="mt-1 text-xs text-red-400">
                  {state.errors.name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="hs-email" className={labelClass}>
                Email Address
              </label>
              <input
                id="hs-email"
                name="email"
                type="email"
                required
                placeholder="What is your email address?"
                autoComplete="email"
                className={inputClass}
                aria-invalid={!!state.errors?.email}
                aria-describedby={state.errors?.email ? "hs-email-error" : undefined}
              />
              {state.errors?.email && (
                <p id="hs-email-error" className="mt-1 text-xs text-red-400">
                  {state.errors.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="hs-phone" className={labelClass}>
              Phone (Optional)
            </label>
            <input
              id="hs-phone"
              name="phone"
              type="tel"
              placeholder="What is your phone number? (Optional)"
              autoComplete="tel"
              className={inputClass}
            />
          </div>

          <fieldset>
            <legend className={labelClass}>What Service Are You Looking For?</legend>
            <div
              className="mt-3 flex flex-wrap gap-x-6 gap-y-3"
              aria-invalid={!!state.errors?.service}
              aria-describedby={state.errors?.service ? "hs-service-error" : undefined}
            >
              {serviceOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex cursor-pointer items-center gap-2 text-sm text-white/80"
                >
                  <input
                    type="checkbox"
                    name="service"
                    value={option.id}
                    className="size-4 accent-[var(--lilac)]"
                  />
                  {option.name}
                </label>
              ))}
            </div>
            {state.errors?.service && (
              <p id="hs-service-error" className="mt-1 text-xs text-red-400">
                {state.errors.service}
              </p>
            )}
          </fieldset>

          <div>
            <label htmlFor="hs-message" className={labelClass}>
              Message
            </label>
            <textarea
              id="hs-message"
              name="message"
              rows={3}
              required
              placeholder="Tell us what you need."
              className={`${inputClass} resize-none`}
              aria-invalid={!!state.errors?.message}
              aria-describedby={state.errors?.message ? "hs-message-error" : undefined}
            />
            {state.errors?.message && (
              <p id="hs-message-error" className="mt-1 text-xs text-red-400">
                {state.errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={pending}
            className="mt-2 w-full rounded-pill bg-sanct-indigo py-4 text-sm font-bold uppercase tracking-[0.1em] text-white transition-[background-color] duration-150 ease-out hover:bg-indigo-mid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lilac disabled:opacity-60"
          >
            {pending ? "Sending…" : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
