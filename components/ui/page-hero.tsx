import { type ReactNode } from "react";
import { Reveal } from "./reveal";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  dark?: boolean;
  background?: "ghost" | "white";
};

const lightBackgrounds = {
  ghost: "bg-ghost-indigo text-near-black",
  white: "bg-white text-near-black",
};

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  dark = false,
  background = "ghost",
}: PageHeroProps) {
  return (
    <section
      className={`py-(--spacing-section-y) ${dark ? "bg-near-black text-white" : lightBackgrounds[background]}`}
    >
      <div className="mx-auto max-w-(--max-width-container) px-(--spacing-section-x)">
        <Reveal>
          {eyebrow && (
            <p className="font-terminal text-[12px] uppercase tracking-[0.08em] text-lilac">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-2 font-display text-5xl font-extrabold leading-[1.05] tracking-[-0.03em] md:text-6xl">
            {title}
          </h1>
          {description && (
            <p
              className={`mt-5 max-w-2xl text-xl leading-relaxed ${dark ? "text-text-secondary" : "text-on-light-muted"}`}
            >
              {description}
            </p>
          )}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
