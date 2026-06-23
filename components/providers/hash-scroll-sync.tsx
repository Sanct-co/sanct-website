"use client";

import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { scrollToHash } from "@/lib/scroll-to-hash";

export function HashScrollSync() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let attempts = 0;

    const tryScroll = () => {
      if (scrollToHash(hash, lenis)) return;

      attempts += 1;
      if (attempts < 10) {
        timeoutId = setTimeout(tryScroll, 100);
      }
    };

    requestAnimationFrame(tryScroll);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [pathname, lenis]);

  return null;
}
