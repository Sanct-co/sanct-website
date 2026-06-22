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
      className={`text-xs font-medium uppercase tracking-[0.1em] ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
