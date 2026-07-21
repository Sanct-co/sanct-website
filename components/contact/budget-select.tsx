"use client";

import { useId, useState } from "react";

const budgetOptions = [
  { id: "100k", name: "Under ₱100K " },
  { id: "100k-250k", name: "₱100K – ₱250K" },
  { id: "250k-500k", name: "₱250K – ₱500K" },
  { id: "500k-1m", name: "₱500K – ₱1M+" }
];

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

const customInputClass = {
  light:
    "w-full rounded-input border border-border-light bg-white px-4 py-3.5 text-base text-near-black placeholder:text-on-light-muted/60 focus:border-sanct-indigo focus:outline-none",
  dark:
    "w-full border-b border-border-dark bg-transparent pb-2.5 pt-1.5 text-base text-white placeholder:text-text-muted focus:border-lilac focus:outline-none",
};

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="size-3.5 shrink-0" aria-hidden>
      <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4L8.5 12l6.8-6.8a1 1 0 0 1 1.4 0Z" />
    </svg>
  );
}

export function BudgetSelect({
  variant = "light",
  legend = "What's your budget?",
  fieldPrefix = "",
}: {
  variant?: "light" | "dark";
  legend?: string;
  fieldPrefix?: string;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const customInputId = useId();
  const colors = pillVariant[variant];
  const isCustom = selected === "custom";

  function select(id: string) {
    setSelected((prev) => (prev === id ? null : id));
  }

  return (
    <fieldset>
      <legend className={variant === "dark" ? darkLabelClass : lightLabelClass}>
        {legend}{" "}
        <span className="font-normal text-on-light-muted">(Optional)</span>
      </legend>
      <div role="group" className="mt-3 flex flex-wrap gap-2.5">
        {budgetOptions.map((option) => {
          const active = selected === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => select(option.id)}
              className={`${pillBase} ${active ? colors.active : colors.inactive}`}
            >
              {active && <CheckIcon />}
              {option.name}
              <input
                type="hidden"
                name={`${fieldPrefix}budget`}
                value={option.id}
                disabled={!active}
              />
            </button>
          );
        })}
        <button
          type="button"
          aria-pressed={isCustom}
          onClick={() => select("custom")}
          className={`${pillBase} ${isCustom ? colors.active : colors.inactive}`}
        >
          {isCustom && <CheckIcon />}
          Custom
          <input
            type="hidden"
            name={`${fieldPrefix}budget`}
            value="custom"
            disabled={!isCustom}
          />
        </button>
      </div>
      {isCustom && (
        <div className="mt-3">
          <label htmlFor={customInputId} className="sr-only">
            Describe your budget
          </label>
          <input
            id={customInputId}
            type="text"
            name={`${fieldPrefix}budgetDetails`}
            placeholder="Tell us your budget"
            className={customInputClass[variant]}
          />
        </div>
      )}
    </fieldset>
  );
}
