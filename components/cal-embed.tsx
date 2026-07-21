"use client";

import { useEffect } from "react";

type CalApiFn = {
  (...args: unknown[]): void;
  q: unknown[];
};

declare global {
  interface Window {
    Cal?: {
      (...args: unknown[]): void;
      loaded?: boolean;
      ns: Record<string, CalApiFn>;
      q?: unknown[];
      config?: Record<string, unknown>;
    };
  }
}

export function CalEmbed() {
  useEffect(() => {
    (function (C: typeof window, A: string, L: string) {
      const p = function (a: CalApiFn, ar: unknown) {
        a.q.push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        (function (...args: unknown[]) {
          const cal = C.Cal!;
          const ar = args;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function (...apiArgs: unknown[]) {
              p(api, apiArgs);
            } as CalApiFn;
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal as unknown as CalApiFn, ["initNamespace", namespace]);
            } else p(cal as unknown as CalApiFn, ar);
            return;
          }
          p(cal as unknown as CalApiFn, ar);
        } as unknown as typeof C.Cal);
    })(window, "https://app.cal.com/embed/embed.js", "init");

    window.Cal!("init", "secret", { origin: "https://app.cal.com" });
    window.Cal!.config = window.Cal!.config || {};
    window.Cal!.config.forwardQueryParams = true;

    window.Cal!.ns.secret("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, []);

  return null;
}
