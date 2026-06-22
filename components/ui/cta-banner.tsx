import { Reveal } from "./reveal";
import { TextSplit } from "./text-split";

type CtaBannerProps = {
  headline: string;
  subtext?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function CtaBanner({
  headline,
  subtext,
  ctaLabel = "Message Us",
  ctaHref = "/contact",
}: CtaBannerProps) {
  return (
    <section className="relative overflow-hidden bg-near-black py-(--spacing-section-y) text-white">
      <div
        className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-[140%] -translate-x-1/2 rounded-[50%] bg-sanct-indigo"
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
        {/* <ButtonLink href={ctaHref} variant="cta" className="mt-10">
          {ctaLabel}
        </ButtonLink> */}
      </div>
    </section>
  );
}
