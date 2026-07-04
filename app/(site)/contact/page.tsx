import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Start a conversation with Sanct about your next project, partnership, or general inquiry.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="bg-white py-(--spacing-section-y) text-near-black">
        <div className="mx-auto max-w-(--max-width-container) px-(--spacing-section-x)">
          <Reveal>
            <p className="font-terminal text-[12px] uppercase tracking-[0.08em] text-sanct-indigo">
              Contact
            </p>
            <h1 className="mt-3 font-display text-5xl font-extrabold leading-[1.05] tracking-[-0.03em] md:text-6xl">
              Let&apos;s{" "}
              <span className="italic text-sanct-indigo">talk.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-xl text-on-light-muted">
              Whether you have a project in mind or just want to explore
              possibilities. We&apos;re here.
            </p>
          </Reveal>
        </div>
      </section>

      <Section background="ghost">
        <Reveal>
          <ContactForm />
        </Reveal>
      </Section>
    </>
  );
}
