import { socialLinks } from "@/lib/site";

const icons = {
  facebook: (
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  ),
} as const;

type SocialLinksProps = {
  variant?: "footer" | "contact";
};

export function SocialLinks({ variant = "footer" }: SocialLinksProps) {
  const isFooter = variant === "footer";

  return (
    <ul className={isFooter ? "mt-5 flex gap-3" : "mt-2 flex gap-3"}>
      {socialLinks.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className={
              isFooter
                ? "flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-colors duration-150 ease-out hover:border-lilac hover:bg-lilac/10 hover:text-lilac focus-visible:border-lilac focus-visible:text-lilac"
                : "flex size-11 items-center justify-center rounded-full border border-border-light bg-ghost text-sanct-indigo transition-colors duration-150 ease-out hover:border-sanct-indigo hover:bg-sanct-indigo/5 focus-visible:border-sanct-indigo"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5"
              aria-hidden
            >
              {icons[link.icon]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
