import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";

export function SocialProof() {
  return (
    <Section background="ghost">
      <Reveal>
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
          <Tag variant="indigo">What Clients Say</Tag>
          <h2 className="mt-3 font-display text-4xl font-extrabold leading-tight tracking-[-0.02em] md:text-5xl">
            Trusted by teams who know their business inside out.
          </h2>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <blockquote className="mx-auto max-w-5xl text-center">
          <p className="font-display text-4xl font-extrabold leading-[1.1] tracking-[-0.02em] text-near-black md:text-5xl lg:text-6xl">
            &ldquo;Sanct didn&apos;t just build us software — they understood
            how our stores actually run. The dashboard feels like it was designed
            by someone who&apos;s worked a shift on the floor.&rdquo;
          </p>
          <footer className="mt-10 md:mt-12">
            <cite className="not-italic">
              <span className="block text-lg font-bold text-near-black md:text-xl">
                Elena Morales
              </span>
              <span className="mt-1 block text-base text-on-light-muted md:text-lg">
                Operations Director, MetroMart PH
              </span>
            </cite>
          </footer>
        </blockquote>
      </Reveal>
    </Section>
  );
}
