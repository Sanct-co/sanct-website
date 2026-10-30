"use client";

import { useActionState, useEffect, useRef, useState, type FormEvent } from "react";
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
import "./hallmark/contact.css";

const labelClass = "sanct-contact__label";

const inputClass =
  "sanct-contact__input";

const serviceOptions = [
  ...services.map((s) => ({ id: s.id, name: s.name })),
  { id: "other", name: "Other" },
];

const initialState: ContactFormState = {
  success: false,
  message: "",
};

const contactSteps = ["Your details", "Your project", "Your message"];

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
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formVersion, setFormVersion] = useState(0);
  const didNavigate = useRef(false);

  const [state, formAction, pending] = useActionState(
    async (previous: ContactFormState, data: FormData) => {
      const result = await submitHomeContact(previous, data);
      setErrors(result.errors ?? {});
      if (result.success) {
        didNavigate.current = false;
        setStep(0);
        setFormVersion((version) => version + 1);
      } else if (result.errors) {
        didNavigate.current = true;
        setStep(result.errors.name || result.errors.email ? 0 : result.errors.service ? 1 : 2);
      }
      return result;
    },
    initialState,
  );

  useEffect(() => {
    if (!didNavigate.current) return;
    formRef.current?.querySelector<HTMLElement>(`[data-step="${step}"] h3`)?.focus({ preventScroll: true });
  }, [step]);

  function validateStep(index: number, data: FormData) {
    const nextErrors: Record<string, string> = {};
    if (index === 0) {
      if (String(data.get("name") ?? "").trim().length < 2) nextErrors.name = "Please enter your name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.get("email") ?? "").trim())) nextErrors.email = "Please enter a valid email address.";
    }
    if (index === 1 && data.getAll("service").length === 0) nextErrors.service = "Please select at least one service.";
    if (index === 2 && String(data.get("message") ?? "").trim().length < 10) nextErrors.message = "Please enter a message (at least 10 characters).";
    return nextErrors;
  }

  function advanceStep() {
    if (!formRef.current) return;
    const nextErrors = validateStep(step, new FormData(formRef.current));
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      focusInvalidField(step);
      return;
    }
    didNavigate.current = true;
    setStep((current) => Math.min(current + 1, 2));
  }

  function focusInvalidField(index: number) {
    requestAnimationFrame(() => {
      const invalid = formRef.current?.querySelector<HTMLElement>(`[data-step="${index}"] [aria-invalid="true"]`);
      const target = invalid?.matches("input, textarea, button") ? invalid : invalid?.querySelector<HTMLButtonElement>("button");
      target?.focus();
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (step < 2) {
      event.preventDefault();
      advanceStep();
      return;
    }
    const data = new FormData(event.currentTarget);
    for (let index = 0; index < contactSteps.length; index++) {
      const nextErrors = validateStep(index, data);
      if (Object.keys(nextErrors).length) {
        event.preventDefault();
        setErrors(nextErrors);
        didNavigate.current = true;
        setStep(index);
        focusInvalidField(index);
        return;
      }
    }
  }

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
      className="sanct-contact"
    >
      <div className="sanct-contact__layout">
        <div className="sanct-contact__intro">
          <h2 className="sanct-contact__heading">
            {"Launch".split("").map((char, i) => (
              <CharMask key={`l${i}`} char={char} />
            ))}
            {" "}<br />
            {"fast.".split("").map((char, i) => (
              <CharMask key={`b${i}`} char={char} />
            ))}
          </h2>
          <p
            data-contact-details=""
            className="sanct-contact__description"
          >
            Tell us what you need. We&apos;ll show you how fast we can make it
            happen.
          </p>
        </div>

        <form
          key={formVersion}
          ref={formRef}
          data-contact-form=""
          action={formAction}
          onSubmit={handleSubmit}
          aria-busy={pending}
          className="sanct-contact__form"
          noValidate
        >
          <div className="sanct-contact__step-panel" data-step="0" hidden={step !== 0}>
          <h3 tabIndex={-1}>How can we reach you?</h3>
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
                aria-invalid={!!errors.name}
                aria-describedby={
                  errors.name ? "hs-name-error" : undefined
                }
              />
              {errors.name && (
                <p id="hs-name-error" className="mt-1.5 text-xs text-red-400">
                  {errors.name}
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
                aria-invalid={!!errors.email}
                aria-describedby={
                  errors.email ? "hs-email-error" : undefined
                }
              />
              {errors.email && (
                <p id="hs-email-error" className="mt-1.5 text-xs text-red-400">
                  {errors.email}
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
          </div>

          <div className="sanct-contact__step-panel" data-step="1" hidden={step !== 1}>
          <h3 tabIndex={-1}>What are we building?</h3>
          <ServiceSelect
            options={serviceOptions}
            variant="light"
            legend="What service are you looking for?"
            error={errors.service}
            errorTextClass="sanct-contact__error"
          />

          <BudgetSelect variant="light" legend="What's your budget?" />
          </div>

          <div className="sanct-contact__step-panel" data-step="2" hidden={step !== 2}>
            <h3 tabIndex={-1}>Tell us a little more.</h3>
            <label htmlFor="hs-message" className={labelClass}>
              Message <span className="text-lilac">*</span>
            </label>
            <textarea
              id="hs-message"
              name="message"
              rows={4}
              required
              placeholder="Tell us what you need."
              className={`${inputClass} resize-y`}
              aria-invalid={!!errors.message}
              aria-describedby={
                errors.message ? "hs-message-error" : undefined
              }
            />
            {errors.message && (
              <p id="hs-message-error" className="mt-1.5 text-xs text-red-400">
                {errors.message}
              </p>
            )}
          </div>

          <div className="sanct-contact__submit-row">
            {step > 0 ? (
              <button type="button" className="sanct-contact__back" disabled={pending} onClick={() => {
                didNavigate.current = true;
                setStep((current) => current - 1);
              }}>Back</button>
            ) : null}
            <div className="sanct-contact__progress" role="img" aria-label={`Step ${step + 1} of ${contactSteps.length}`}>
              {contactSteps.map((label, index) => (
                <span key={label} className={index === step ? "is-current" : undefined} />
              ))}
            </div>
            {step < 2 ? (
              <button key="continue" type="button" className="sanct-contact__submit" onClick={(event) => {
                event.preventDefault();
                advanceStep();
              }}>Continue</button>
            ) : <button
              key="send"
              type="submit"
              disabled={pending}
              className="sanct-contact__submit"
            >
              {pending ? "Sending…" : "Send message"}
            </button>}
          </div>
          <p className="sanct-contact__reply">We reply within one business day.</p>
        </form>
      </div>
    </section>
  );
}
