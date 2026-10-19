"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Tag } from "@/components/ui/tag";
import { EASE_OUT, gsap, useGSAP } from "@/lib/gsap";
import { type Project } from "@/lib/projects";
import { useMediaQuery } from "@/lib/use-media-query";
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
  const allowParallax = useMediaQuery("(min-width: 1024px)");
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

      if (allowParallax) {
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
      }
    },
    {
      scope: containerRef,
      dependencies: [reducedMotion, allowParallax],
      // Restore visibility before rebuilding animations after a media query change.
      revertOnUpdate: true,
    },
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

      <div className="flex flex-col gap-6 p-4 sm:gap-8 sm:p-6 md:p-10">
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
          <p className="text-base leading-relaxed text-text-secondary sm:text-lg md:max-w-md">
            {project.description}
          </p>
        </div>

        <div
          className="h-px bg-border-dark"
          aria-hidden="true"
        />

        <dl className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-4 sm:grid-cols-2 sm:gap-10">
          <div className="min-w-0">
            <dt className="font-terminal text-[11px] uppercase tracking-[0.08em] text-white/40">
              Client
            </dt>
            <dd className="mt-1.5 text-sm font-medium text-white/85">
              {project.client}
            </dd>
          </div>
          <div>
            <dt className="font-terminal text-[11px] uppercase tracking-[0.08em] text-white/40">
              Industry
            </dt>
            <dd className="mt-1.5 text-sm font-medium text-white/85">
              {project.industry}
            </dd>
          </div>
        </dl>

        <dl className="grid grid-cols-3 gap-2 sm:gap-6 lg:gap-8">
          {project.impactMetrics.map((metric) => (
            <div
              key={metric.label}
              className="flex min-w-0 flex-col border-l-2 border-lilac/40 pl-2 sm:pl-4 lg:pl-5"
            >
              <dt className="order-2 mt-2 text-[11px] font-semibold leading-snug text-white/90 sm:mt-3 sm:text-sm lg:text-base">
                {metric.label}
              </dt>
              <dd className="contents">
                <span className="order-1 font-display text-[clamp(1.375rem,6vw,3rem)] font-extrabold leading-none tracking-tight text-lilac tabular-nums lg:text-5xl">
                  {metric.value}
                </span>
                <span className="order-3 mt-2 max-w-sm text-[10px] leading-relaxed text-text-secondary sm:text-xs lg:text-sm">
                  {metric.description}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
