"use client";

import { useState } from "react";

import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";

type Faq = {
  question: string;
  answer: string;
};

const FAQS: Faq[] = [
  {
    question: "How long does a typical project take?",
    answer:
      "Most projects run 6-12 weeks from kickoff to launch, depending on scope. You'll get a firm timeline during the planning stage, before any code ships.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Pricing may differ per project, not hourly. We scope the work upfront so you know the total cost before we start building the solution.",
  },
  {
    question: "Do you work with businesses outside the Philippines?",
    answer:
      "Yes. We're based in the Philippines and serve clients across Southeast Asia, with remote-friendly workflows for any timezone.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We stay on to watch, fix, and improve. Support is part of the build, not a separate contract you have to negotiate later.",
  },
  {
    question: "Can you work with our existing team or codebase?",
    answer:
      "Yes. We regularly join in-flight projects and integrate with existing teams, tools, and codebases rather than starting from scratch.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" background="white">
      <Reveal>
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
          <Tag variant="indigo">Common Questions</Tag>
          <h2 className="mt-3 font-display text-4xl font-extrabold leading-tight tracking-[-0.02em] md:text-5xl">
            Frequently asked questions.
          </h2>
        </div>
      </Reveal>

      <div className="mx-auto max-w-3xl divide-y divide-near-black/10 border-t border-b border-near-black/10">
        {FAQS.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={faq.question}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="font-display text-lg font-bold text-near-black md:text-xl">
                  {faq.question}
                </span>
                <span
                  className={`shrink-0 text-2xl leading-none text-sanct-indigo transition-transform duration-200 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              <div
                className={`grid transition-all duration-200 ease-out ${
                  isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-2xl text-base leading-relaxed text-on-light-muted">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
