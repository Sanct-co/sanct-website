import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/metadata";
import { contact } from "@/lib/site";

const privacyEmail = "deodeloriatalip@gmail.com";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "How Sanct Software Development Services handles personal information collected on sanct.ph.",
  path: "/privacy",
});

const headingClass = "font-display text-2xl font-bold text-near-black";
const bodyClass = "mt-4 space-y-4 text-base leading-relaxed text-on-light-muted";
const linkClass =
  "font-bold text-sanct-indigo underline decoration-sanct-indigo/30 underline-offset-4 transition-colors duration-150 ease-out hover:decoration-sanct-indigo focus-visible:decoration-sanct-indigo";

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How Sanct Software Development Services handles personal information on sanct.ph."
      />

      <Section background="white">
        <div className="mx-auto max-w-3xl space-y-12">
          <section>
            <h2 className={headingClass}>Last updated</h2>
            <div className={bodyClass}>
              <p>11 October 2026</p>
            </div>
          </section>

          <section>
            <h2 className={headingClass}>Who we are</h2>
            <div className={bodyClass}>
              <p>
                Sanct Software Development Services (&quot;Sanct,&quot; &quot;we,&quot;
                &quot;us&quot;) operates sanct.ph from Oroquieta City, Misamis
                Occidental, Philippines. This policy explains what personal
                information this website collects, why we collect it, and the
                choices you have.
              </p>
            </div>
          </section>

          <section>
            <h2 className={headingClass}>Information we collect</h2>
            <div className={bodyClass}>
              <p>
                When you send an inquiry from the homepage or the contact page,
                we collect:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>your name</li>
                <li>your email address</li>
                <li>your phone number, if you provide one</li>
                <li>the services you are interested in</li>
                <li>your budget, if you provide one</li>
                <li>the message you write</li>
              </ul>
              <p>
                If you book a call through the scheduling widget on this site,
                Cal.com receives the details you enter to arrange that call,
                such as your name, email address, and the time you choose.
                Cal.com may also place cookies in your browser.
              </p>
              <p>
                When you visit the site, our hosting provider may record
                technical information needed to deliver the pages, such as your
                IP address, browser type, and the pages you request. We do not
                use analytics or advertising cookies on this site.
              </p>
            </div>
          </section>

          <section>
            <h2 className={headingClass}>How we use it</h2>
            <div className={bodyClass}>
              <p>We use this information to:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>read and reply to your inquiry</li>
                <li>send you a short confirmation that we received your message</li>
                <li>schedule and hold a call you requested</li>
                <li>operate, secure, and troubleshoot the website</li>
              </ul>
              <p>We do not use it for advertising.</p>
            </div>
          </section>

          <section>
            <h2 className={headingClass}>Who we share it with</h2>
            <div className={bodyClass}>
              <p>We do not sell personal information.</p>
              <p>
                Inquiry details are sent through Resend, which delivers email
                from this site to our team and sends the confirmation to you.
                Booking details go to Cal.com, which provides the scheduling
                widget. These providers process information so we can reply to
                you and arrange calls, and they may store that information
                outside the Philippines.
              </p>
              <p>
                We may also disclose information if the law requires it, or to
                protect our rights, our clients, or other people.
              </p>
            </div>
          </section>

          <section>
            <h2 className={headingClass}>How long we keep it</h2>
            <div className={bodyClass}>
              <p>
                We keep inquiry and booking records for as long as we need them
                to respond to you and for ordinary business records, then we
                delete them. Hosting logs are kept for the period our host
                retains them.
              </p>
            </div>
          </section>

          <section>
            <h2 className={headingClass}>Your rights</h2>
            <div className={bodyClass}>
              <p>
                Under the Data Privacy Act of 2012 (Republic Act No. 10173), you
                may ask us to:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>tell you what personal information we hold about you</li>
                <li>correct information that is inaccurate</li>
                <li>stop particular processing</li>
                <li>erase or block information we no longer need to keep</li>
              </ul>
              <p>
                You may also file a complaint with the{" "}
                <a
                  href="https://privacy.gov.ph/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  National Privacy Commission
                </a>.
              </p>
              <p>
                To use these rights, email{" "}
                <a href={`mailto:${privacyEmail}`} className={linkClass}>
                  {privacyEmail}
                </a>. We may need to confirm it is you before we act on a request.
              </p>
            </div>
          </section>

          <section>
            <h2 className={headingClass}>Children</h2>
            <div className={bodyClass}>
              <p>
                This site is for businesses and adults. We do not knowingly
                collect personal information from children.
              </p>
            </div>
          </section>

          <section>
            <h2 className={headingClass}>Changes to this policy</h2>
            <div className={bodyClass}>
              <p>
                We may update this policy when our practices change. The date in
                the Last updated section is the date of the latest version.
              </p>
            </div>
          </section>

          <section>
            <h2 className={headingClass}>How to reach us</h2>
            <div className={bodyClass}>
              <p>Privacy requests and questions can go to:</p>
              <address className="not-italic">
                <p>Sanct Software Development Services</p>
                <p>
                  <a
                    href={contact.addressHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {contact.address}
                  </a>
                </p>
                <p>
                  <a href={contact.phoneHref} className={linkClass}>
                    {contact.phone}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${privacyEmail}`} className={linkClass}>
                    {privacyEmail}
                  </a>
                </p>
              </address>
            </div>
          </section>
        </div>
      </Section>
    </>
  );
}
