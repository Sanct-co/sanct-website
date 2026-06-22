import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

export function SocialProof() {
  return (
    <Section background="ghost">
      <Reveal>
        <blockquote className="max-w-4xl">
          <p className="font-display text-3xl font-extrabold leading-snug text-near-black md:text-4xl">
            &ldquo;Sanct didn&apos;t just build us software — they understood
            how our stores actually run. The dashboard feels like it was designed
            by someone who&apos;s worked a shift on the floor.&rdquo;
          </p>
          <footer className="mt-8">
            <cite className="not-italic">
              <span className="block text-base font-bold text-near-black">
                Elena Morales
              </span>
              <span className="block text-base text-on-light-muted">
                Operations Director, MetroMart PH
              </span>
            </cite>
          </footer>
        </blockquote>
      </Reveal>
    </Section>
  );
}
