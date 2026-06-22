import Image from "next/image";
import Link from "next/link";
import { contact, navLinks, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-near-black text-white">
      <div className="mx-auto max-w-(--max-width-container) px-(--spacing-section-x) py-20">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-block rounded-tag transition-opacity duration-150 ease-out hover:opacity-80 focus-visible:opacity-80"
            >
              <Image
                src="/sanct-logo.png"
                alt="Sanct"
                width={140}
                height={36}
                className="h-9 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-xs text-base leading-relaxed text-text-secondary">
              {site.tagline}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-lilac">
              Navigate
            </h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base text-white/70 transition-colors duration-150 ease-out hover:text-lilac focus-visible:text-lilac"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-lilac">
              Contact
            </h2>
            <ul className="mt-5 space-y-4 text-base text-white/70">
              <li>
                <a
                  href={contact.phoneHref}
                  className="transition-colors duration-150 ease-out hover:text-lilac focus-visible:text-lilac"
                >
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-150 ease-out hover:text-lilac focus-visible:text-lilac"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-lilac">
              Location
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/70">
              {contact.location}
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-border-dark pt-8">
          <p className="text-sm text-text-muted">
            &copy; {year} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
