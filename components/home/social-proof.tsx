"use client";

import { useEffect, useRef, useState } from "react";

import { Section } from "@/components/ui/section";
import "./hallmark/proof.css";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const TESTIMONIALS = [{
  quote:
    "Working with the team was a smooth experience from start to finish. They understood what Kleros Philippines stands for and translated our vision into a website that feels warm, professional, and easy to navigate. We’re very happy with how the final website represents our organization and makes it easier for people to learn about our programs and connect with us.",
  name: "Myra Sanchez",
  role: "Founder & CEO, Kleros Philippines",
},{
  quote:
    "Sanct didn’t just build us software, they understood how our stores actually run. The dashboard feels like it was designed by someone who’s worked a shift on the floor.",
  name: "Elena Gonzales",
  role: "Operations Manager, CrowdHomes",
}, ];

export function SocialProof() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const reducedMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  const autoPlay = isInView && !isPaused && !isHovered && !isFocused && !reducedMotion;
  const testimonial = TESTIMONIALS[activeIndex];

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoPlay) return;

    // Give longer quotes enough reading time; restart after manual navigation.
    const readingTime = Math.max(8000, testimonial.quote.split(/\s+/).length * 250 + 2000);
    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % TESTIMONIALS.length);
    }, readingTime);

    return () => window.clearTimeout(timer);
  }, [activeIndex, autoPlay, testimonial.quote]);

  function changeTestimonial(direction: number) {
    setActiveIndex((current) =>
      (current + direction + TESTIMONIALS.length) % TESTIMONIALS.length,
    );
  }

  return (
    <Section id="clients" background="dark" className="sanct-testimonials">
      <div
        ref={sectionRef}
        className="sanct-testimonials__layout"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocusCapture={() => setIsFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false);
        }}
      >
        <div className="sanct-testimonials__intro">
          <h2>Trusted by teams who know their business inside out.</h2>
          <div className="sanct-testimonials__navigation" aria-label="Testimonial navigation">
            {TESTIMONIALS.map((item, i) => (
              <button
                key={item.name}
                type="button"
                aria-label={`Show testimonial from ${item.name}`}
                aria-pressed={i === activeIndex}
                onClick={() => setActiveIndex(i)}
                className="sanct-testimonials__person"
              >
                <span>{item.name}</span>
                <span>{item.role.split(", ").slice(1).join(", ")}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="sanct-testimonials__stage">
          <blockquote aria-live={autoPlay ? "off" : "polite"} aria-atomic="true">
            <div key={testimonial.name} className="sanct-testimonials__quote">
              <p>&ldquo;{testimonial.quote}&rdquo;</p>
              <footer>
                <cite>
                  <span>{testimonial.name}</span>
                  <span>{testimonial.role}</span>
                </cite>
              </footer>
            </div>
          </blockquote>
          <div className="sanct-testimonials__controls">
            <span className="sanct-testimonials__count" aria-label={`Testimonial ${activeIndex + 1} of ${TESTIMONIALS.length}`}>
              {String(activeIndex + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
            </span>
            <div className="sanct-testimonials__buttons">
              <button type="button" className="sanct-testimonials__pause" aria-pressed={isPaused} onClick={() => setIsPaused((paused) => !paused)}>
                {isPaused ? "Play" : "Pause"}
              </button>
              <button type="button" aria-label="Previous testimonial" onClick={() => changeTestimonial(-1)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M19 12H5M5 12l6-6M5 12l6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button type="button" aria-label="Next testimonial" onClick={() => changeTestimonial(1)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
