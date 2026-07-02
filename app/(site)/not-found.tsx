import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center bg-near-black px-(--spacing-section-x) py-28 text-center text-white">
      <p className="font-terminal text-[12px] uppercase tracking-[0.08em] text-lilac">
        404
      </p>
      <h1 className="mt-5 font-display text-5xl font-extrabold md:text-6xl">
        Page not found.
      </h1>
      <p className="mt-5 max-w-lg text-lg text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-12 flex flex-col gap-5 sm:flex-row">
        <ButtonLink href="/" variant="cta">
          Back to Home
        </ButtonLink>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-pill border-[1.5px] border-white/30 px-7 py-3 text-base font-bold text-white/70 transition-colors duration-150 ease-out hover:border-white/50 hover:text-white focus-visible:border-white/50 focus-visible:text-white"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}
