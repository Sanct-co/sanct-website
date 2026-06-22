import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SocialLinks } from "@/components/ui/social-links";
import { createMetadata } from "@/lib/metadata";
import { contact } from "@/lib/site";

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
            <p className="text-sm font-bold uppercase tracking-[0.1em] text-sanct-indigo">
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
        <div className="grid gap-14 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <ContactForm />
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-2">
            <div className="rounded-card border border-border-light bg-white p-9">
              <h2 className="font-display text-2xl font-bold">Direct contact</h2>
              <ul className="mt-8 space-y-6 text-base">
                <li>
                  <span className="block text-sm font-bold uppercase tracking-[0.1em] text-lilac">
                    Phone
                  </span>
                  <a
                    href={contact.phoneHref}
                    className="mt-2 block text-lg font-bold text-sanct-indigo transition-colors duration-150 ease-out hover:text-indigo-mid"
                  >
                    {contact.phone}
                  </a>
                </li>
                <li>
                  <span className="block text-sm font-bold uppercase tracking-[0.1em] text-lilac">
                    Social
                  </span>
                  <SocialLinks variant="contact" />
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
