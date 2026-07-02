import { contact } from "@/lib/site";

export default function MaintenancePage() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-near-black px-6 text-center text-white">
      <p className="font-terminal text-[12px] uppercase tracking-[0.08em] text-lilac">
        Sanct
      </p>
      <h1 className="mt-5 font-display text-4xl font-extrabold md:text-6xl">
        We&apos;re building something new.
      </h1>
      <p className="mt-5 max-w-lg text-lg text-text-secondary">
        Our site is offline for scheduled maintenance. We&apos;ll be back
        shortly — thanks for your patience.
      </p>
      {/* <a
        href={contact.phoneHref}
        className="mt-10 text-base font-bold text-white/70 transition-colors duration-150 ease-out hover:text-white"
      >
        {contact.phone}
      </a> */}
    </section>
  );
}
