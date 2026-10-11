import Image from "next/image";
import Link from "next/link";
import { ScrollLink } from "@/components/ui/scroll-link";
import { contact, navLinks, site, socialLinks } from "@/lib/site";

const columnLabel = "text-sm text-on-light-muted";
const columnLink =
  "text-sm font-medium text-near-black transition-colors duration-150 ease-out hover:text-sanct-indigo focus-visible:text-sanct-indigo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-auto">
      <div className="-mt-(--radius-card) rounded-t-card bg-white text-near-black">
      <div className="mx-auto max-w-(--max-width-container) px-(--spacing-section-x)">
        <div className="flex flex-col gap-14 py-16 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xs">
            <Link
              href="/"
              aria-label="Sanct home"
              className="inline-flex flex-col items-start gap-4 rounded-tag transition-opacity duration-150 ease-out hover:opacity-80 focus-visible:opacity-80"
            >
              <span className="relative h-9 w-9 shrink-0 overflow-hidden">
                <Image
                  src="/sanct-logo.png"
                  alt=""
                  width={877}
                  height={887}
                  className="h-[175%] w-full max-w-none object-cover object-top"
                />
              </span>
              <span className="font-display text-xl font-bold leading-none tracking-[-0.02em]">
                Sanct
              </span>
            </Link>
            <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-on-light-muted">
              {site.tagline}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-3 lg:w-full lg:max-w-2xl">
            <div>
              <h2 className={columnLabel}>Navigate</h2>
              <ul className="mt-4 space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <ScrollLink href={link.href} className={columnLink}>
                      {link.label}
                    </ScrollLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className={columnLabel}>Contact</h2>
              <ul className="mt-4 space-y-3">
                <li>
                  <a href={contact.phoneHref} className={columnLink}>
                    {contact.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={contact.addressHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={columnLink}
                  >
                    {contact.address}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className={columnLabel}>Follow</h2>
              <ul className="mt-4 space-y-3">
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={columnLink}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border-light py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-on-light-muted">
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <Link
            href="/privacy"
            className="text-sm text-on-light-muted transition-colors duration-150 ease-out hover:text-near-black focus-visible:text-near-black"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
      </div>
    </footer>
  );
}
