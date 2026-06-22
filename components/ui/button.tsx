"use client";

import Link from "next/link";
import { type ComponentPropsWithoutRef } from "react";
import { useButtonHover } from "@/lib/use-button-hover";

type ButtonVariant = "primary" | "secondary" | "dark" | "ghost" | "cta";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-sanct-indigo text-white hover:bg-indigo-mid focus-visible:bg-indigo-mid",
  secondary:
    "border-[1.5px] border-sanct-indigo bg-transparent text-sanct-indigo hover:bg-sanct-indigo/5",
  dark: "bg-near-black text-white hover:bg-near-black/90",
  ghost:
    "border-[1.5px] border-white/30 bg-transparent text-white/70 hover:border-white/50 hover:text-white",
  cta: "bg-sanct-indigo text-white hover:bg-indigo-mid focus-visible:bg-indigo-mid",
};

const baseClass =
  "inline-flex items-center justify-center rounded-pill px-7 py-3 text-sm font-semibold uppercase tracking-[0.06em] transition-[background-color,border-color,color] duration-150 ease-out will-change-[border-radius] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lilac";

type ButtonProps = ComponentPropsWithoutRef<"a"> & {
  variant?: ButtonVariant;
};

export function Button({
  variant = "primary",
  className = "",
  children,
  onMouseEnter,
  onMouseLeave,
  ...props
}: ButtonProps) {
  const { ref, ...hoverHandlers } = useButtonHover();

  return (
    <a
      ref={ref}
      className={`${baseClass} ${variantClasses[variant]} ${className}`}
      onMouseEnter={(event) => {
        hoverHandlers.onMouseEnter();
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        hoverHandlers.onMouseLeave();
        onMouseLeave?.(event);
      }}
      {...props}
    >
      {children}
    </a>
  );
}

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: ButtonVariant;
};

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  onMouseEnter,
  onMouseLeave,
  ...props
}: ButtonLinkProps) {
  const { ref, ...hoverHandlers } = useButtonHover();

  return (
    <Link
      ref={ref}
      className={`${baseClass} ${variantClasses[variant]} ${className}`}
      onMouseEnter={(event) => {
        hoverHandlers.onMouseEnter();
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        hoverHandlers.onMouseLeave();
        onMouseLeave?.(event);
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
