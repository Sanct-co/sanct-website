"use client";

import { useActionState } from "react";
import { submitContact, type ContactFormState } from "@/app/contact/actions";
import { contact } from "@/lib/site";

const initialState: ContactFormState = {
  success: false,
  message: "",
};

const inputClass =
  "w-full rounded-input border border-border-light bg-white px-4 py-3.5 text-base text-near-black transition-[border-color] duration-150 ease-out placeholder:text-on-light-muted/60 focus:border-sanct-indigo focus:outline-none";

const labelClass = "block text-base font-bold text-near-black";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );

  if (state.success) {
    return (
      <div
        className="rounded-card border border-border-light bg-white p-9 text-center"
        role="status"
      >
        <p className="font-display text-3xl font-extrabold text-sanct-indigo">
          Message sent.
        </p>
        <p className="mt-4 text-lg text-on-light-muted">{state.message}</p>
      </div>
    );
  }

  return (
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
        <label htmlFor="company" className={labelClass}>
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          className={`mt-2 ${inputClass}`}
        />
      </div>

      <div>
        <label htmlFor="inquiry" className={labelClass}>
          What are you looking for? <span className="text-sanct-indigo">*</span>
        </label>
        <select
          id="inquiry"
          name="inquiry"
          required
          defaultValue=""
          className={`mt-2 ${inputClass}`}
          aria-invalid={!!state.errors?.inquiry}
          aria-describedby={state.errors?.inquiry ? "inquiry-error" : undefined}
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="New project">New project</option>
          <option value="General inquiry">General inquiry</option>
          <option value="Partnership">Partnership</option>
        </select>
        {state.errors?.inquiry && (
          <p id="inquiry-error" className="mt-1 text-sm text-red-600">
            {state.errors.inquiry}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message <span className="text-sanct-indigo">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
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

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center rounded-pill bg-sanct-indigo px-7 py-3.5 text-base font-bold text-white transition-[background-color] duration-150 ease-out hover:bg-indigo-mid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lilac disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Sending…" : "Send Message"}
      </button>

      <div className="border-t border-border-light pt-6">
        <p className="text-base text-on-light-muted">Or reach us directly:</p>
        <ul className="mt-4 space-y-3 text-base">
          <li>
            <a
              href={contact.phoneHref}
              className="font-bold text-sanct-indigo transition-colors duration-150 ease-out hover:text-indigo-mid"
            >
              {contact.phone}
            </a>
          </li>
          <li>
            <a
              href={contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-sanct-indigo transition-colors duration-150 ease-out hover:text-indigo-mid"
            >
              Facebook
            </a>
          </li>
        </ul>
      </div>
    </form>
  );
}
