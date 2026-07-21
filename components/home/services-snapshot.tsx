import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { TextSplit } from "@/components/ui/text-split";
import { services } from "@/lib/services";

function ServicesVisual() {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card bg-gradient-to-br from-indigo-mid via-sanct-indigo to-near-black shadow-2xl shadow-sanct-indigo/30">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-lilac/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/10 blur-3xl"
        aria-hidden="true"
      />

      <span
        aria-hidden="true"
        className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm"
      >
        →
      </span>

      <div className="absolute inset-x-6 bottom-6 top-24 flex flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-near-black/60 shadow-xl backdrop-blur-md sm:inset-x-10 sm:top-28">
        <div className="flex shrink-0 items-center gap-2 border-b border-white/[0.06] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-terminal text-[11px] uppercase tracking-[0.08em] text-white/40">
            sanct.ph — services
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-2.5 p-4">
          {services.map((service, i) => (
            <div
              key={service.id}
              className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3.5 py-3"
            >
              <span className="font-display text-sm font-extrabold text-lilac/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="truncate text-sm font-medium text-white/85">
                {service.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ServicesSnapshot() {
  return (
    <Section id="services" background="dark">
      <Reveal>
        <p className="font-terminal text-[12px] uppercase tracking-[0.08em] text-lilac">
          What We Do
        </p>
      </Reveal>
      <TextSplit
        text="Four ways we help teams move faster."
        as="h2"
        className="mt-3 max-w-3xl font-display text-4xl font-extrabold md:text-5xl"
        stagger={0.05}
        scrollStart="top 85%"
      />

      <div className="mt-14 grid gap-16 lg:mt-16 lg:grid-cols-2 lg:items-start lg:gap-x-16">
        <div className="border-t border-white/10">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.08}>
              <article className="border-b border-white/10 py-8 lg:py-10">
                <h3 className="font-display text-2xl font-bold leading-snug md:text-3xl">
                  {service.name}
                </h3>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
                  {service.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-pill border border-white/15 px-4 py-2 text-sm text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal direction="none" className="hidden lg:block">
          <div className="sticky top-28">
            <ServicesVisual />
          </div>
        </Reveal>
      </div>

      {/* <Reveal delay={0.3}>
        <ButtonLink href="/services" variant="ghost" className="mt-12">
          Explore Services
        </ButtonLink>
      </Reveal> */}
    </Section>
  );
}
