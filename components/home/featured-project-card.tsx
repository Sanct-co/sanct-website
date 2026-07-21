"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Tag } from "@/components/ui/tag";
import { EASE_OUT, gsap, useGSAP } from "@/lib/gsap";
import { type Project } from "@/lib/projects";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type FeaturedProjectCardProps = {
  project: Project;
  index: number;
};

export function FeaturedProjectCard({
  project,
  index,
}: FeaturedProjectCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const order = String(index + 1).padStart(2, "0");

  useGSAP(
    () => {
      const container = containerRef.current;
      const image = imageRef.current;
      if (!container || !image || reducedMotion) return;

      gsap.from(container, {
        autoAlpha: 0,
        y: 40,
        duration: 0.85,
        ease: EASE_OUT,
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(image, {
        scale: 1.08,
        duration: 1.1,
        ease: EASE_OUT,
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          once: true,
        },
      });

      gsap.to(image, {
        y: -28,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    },
    { scope: containerRef, dependencies: [reducedMotion] },
  );

  return (
    <div
      ref={containerRef}
      className="group overflow-hidden rounded-card border border-border-dark bg-white/[0.02] transition-colors duration-300 ease-out hover:border-lilac/30"
    >
      <Link
        href={`/work/${project.slug}`}
        className="relative block aspect-[16/9] overflow-hidden focus-visible:outline-none"
      >
        <div ref={imageRef} className="absolute inset-0">
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={`${project.title} preview`}
              fill
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
          ) : (
            <div
              className={`h-full w-full bg-gradient-to-br ${project.coverGradient}`}
              role="img"
              aria-label={`${project.title} cover`}
            />
          )}
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-t from-near-black/70 via-transparent to-transparent"
          aria-hidden="true"
        />
          {/* <span className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-pill border border-white/15 bg-near-black/50 px-3 py-1.5 font-terminal text-[11px] uppercase tracking-[0.08em] text-white/80 backdrop-blur-sm">
            {order} — {project.category}
          </span> */}
      </Link>

      <div className="flex flex-col gap-8 p-8 md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="md:max-w-sm">
            <Tag>Featured Work</Tag>
            <h3 className="mt-3 font-display text-2xl font-bold leading-tight md:text-3xl">
              {project.title}
            </h3>
            {project.tagline && (
              <p className="mt-2 font-display text-lg font-semibold text-lilac">
                {project.tagline}
              </p>
            )}
          </div>
          <p className="text-lg leading-relaxed text-text-secondary md:max-w-md">
            {project.description}
          </p>
        </div>

        <div
          className="h-px bg-border-dark"
          aria-hidden="true"
        />

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div>
            <p className="font-terminal text-[11px] uppercase tracking-[0.08em] text-white/40">
              Client
            </p>
            <p className="mt-1.5 text-sm font-medium text-white/85">
              {project.client}
            </p>
          </div>
          <div>
            <p className="font-terminal text-[11px] uppercase tracking-[0.08em] text-white/40">
              Industry
            </p>
            <p className="mt-1.5 text-sm font-medium text-white/85">
              {project.industry}
            </p>
          </div>
          <div>
            <p className="font-terminal text-[11px] uppercase tracking-[0.08em] text-white/40">
              Category
            </p>
            <p className="mt-1.5 text-sm font-medium text-white/85">
              {project.category}
            </p>
          </div>
          {/* <Link
            href={`/work/${project.slug}`}
            className="group/link col-span-2 flex items-end gap-2 text-sm font-medium uppercase tracking-[0.08em] text-white/70 transition-colors duration-150 ease-out hover:text-lilac md:col-span-1 md:justify-end"
          >
            View case study
            <span
              aria-hidden="true"
              className="transition-transform duration-150 ease-out group-hover/link:translate-x-1"
            >
              →
            </span>
          </Link> */}
        </div>
      </div>
    </div>
  );
}
