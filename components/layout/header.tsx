"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type MouseEventHandler } from "react";
import { ButtonLink } from "@/components/ui/button";
import { useIntro } from "@/components/providers/intro-provider";
import { EASE_OUT, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { getHashFromHref } from "@/lib/scroll-to-hash";
import { navLinks } from "@/lib/site";
import { useHashLink } from "@/lib/use-hash-link";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useLenis } from "lenis/react";

const SCROLL_THRESHOLD = 40;

function NavLink({
  href,
  label,
  className = "",
  onNavigate,
  large = false,
}: {
  href: string;
  label: string;
  className?: string;
  onNavigate?: () => void;
  large?: boolean;
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
      className={`header-nav-item font-terminal rounded-tag uppercase transition-colors duration-150 ease-out hover:text-sanct-indigo focus-visible:text-sanct-indigo ${
        large
          ? "py-3 text-3xl tracking-[0.02em]"
          : "px-3 py-2 text-[13px] tracking-[0.04em]"
      } ${isActive ? "text-sanct-indigo" : "text-on-light-muted"} ${className}`}
    >
      {label}
    </Link>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
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
  const borderRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const mobileNavInnerRef = useRef<HTMLDivElement>(null);
  const isScrolledRef = useRef(false);

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
      const border = borderRef.current;

      if (!header || !logo || !nav || !menuButton || !border) return;

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
          boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
        });
        gsap.set(logo, { autoAlpha: 0, x: -20 });
        gsap.set(navItems, { autoAlpha: 0, y: -14 });
        gsap.set(menuButton, { autoAlpha: 0, y: -10 });
      };

      const setScrolledState = (scrolled: boolean) => {
        if (isScrolledRef.current === scrolled) return;
        isScrolledRef.current = scrolled;

        gsap.to(header, {
          boxShadow: scrolled
            ? "0 8px 24px rgba(44, 31, 168, 0.06)"
            : "0 0 0 rgba(0, 0, 0, 0)",
          duration: 0.35,
          ease: EASE_OUT,
          overwrite: "auto",
        });

        gsap.to(border, {
          scaleX: scrolled ? 1 : 0,
          opacity: scrolled ? 1 : 0,
          duration: 0.35,
          ease: EASE_OUT,
          overwrite: "auto",
        });
      };

      gsap.set(border, { scaleX: 0, opacity: 0, transformOrigin: "left center" });

      const scrollTrigger = ScrollTrigger.create({
        start: SCROLL_THRESHOLD,
        end: "max",
        onEnter: () => setScrolledState(true),
        onLeaveBack: () => setScrolledState(false),
      });

      let openTimeline: gsap.core.Timeline | undefined;

      if (headerMotionMode === "hold") {
        if (!reducedMotion) hideHeaderElements();
        return () => {
          scrollTrigger.kill();
        };
      }

      if (headerMotionMode === "static") {
        showHeaderElements();
        gsap.set(header, {
          backgroundColor: "#ffffff",
          boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
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
        scrollTrigger.kill();
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
      className="relative sticky top-0 z-50 bg-white"
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
          <span className="relative h-9 w-9 shrink-0 overflow-hidden">
            <Image
              src="/sanct-logo.png"
              alt=""
              width={877}
              height={887}
              className="h-[175%] w-full max-w-none object-cover object-top"
              priority
            />
          </span>
          <span className="font-bold text-[15px] leading-none tracking-[0.02em] text-near-black">
            SANCT
          </span>
        </Link>

        <nav
          ref={navRef}
          className="hidden items-center justify-center gap-1 lg:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        <div className="flex items-center justify-end">
          <div className="hidden lg:block">
            <ButtonLink
              href="/#contact"
              variant="primary"
              className="header-nav-item"
            >
              Contact Us
            </ButtonLink>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-input text-near-black transition-colors duration-150 ease-out hover:bg-near-black/5 focus-visible:bg-near-black/5 lg:hidden"
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

      <div
        ref={borderRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-border-light"
        aria-hidden="true"
      />

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
