import { Reveal } from "./reveal";
import { TextSplit } from "./text-split";

type CtaBannerProps = {
  headline: string;
  subtext?: string;
  ctaLabel?: string;
};

export function CtaBanner({
  headline,
  subtext,
  ctaLabel = "Book a Call",
}: CtaBannerProps) {
  return (
    <section className="relative overflow-hidden bg-near-black py-(--spacing-section-y) text-white">
      <div
        className="pointer-events-none absolute -bottom-16 left-1/2 h-40 w-[200%] -translate-x-1/2 rounded-[50%] bg-sanct-indigo sm:-bottom-24 sm:h-56 sm:w-[170%] md:-bottom-32 md:h-72 md:w-[140%]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-(--max-width-container) px-(--spacing-section-x) text-center">
        <TextSplit
          text={headline}
          as="h2"
          className="font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] md:text-6xl"
          stagger={0.055}
          scrollStart="top 85%"
        />
        {subtext && (
          <Reveal delay={0.3}>
            <p className="mx-auto mt-5 max-w-2xl text-xl text-text-secondary">
              {subtext}
            </p>
          </Reveal>
        )}
        <Reveal delay={0.4}>
          <button
            type="button"
            data-cal-link="deo-talip-iwfmht/secret"
            data-cal-namespace="secret"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            className="mt-10 inline-flex cursor-pointer items-center justify-center gap-2 rounded-pill bg-sanct-indigo px-7 py-3 text-sm font-semibold uppercase tracking-[0.06em] text-white focus-visible:bg-indigo-mid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lilac"
          >
            {ctaLabel}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
