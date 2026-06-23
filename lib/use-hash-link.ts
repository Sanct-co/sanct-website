"use client";

import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import {
  getHashFromHref,
  getPathFromHashHref,
  scrollToHash,
} from "@/lib/scroll-to-hash";

export function useHashLink() {
  const pathname = usePathname();
  const lenis = useLenis();

  const onHashLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const hash = getHashFromHref(href);
    if (!hash) return;

    const targetPath = getPathFromHashHref(href);
    if (pathname !== targetPath) return;

    if (scrollToHash(hash, lenis)) {
      event.preventDefault();
      window.history.pushState(null, "", href);
    }
  };

  return { onHashLinkClick };
}
