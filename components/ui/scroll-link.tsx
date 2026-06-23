"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { getHashFromHref } from "@/lib/scroll-to-hash";
import { useHashLink } from "@/lib/use-hash-link";

type ScrollLinkProps = ComponentProps<typeof Link>;

export function ScrollLink({ href, onClick, ...props }: ScrollLinkProps) {
  const { onHashLinkClick } = useHashLink();

  const handleClick: ScrollLinkProps["onClick"] = (event) => {
    if (typeof href === "string" && getHashFromHref(href)) {
      onHashLinkClick(event, href);
    }
    onClick?.(event);
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
