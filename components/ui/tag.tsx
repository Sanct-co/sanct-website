type TagProps = {
  children: React.ReactNode;
  variant?: "lilac" | "indigo" | "muted";
  className?: string;
};

const variants = {
  lilac: "text-lilac",
  indigo: "text-sanct-indigo",
  muted: "text-on-light-muted",
};

export function Tag({ children, variant = "lilac", className = "" }: TagProps) {
  return (
    <span
      className={`font-terminal text-[11px] uppercase tracking-[0.08em] ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
