"use client";

import { useId, useState } from "react";

type ServiceSelectOption = { id: string; name: string };

const lightLabelClass = "block text-base font-bold text-near-black";
const darkLabelClass =
  "block text-[0.65rem] font-bold uppercase tracking-[0.12em] text-text-secondary";

const pillBase =
  "inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-pill border px-4 py-2 text-sm font-semibold transition-colors duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const pillVariant = {
  light: {
    inactive:
      "border-border-light bg-white text-near-black hover:border-sanct-indigo/50 focus-visible:outline-sanct-indigo",
    active: "border-sanct-indigo bg-sanct-indigo text-white focus-visible:outline-sanct-indigo",
  },
  dark: {
    inactive:
      "border-white/15 bg-white/5 text-white/80 hover:border-white/30 focus-visible:outline-lilac",
    active: "border-lilac bg-lilac text-near-black focus-visible:outline-lilac",
  },
};

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-3.5 shrink-0" aria-hidden>
      <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4L8.5 12l6.8-6.8a1 1 0 0 1 1.4 0Z" />
    </svg>
  );
}

export function ServiceSelect({
  options,
  error,
  variant = "light",
  legend = "What service are you looking for?",
  errorTextClass,
}: {
  options: ServiceSelectOption[];
  error?: string;
  variant?: "light" | "dark";
  legend?: string;
  errorTextClass?: string;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const errorId = useId();
  const colors = pillVariant[variant];

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  }

  return (
    <fieldset>
      <legend className={variant === "dark" ? darkLabelClass : lightLabelClass}>
        {legend} <span className="text-sanct-indigo">*</span>
      </legend>
      <div
        role="group"
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className="mt-3 flex flex-wrap gap-2.5"
      >
        {options.map((option) => {
          const active = selected.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(option.id)}
              className={`${pillBase} ${active ? colors.active : colors.inactive}`}
            >
              {active && <CheckIcon />}
              {option.name}
              <input type="hidden" name="service" value={option.id} disabled={!active} />
            </button>
          );
        })}
      </div>
      {error && (
        <p
          id={errorId}
          className={errorTextClass ?? "mt-1 text-sm text-red-600"}
        >
          {error}
        </p>
      )}
    </fieldset>
  );
}
