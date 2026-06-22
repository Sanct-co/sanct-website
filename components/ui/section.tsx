import { type ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: "indigo" | "ghost" | "dark" | "white";
};

const backgrounds = {
  indigo: "bg-sanct-indigo text-white",
  ghost: "bg-ghost-indigo text-near-black",
  dark: "bg-near-black text-white",
  white: "bg-white text-near-black",
};

export function Section({
  children,
  className = "",
  id,
  background = "ghost",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-(--spacing-section-y) ${backgrounds[background]} ${className}`}
    >
      <div className="mx-auto max-w-(--max-width-container) px-(--spacing-section-x)">
        {children}
      </div>
    </section>
  );
}
