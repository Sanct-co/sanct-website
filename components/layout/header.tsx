"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useId, useLayoutEffect, useRef, useState, type FocusEvent, type MouseEventHandler } from "react";
import { ButtonLink } from "@/components/ui/button";
import { useIntro } from "@/components/providers/intro-provider";
import { EASE_OUT, gsap, useGSAP } from "@/lib/gsap";
import { getHashFromHref } from "@/lib/scroll-to-hash";
import { industries } from "@/lib/industries";
import { services } from "@/lib/services";
import { company, navLinks } from "@/lib/site";
import { useHashLink } from "@/lib/use-hash-link";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useLenis } from "lenis/react";

function NavLink({
  href,
  label,
  className = "",
  onNavigate,
  onMouseEnter,
  onFocus,
  large = false,
  ariaExpanded,
  ariaControls,
}: {
  href: string;
  label: string;
  className?: string;
  onNavigate?: () => void;
  onMouseEnter?: () => void;
  onFocus?: () => void;
  large?: boolean;
  ariaExpanded?: boolean;
  ariaControls?: string;
}) {
  const pathname = usePathname();
  const { onHashLinkClick } = useHashLink();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (getHashFromHref(href)) {
      onHashLinkClick(event, href);
    }
    onNavigate?.();
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      className={`header-nav-item font-terminal rounded-tag uppercase transition-colors duration-150 ease-out hover:text-sanct-indigo focus-visible:text-sanct-indigo ${
        large
          ? "py-3 text-3xl tracking-[0.02em]"
          : "px-3.5 py-2 text-base tracking-[0.04em]"
      } ${ariaExpanded !== undefined ? "inline-flex items-center gap-1.5" : ""} ${isActive ? "text-sanct-indigo" : "text-on-light-muted"} ${className}`}
    >
      {label}
      {ariaExpanded !== undefined && (
        <svg
          viewBox="0 0 12 12"
          data-open={ariaExpanded}
          className="services-chevron size-2.5 shrink-0"
          fill="none"
          aria-hidden
        >
          <path
            d="M2.25 4.5 6 8.25 9.75 4.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </Link>
  );
}

type CatalogOffering = {
  name: string;
  href: string;
  description: string;
  idealFor: string;
  linkCue?: boolean;
};

type CatalogGroup = {
  id: string;
  name: string;
  href: string;
  offerings: CatalogOffering[];
};

const serviceGroups: CatalogGroup[] = services.map((service) => ({
  id: service.id,
  name: service.name,
  href: `/services#${service.id}`,
  offerings: service.tags.map((tag) => ({
    name: tag.name,
    href: `/services#${service.id}`,
    description: tag.description,
    idealFor: tag.idealFor,
  })),
}));

const industryGroups: CatalogGroup[] = industries.map((industry) => ({
  id: industry.id,
  name: industry.name,
  href: `/#${industry.id}`,
  offerings: industry.offerings.map((offering) => ({
    name: offering.name,
    href: `/#${industry.id}`,
    description: offering.description,
    idealFor: offering.idealFor,
  })),
}));

const companyGroups: CatalogGroup[] = company.map((group) => ({
  id: group.id,
  name: group.name,
  href: group.href,
  offerings: group.offerings.map((offering) => ({
    name: offering.name,
    href: offering.href,
    description: offering.description,
    idealFor: offering.idealFor,
    linkCue: "linkCue" in offering && offering.linkCue,
  })),
}));

const catalogByLabel = {
  Services: "services",
  Industries: "industries",
  Company: "company",
} as const;

type CatalogKey = (typeof catalogByLabel)[keyof typeof catalogByLabel];

function Catalog({
  id,
  label,
  open,
  groups,
  onNavigate,
}: {
  id: string;
  label: string;
  open: boolean;
  groups: CatalogGroup[];
  onNavigate?: () => void;
}) {
  const [activeId, setActiveId] = useState(groups[0]?.id ?? "");
  const [offeringName, setOfferingName] = useState(groups[0]?.offerings[0]?.name ?? "");
  const active = groups.find((group) => group.id === activeId) ?? groups[0];
  const offering =
    active?.offerings.find((item) => item.name === offeringName) ?? active?.offerings[0];

  function selectGroup(id: string) {
    const group = groups.find((item) => item.id === id);
    setActiveId(id);
    setOfferingName(group?.offerings[0]?.name ?? "");
  }

  return (
    <div
      id={id}
      data-open={open}
      className="services-catalog absolute inset-x-0 top-full z-50 hidden rounded-b-card bg-near-black text-white shadow-[0_28px_50px_-20px_rgba(0,0,0,0.55)] lg:block"
      aria-hidden={!open}
    >
      <div className="mx-auto grid min-h-[22rem] max-w-(--max-width-container) grid-cols-[16.5rem_minmax(0,1fr)_minmax(18rem,1.15fr)] gap-10 px-(--spacing-section-x) py-8">
        <div className="flex flex-col border-r border-white/10 pr-6">
          <p className="font-terminal text-[11px] uppercase tracking-[0.14em] text-white/35">
            {label}
          </p>
          <ul className="mt-5 flex flex-col gap-1">
            {groups.map((group) => {
              const selected = group.id === active?.id;
              return (
                <li key={group.id}>
                  <Link
                    href={group.href}
                    tabIndex={open ? undefined : -1}
                    onMouseEnter={() => selectGroup(group.id)}
                    onFocus={() => selectGroup(group.id)}
                    onClick={onNavigate}
                    className={`flex items-center justify-between gap-3 whitespace-nowrap py-2.5 text-sm font-semibold uppercase tracking-[0.08em] transition-colors duration-150 ease-out ${
                      selected ? "text-white" : "text-white/45 hover:text-white"
                    }`}
                  >
                    {group.name}
                    <svg viewBox="0 0 20 20" className="size-4 shrink-0" fill="none" aria-hidden>
                      <path
                        d="M7.5 5l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {active && (
          <div className="flex flex-col justify-center py-2">
            <ul className="flex flex-col gap-3">
              {active.offerings.map((item) => {
                const selected = item.name === offering?.name;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      tabIndex={open ? undefined : -1}
                      onMouseEnter={() => setOfferingName(item.name)}
                      onPointerEnter={() => setOfferingName(item.name)}
                      onFocus={() => setOfferingName(item.name)}
                      onClick={onNavigate}
                      className={`font-display text-[1.65rem] font-bold leading-tight tracking-[-0.02em] transition-colors duration-150 ease-out ${
                        selected ? "text-lilac" : "text-white hover:text-lilac"
                      }`}
                    >
                      {item.linkCue ? (
                        <span className="relative inline-block pr-5">
                          {item.name}
                          <svg
                            viewBox="0 0 12 12"
                            className="absolute top-1 right-0 size-3"
                            fill="none"
                            aria-hidden
                          >
                            <path
                              d="M3.25 8.75 8.75 3.25M4.75 3.25h4v4"
                              stroke="currentColor"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      ) : (
                        item.name
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {offering && (
          <div key={offering.name} className="catalog-copy flex flex-col justify-center pr-2">
            <p className="font-terminal text-[11px] uppercase tracking-[0.14em] text-lilac">
              {offering.name}
            </p>
            <p className="mt-4 max-w-md font-display text-[1.75rem] font-bold leading-snug tracking-[-0.02em] text-white">
              {offering.description}
            </p>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.12em] text-white/40">
              Ideal for
            </p>
            <p className="mt-2 max-w-md text-base leading-relaxed text-white/65">
              {offering.idealFor}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

type HeaderSurface = "light" | "dark" | "indigo";

function readHeaderSurface(header: HTMLElement): HeaderSurface {
  const rect = header.getBoundingClientRect();
  const x = Math.min(Math.max(32, window.innerWidth / 2), window.innerWidth - 32);
  const y = Math.min(rect.bottom + 2, window.innerHeight - 1);
  const stack = document.elementsFromPoint(x, y);

  for (const element of stack) {
    if (header.contains(element)) continue;
    let current: Element | null = element.closest("section, footer") ?? element;
    while (current && current !== document.body) {
      if (header.contains(current)) break;
      const surface = classifySurface(getComputedStyle(current).backgroundColor);
      if (surface) return surface;
      current = current.parentElement;
    }
  }

  return "light";
}

function classifySurface(color: string): HeaderSurface | null {
  const match = color.match(
    /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?/,
  );
  if (!match) return null;

  const red = Number(match[1]);
  const green = Number(match[2]);
  const blue = Number(match[3]);
  const alpha = match[4] === undefined ? 1 : Number(match[4]);
  if (alpha < 0.5) return null;

  const indigoDistance = Math.hypot(red - 44, green - 31, blue - 168);
  if (indigoDistance < 48) return "indigo";

  const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;
  return luminance < 0.55 ? "dark" : "light";
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [catalog, setCatalog] = useState<CatalogKey | null>(null);
  const [surface, setSurface] = useState<HeaderSurface>("light");
  const pathname = usePathname();
  const servicesMenuId = useId();
  const industriesMenuId = useId();
  const companyMenuId = useId();
  const menuId = useId();
  const lenis = useLenis();
  const reducedMotion = useReducedMotion();
  const { introComplete } = useIntro();
  const headerMotionMode = !introComplete
    ? "hold"
    : reducedMotion
      ? "static"
      : "animate";

  const headerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const mobileNavInnerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const next = readHeaderSurface(header);
      setSurface((current) => (current === next ? current : next));
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    const watch = new IntersectionObserver(schedule, {
      rootMargin: "-72px 0px -40% 0px",
      threshold: [0, 1],
    });
    const observeSections = () => {
      watch.disconnect();
      document
        .querySelectorAll("main section, footer")
        .forEach((section) => watch.observe(section));
    };

    schedule();
    observeSections();
    const settle = [120, 450, 1000].map((delay) => window.setTimeout(schedule, delay));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const stopLenis = lenis?.on("scroll", schedule);
    const main = document.querySelector("main");
    const content = new MutationObserver(() => {
      observeSections();
      schedule();
    });
    if (main) content.observe(main, { childList: true, subtree: true });

    return () => {
      settle.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      stopLenis?.();
      content.disconnect();
      watch.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [lenis, pathname, introComplete]);

  useEffect(() => {
    if (lenis) {
      if (menuOpen) {
        lenis.stop();
      } else {
        lenis.start();
      }
      return;
    }

    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, lenis]);

  useGSAP(
    () => {
      const header = headerRef.current;
      const logo = logoRef.current;
      const nav = navRef.current;
      const menuButton = menuButtonRef.current;

      if (!header || !logo || !nav || !menuButton) return;

      const navItems = header.querySelectorAll(".header-nav-item");

      const showHeaderElements = () => {
        gsap.set(header, { y: 0, clearProps: "transform" });
        gsap.set([logo, ...navItems, menuButton], {
          autoAlpha: 1,
          x: 0,
          y: 0,
          clearProps: "opacity,visibility,transform",
        });
      };

      const hideHeaderElements = () => {
        gsap.set(header, {
          y: -72,
          backgroundColor: "#ffffff",
        });
        gsap.set(logo, { autoAlpha: 0, x: -20 });
        gsap.set(navItems, { autoAlpha: 0, y: -14 });
        gsap.set(menuButton, { autoAlpha: 0, y: -10 });
      };

      let openTimeline: gsap.core.Timeline | undefined;

      if (headerMotionMode === "hold") {
        if (!reducedMotion) hideHeaderElements();
        return;
      }

      if (headerMotionMode === "static") {
        showHeaderElements();
        gsap.set(header, {
          backgroundColor: "#ffffff",
        });
      } else {
        hideHeaderElements();

        openTimeline = gsap.timeline({
          defaults: { ease: EASE_OUT },
          onComplete: showHeaderElements,
          onInterrupt: showHeaderElements,
        });

        openTimeline
          .to(header, { y: 0, duration: 0.75 })
          .to(logo, { autoAlpha: 1, x: 0, duration: 0.55 }, "-=0.45")
          .to(navItems, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.07 }, "-=0.4")
          .to(menuButton, { autoAlpha: 1, y: 0, duration: 0.4 }, "-=0.35");
      }

      return () => {
        openTimeline?.kill();
        showHeaderElements();
      };
    },
    { scope: headerRef, dependencies: [headerMotionMode] },
  );

  useGSAP(
    () => {
      const mobileNav = mobileNavRef.current;
      const mobileNavInner = mobileNavInnerRef.current;
      if (!mobileNav || !mobileNavInner) return;

      const items = mobileNavInner.querySelectorAll(".mobile-nav-item");

      if (reducedMotion) {
        gsap.set(mobileNav, { autoAlpha: menuOpen ? 1 : 0 });
        gsap.set(items, { autoAlpha: 1, y: 0 });
        return;
      }

      if (menuOpen) {
        gsap.set(items, { autoAlpha: 0, y: 16 });
        const tl = gsap.timeline({ defaults: { ease: EASE_OUT } });
        tl.to(mobileNav, { autoAlpha: 1, duration: 0.3 }).to(
          items,
          { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.06 },
          "-=0.1",
        );
        return () => {
          tl.kill();
        };
      }

      const tl = gsap.timeline({ defaults: { ease: EASE_OUT } });
      tl.to(items, { autoAlpha: 0, y: 12, duration: 0.2, stagger: 0.03 }).to(
        mobileNav,
        { autoAlpha: 0, duration: 0.25 },
        "-=0.1",
      );
      return () => {
        tl.kill();
      };
    },
    { scope: headerRef, dependencies: [menuOpen, reducedMotion] },
  );

  return (
    <header
      ref={headerRef}
      data-services-open={catalog ? "true" : "false"}
      data-surface={menuOpen ? "light" : surface}
      className="site-header relative sticky top-0 z-50 bg-white"
      onMouseLeave={() => setCatalog(null)}
      onBlur={(event: FocusEvent<HTMLElement>) => {
        const next = event.relatedTarget;
        if (!(next instanceof Node) || !event.currentTarget.contains(next)) {
          setCatalog(null);
        }
      }}
    >
      <div
        ref={innerRef}
        className="mx-auto flex h-[4.5rem] max-w-(--max-width-container) items-center justify-between gap-4 px-(--spacing-section-x) lg:grid lg:grid-cols-[1fr_auto_1fr]"
      >
        <Link
          ref={logoRef}
          href="/"
          aria-label="Sanct home"
          className="relative flex shrink-0 items-center gap-2.5 rounded-tag transition-opacity duration-150 ease-out hover:opacity-80 focus-visible:opacity-80"
        >
          <span className="relative h-9 w-9 shrink-0">
            <Image
              src="/sanct-mark.png"
              alt=""
              width={606}
              height={606}
              className="h-full w-full"
              priority
            />
          </span>
          <span className="header-logo-word font-bold text-[15px] leading-none tracking-[0.02em] text-near-black">
            SANCT
          </span>
        </Link>

        <nav
          ref={navRef}
          className="hidden items-center justify-center gap-1 lg:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => {
            const catalogFor =
              link.label in catalogByLabel
                ? catalogByLabel[link.label as keyof typeof catalogByLabel]
                : null;
            const catalogId =
              catalogFor === "services"
                ? servicesMenuId
                : catalogFor === "industries"
                  ? industriesMenuId
                  : catalogFor === "company"
                    ? companyMenuId
                    : undefined;
            return (
              <Fragment key={link.href}>
                <NavLink
                  href={link.href}
                  label={link.label}
                  onMouseEnter={() => setCatalog(catalogFor)}
                  onFocus={() => setCatalog(catalogFor)}
                  ariaExpanded={catalogFor ? catalog === catalogFor : undefined}
                  ariaControls={catalogFor ? catalogId : undefined}
                />
                {catalogFor === "services" && (
                  <Catalog
                    id={servicesMenuId}
                    label="Services"
                    open={catalog === "services"}
                    groups={serviceGroups}
                    onNavigate={() => setCatalog(null)}
                  />
                )}
                {catalogFor === "industries" && (
                  <Catalog
                    id={industriesMenuId}
                    label="Industries"
                    open={catalog === "industries"}
                    groups={industryGroups}
                    onNavigate={() => setCatalog(null)}
                  />
                )}
                {catalogFor === "company" && (
                  <Catalog
                    id={companyMenuId}
                    label="Company"
                    open={catalog === "company"}
                    groups={companyGroups}
                    onNavigate={() => setCatalog(null)}
                  />
                )}
              </Fragment>
            );
          })}
        </nav>

        <div className="flex items-center justify-end">
          <div
            className="hidden lg:block"
            onMouseEnter={() => setCatalog(null)}
            onFocus={() => setCatalog(null)}
          >
            <ButtonLink
              href="/#contact"
              variant="primary"
              className="header-nav-item header-contact"
            >
              Contact Us
            </ButtonLink>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="header-menu-button inline-flex h-10 w-10 items-center justify-center rounded-input text-near-black transition-colors duration-150 ease-out hover:bg-near-black/5 focus-visible:bg-near-black/5 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <nav
        ref={mobileNavRef}
        id={menuId}
        className="invisible fixed inset-x-0 top-18 bottom-0 z-40 overflow-y-auto overscroll-contain border-t border-border-light bg-white opacity-0 lg:hidden"
        aria-label="Mobile navigation"
        inert={menuOpen ? undefined : true}
      >
        <div
          ref={mobileNavInnerRef}
          className="mx-auto flex min-h-full max-w-(--max-width-container) flex-col gap-2 px-(--spacing-section-x) py-8"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              large
              className="mobile-nav-item"
              onNavigate={() => setMenuOpen(false)}
            />
          ))}
          <button
            type="button"
            data-cal-link="deo-talip-iwfmht/secret"
            data-cal-namespace="secret"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            className="mobile-nav-item mt-auto inline-flex w-full cursor-pointer items-center justify-center rounded-pill bg-sanct-indigo px-7 py-4 text-base font-semibold uppercase tracking-[0.06em] text-white transition-colors duration-150 ease-out hover:bg-indigo-mid focus-visible:bg-indigo-mid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lilac"
            onClick={() => setMenuOpen(false)}
          >
            Let&apos;s Talk
          </button>
        </div>
      </nav>
    </header>
  );
}
