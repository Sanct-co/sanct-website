import type Lenis from "lenis";

export const HEADER_SCROLL_OFFSET = -72;

export function getHashFromHref(href: string): string | null {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return null;
  return href.slice(hashIndex + 1) || null;
}

export function getPathFromHashHref(href: string): string {
  const hashIndex = href.indexOf("#");
  const path = hashIndex === -1 ? href : href.slice(0, hashIndex);
  return path || "/";
}

export function scrollToHash(hash: string, lenis?: Lenis | null): boolean {
  const element = document.getElementById(hash);
  if (!element) return false;

  if (lenis) {
    // The mobile menu stops Lenis. Starting it here lets the scroll finish
    // after the menu closes, instead of being reset on the next start().
    if (lenis.isStopped) lenis.start();
    lenis.scrollTo(element, { offset: HEADER_SCROLL_OFFSET, force: true });
  } else {
    const top =
      element.getBoundingClientRect().top +
      window.scrollY +
      HEADER_SCROLL_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return true;
}
