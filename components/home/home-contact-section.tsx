"use client";

import { useActionState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import {
  submitHomeContact,
  type ContactFormState,
} from "@/app/(site)/contact/actions";
import { BudgetSelect } from "@/components/contact/budget-select";
import { ServiceSelect } from "@/components/contact/service-select";
import { EASE_OUT, gsap, useGSAP } from "@/lib/gsap";
import { services } from "@/lib/services";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const labelClass = "block text-base font-semibold text-white";

const inputClass =
  "mt-1.5 w-full rounded-input border border-white/10 bg-white/[0.04] px-4 py-3 text-base text-white placeholder:text-white/35 transition-[border-color,background-color] duration-150 ease-out focus:border-lilac focus:bg-white/[0.06] focus:outline-none";

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
    <span
      style={{
        display: "inline-block",
        overflow: "hidden",
        verticalAlign: "bottom",
      }}
    >
      <span data-contact-char="" style={{ display: "inline-block" }}>
        {char}
      </span>
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

      const chars = sectionRef.current?.querySelectorAll<HTMLElement>(
        "[data-contact-char]",
      );
      const details = sectionRef.current?.querySelector<HTMLElement>(
        "[data-contact-details]",
      );
      const form = sectionRef.current?.querySelector<HTMLElement>(
        "[data-contact-form]",
      );

      const compact = window.matchMedia("(max-width: 1023px)").matches;
      const start = compact ? "top 92%" : "top 75%";

      if (chars?.length) {
        gsap.from(chars, {
          y: compact ? "40%" : "100%",
          duration: 0.75,
          ease: EASE_OUT,
          stagger: compact ? 0.02 : 0.035,
          scrollTrigger: {
            trigger: sectionRef.current,
            start,
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
            start,
            once: true,
          },
        });
      }

      if (form) {
        gsap.from(form, {
          autoAlpha: 0,
          y: compact ? 16 : 32,
          duration: 0.8,
          ease: EASE_OUT,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: compact ? "top 94%" : "top 70%",
            once: true,
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="flex items-center bg-near-black px-(--spacing-section-x) pt-8 pb-28 md:pb-8 lg:min-h-[calc(100dvh-4.5rem)] lg:py-6"
    >
      <div className="mx-auto grid w-full max-w-(--max-width-container) items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,38rem)] lg:gap-x-16">
        <div>
          <h2 className="font-display text-[clamp(3.5rem,7vw,5.5rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-white">
            {"LAUNCH".split("").map((char, i) => (
              <CharMask key={`l${i}`} char={char} />
            ))}
            <br />
            {"FAST.".split("").map((char, i) => (
              <CharMask key={`b${i}`} char={char} />
            ))}
          </h2>
          <p
            data-contact-details=""
            className="mt-6 max-w-sm text-lg leading-relaxed text-white/55"
          >
            Tell us what you need. We&apos;ll show you how fast we can make it
            happen.
          </p>
        </div>

        <form
          ref={formRef}
          data-contact-form=""
          action={formAction}
          className="flex flex-col gap-3.5 rounded-card border border-white/10 bg-white/[0.03] p-5"
          noValidate
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="hs-name" className={labelClass}>
                Name <span className="text-lilac">*</span>
              </label>
              <input
                id="hs-name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                autoComplete="name"
                className={inputClass}
                aria-invalid={!!state.errors?.name}
                aria-describedby={
                  state.errors?.name ? "hs-name-error" : undefined
                }
              />
              {state.errors?.name && (
                <p id="hs-name-error" className="mt-1.5 text-xs text-red-400">
                  {state.errors.name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="hs-email" className={labelClass}>
                Email <span className="text-lilac">*</span>
              </label>
              <input
                id="hs-email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                autoComplete="email"
                className={inputClass}
                aria-invalid={!!state.errors?.email}
                aria-describedby={
                  state.errors?.email ? "hs-email-error" : undefined
                }
              />
              {state.errors?.email && (
                <p id="hs-email-error" className="mt-1.5 text-xs text-red-400">
                  {state.errors.email}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="hs-phone" className={labelClass}>
                Phone{" "}
                <span className="font-normal text-white/35">(Optional)</span>
              </label>
              <input
                id="hs-phone"
                name="phone"
                type="tel"
                placeholder="09xx xxx xxxx"
                autoComplete="tel"
                className={inputClass}
              />
            </div>
          </div>

          <ServiceSelect
            options={serviceOptions}
            variant="dark"
            legend="What service are you looking for?"
            error={state.errors?.service}
            errorTextClass="mt-2 text-xs text-red-400"
          />

          <BudgetSelect variant="dark" legend="What's your budget?" />

          <div>
            <label htmlFor="hs-message" className={labelClass}>
              Message <span className="text-lilac">*</span>
            </label>
            <textarea
              id="hs-message"
              name="message"
              rows={2}
              required
              placeholder="Tell us what you need."
              className={`${inputClass} resize-y`}
              aria-invalid={!!state.errors?.message}
              aria-describedby={
                state.errors?.message ? "hs-message-error" : undefined
              }
            />
            {state.errors?.message && (
              <p id="hs-message-error" className="mt-1.5 text-xs text-red-400">
                {state.errors.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 border-t border-white/10 pt-3">
            <p className="text-base text-white/50">
              We reply within one business day.
            </p>
            <button
              type="submit"
              disabled={pending}
              className="inline-flex w-full items-center justify-center rounded-pill bg-sanct-indigo px-7 py-3 text-sm font-semibold uppercase tracking-[0.06em] text-white transition-[background-color] duration-150 ease-out hover:bg-indigo-mid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lilac disabled:opacity-60"
            >
              {pending ? "Sending…" : "Send message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
