"use client";

import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";
import { submitContact, type ContactFormState } from "@/app/(site)/contact/actions";
import { SocialLinks } from "@/components/ui/social-links";
import { services } from "@/lib/services";
import { contact } from "@/lib/site";

const initialState: ContactFormState = {
  success: false,
  message: "",
};

const serviceOptions = [
  ...services.map((s) => ({ id: s.id, name: s.name })),
  { id: "other", name: "Other" },
];

const inputClass =
  "w-full rounded-input border border-border-light bg-white px-4 py-3.5 text-base text-near-black transition-[border-color] duration-150 ease-out placeholder:text-on-light-muted/60 focus:border-sanct-indigo focus:outline-none";

const labelClass = "block text-base font-bold text-near-black";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );

  useEffect(() => {
    if (!state.message) return;
    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="grid overflow-hidden rounded-card border border-border-light bg-white lg:grid-cols-5">
      <div className="relative overflow-hidden bg-sanct-indigo p-9 text-white lg:col-span-2">
        <h2 className="font-display text-2xl font-bold">Contact Information</h2>
        <p className="mt-3 max-w-xs text-base text-white/70">
          Fill up the form and we&apos;ll get back to you within one business
          day.
        </p>

        <ul className="mt-10 space-y-6">
          <li className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-lilac">
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden>
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.36 11.36 0 0 0 3.58.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.58 1 1 0 0 1-.25 1.01l-2.2 2.2Z" />
              </svg>
            </span>
            <a
              href={contact.phoneHref}
              className="text-base font-bold text-white transition-colors duration-150 ease-out hover:text-lilac"
            >
              {contact.phone}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-lilac">
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden>
                <path d="M3 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H3Zm0 2 9 6 9-6v.01l-9 6.24-9-6.24V7Z" />
              </svg>
            </span>
            <a
              href={`mailto:${contact.email}`}
              className="text-base font-bold text-white transition-colors duration-150 ease-out hover:text-lilac"
            >
              {contact.email}
            </a>
          </li>
        </ul>

        <div className="relative z-10 mt-14">
          <SocialLinks variant="footer" />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -right-10 size-48 rounded-full bg-lilac/25"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-24 size-56 rounded-full bg-indigo-mid/60"
        />
      </div>

      <div className="p-9 lg:col-span-3">
        {state.success ? (
          <div className="flex h-full flex-col items-center justify-center text-center" role="status">
            <p className="font-display text-3xl font-extrabold text-sanct-indigo">
              Message sent.
            </p>
            <p className="mt-4 text-lg text-on-light-muted">{state.message}</p>
          </div>
        ) : (
          <form action={formAction} className="space-y-6" noValidate>
            {state.message && !state.success && (
              <p className="rounded-input bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                {state.message}
              </p>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelClass}>
                  Name <span className="text-sanct-indigo">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className={`mt-2 ${inputClass}`}
                  aria-invalid={!!state.errors?.name}
                  aria-describedby={state.errors?.name ? "name-error" : undefined}
                />
                {state.errors?.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-600">
                    {state.errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  Email <span className="text-sanct-indigo">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={`mt-2 ${inputClass}`}
                  aria-invalid={!!state.errors?.email}
                  aria-describedby={state.errors?.email ? "email-error" : undefined}
                />
                {state.errors?.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600">
                    {state.errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone <span className="font-normal text-on-light-muted">(Optional)</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                className={`mt-2 ${inputClass}`}
              />
            </div>

            <fieldset>
              <legend className={labelClass}>
                What service are you looking for?{" "}
                <span className="text-sanct-indigo">*</span>
              </legend>
              <div
                className="mt-3 flex flex-wrap gap-x-6 gap-y-3"
                aria-invalid={!!state.errors?.service}
                aria-describedby={state.errors?.service ? "service-error" : undefined}
              >
                {serviceOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex cursor-pointer items-center gap-2 text-base text-near-black"
                  >
                    <input
                      type="checkbox"
                      name="service"
                      value={option.id}
                      className="size-4 accent-[var(--sanct-indigo)]"
                    />
                    {option.name}
                  </label>
                ))}
              </div>
              {state.errors?.service && (
                <p id="service-error" className="mt-1 text-sm text-red-600">
                  {state.errors.service}
                </p>
              )}
            </fieldset>

            <div>
              <label htmlFor="message" className={labelClass}>
                Message <span className="text-sanct-indigo">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Write your message.."
                className={`mt-2 resize-y ${inputClass}`}
                aria-invalid={!!state.errors?.message}
                aria-describedby={state.errors?.message ? "message-error" : undefined}
              />
              {state.errors?.message && (
                <p id="message-error" className="mt-1 text-sm text-red-600">
                  {state.errors.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={pending}
                className="inline-flex w-full items-center justify-center rounded-pill bg-sanct-indigo px-7 py-3.5 text-base font-bold text-white transition-[background-color] duration-150 ease-out hover:bg-indigo-mid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lilac disabled:opacity-60 sm:w-auto"
              >
                {pending ? "Sending…" : "Send Message"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
