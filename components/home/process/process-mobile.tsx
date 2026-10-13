"use client";

import { useEffect, useRef, useState, type FocusEvent, type PointerEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ConnectionPath } from "./connection-path";
import { DataPacket } from "./data-packet";
import { connectionState, diagramTransition } from "./geometry";
import { IsometricPlatform } from "./isometric-platform";
import { processSteps, type StepId } from "./steps";

type ProcessMobileProps = {
  activeNode: StepId | null;
  reducedMotion: boolean;
  enter: (id: StepId) => void;
  leave: (id: StepId, next: EventTarget | null) => void;
  toggle: (id: StepId) => void;
  focusNode: (id: StepId) => void;
  blurNode: (id: StepId, next: EventTarget | null) => void;
};

const iconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function MobileIcon({ id }: { id: StepId }) {
  if (id === "discover") {
    return (
      <g {...iconProps}>
        <circle cx="-1.5" cy="-1.5" r="5.6" />
        <path d="M2.6 2.6 6.6 6.6" />
      </g>
    );
  }
  if (id === "plan") {
    return (
      <g {...iconProps}>
        <rect x="-7" y="-8.5" width="14" height="17" rx="1.4" />
        <path d="M-4 -3.4h8M-4 .2h8M-4 3.8h4.5" />
      </g>
    );
  }
  if (id === "build") {
    return (
      <g {...iconProps}>
        <rect x="-8.2" y="-8.2" width="9.2" height="9.2" />
        <rect x="-1" y="-1" width="9.2" height="9.2" />
      </g>
    );
  }
  return (
    <g {...iconProps}>
      <path d="M-6.2 6.4h12.4" />
      <path d="M0 6.4V-5.2" />
      <path d="M-3.6 -2.2 0 -6.2 3.6 -2.2" />
    </g>
  );
}

export function ProcessMobile({
  activeNode,
  reducedMotion,
  enter,
  leave,
  toggle,
  focusNode,
  blurNode,
}: ProcessMobileProps) {
  const transition = diagramTransition(reducedMotion, 0.28);
  const touchRef = useRef({ x: 0, y: 0, moved: false });
  const listRef = useRef<HTMLOListElement>(null);
  const [reached, setReached] = useState(-1);

  useEffect(() => {
    const list = listRef.current;
    if (!list || reducedMotion) return;

    const items = [...list.querySelectorAll<HTMLElement>("[data-process-step]")];
    const observer = new IntersectionObserver(
      (entries) => {
        const indexes = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => items.indexOf(entry.target as HTMLElement))
          .filter((index) => index >= 0);
        if (indexes.length === 0) return;
        const next = Math.max(...indexes);
        setReached((current) => Math.max(current, next));
      },
      { rootMargin: "-32% 0px -40% 0px", threshold: [0, 0.2, 0.6] },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div className="mt-10">
      <p className="font-terminal text-[11px] uppercase tracking-[0.16em] text-text-muted">
        Tap a step
      </p>
      <ol ref={listRef} className="mt-6 [overflow-anchor:none]">
        {processSteps.map((step, index) => {
          const active = activeNode === step.id;
          const played = index <= reached;
          const dimmed = activeNode !== null && !active && !played;
          const next = processSteps[index + 1];
          const pathState = next
            ? played || active
              ? "hot"
              : connectionState(activeNode, step.id, next.id)
            : "idle";

          return (
            <li key={step.id} data-process-step="">
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{
                  ...diagramTransition(reducedMotion, 0.6),
                  delay: reducedMotion ? 0 : index * 0.05,
                }}
              >
                <motion.div
                  initial={false}
                  animate={{ opacity: dimmed ? 0.3 : 1 }}
                  transition={diagramTransition(reducedMotion, 0.35)}
                >
                <button
                  type="button"
                  data-process-node=""
                  aria-pressed={active}
                  aria-label={`${step.index} ${step.title}. ${step.description}`}
                  className="flex w-full cursor-pointer gap-4 border-0 bg-transparent p-0 text-left text-inherit outline-none"
                  onPointerEnter={(event: PointerEvent<HTMLButtonElement>) => {
                    if (event.pointerType === "touch") return;
                    enter(step.id);
                  }}
                  onPointerLeave={(event: PointerEvent<HTMLButtonElement>) => {
                    if (event.pointerType === "touch") return;
                    leave(step.id, event.relatedTarget);
                  }}
                  onPointerDown={(event: PointerEvent<HTMLButtonElement>) => {
                    if (event.pointerType !== "touch") return;
                    touchRef.current = { x: event.clientX, y: event.clientY, moved: false };
                  }}
                  onPointerMove={(event: PointerEvent<HTMLButtonElement>) => {
                    if (event.pointerType !== "touch" || touchRef.current.moved) return;
                    const distance = Math.hypot(
                      event.clientX - touchRef.current.x,
                      event.clientY - touchRef.current.y,
                    );
                    if (distance > 8) touchRef.current.moved = true;
                  }}
                  onPointerUp={(event: PointerEvent<HTMLButtonElement>) => {
                    if (event.pointerType !== "touch" || touchRef.current.moved) return;
                    toggle(step.id);
                  }}
                  onFocus={(event: FocusEvent<HTMLButtonElement>) => {
                    if (!event.currentTarget.matches(":focus-visible")) return;
                    focusNode(step.id);
                  }}
                  onBlur={(event: FocusEvent<HTMLButtonElement>) => {
                    blurNode(step.id, event.relatedTarget);
                  }}
                >
                  <span className="flex w-[6.75rem] shrink-0 flex-col items-center">
                    <svg viewBox="-100 -28 200 150" className="pointer-events-none h-[4.6rem] w-full overflow-visible" aria-hidden="true">
                      <IsometricPlatform
                        x={0}
                        y={12}
                        raised={played || active}
                        highlighted={played || active}
                        reducedMotion={reducedMotion}
                      >
                        <g
                          transform="translate(0 50)"
                          style={{ color: played || active ? "#f7f6ff" : "rgba(255,255,255,0.78)" }}
                        >
                          <MobileIcon id={step.id} />
                        </g>
                      </IsometricPlatform>
                    </svg>
                    {next && (
                      <svg viewBox="0 0 20 36" className="pointer-events-none h-9 w-5 overflow-visible" aria-hidden="true">
                        <ConnectionPath
                          d="M10 0 L10 36"
                          state={pathState}
                          reducedMotion={reducedMotion}
                          marker={false}
                          strokeWidth={1.2}
                        />
                        {pathState !== "dim" && (
                          <DataPacket
                            key={pathState}
                            d="M10 0 L10 36"
                            emphasized={pathState === "hot"}
                            reducedMotion={reducedMotion}
                            size={3}
                          />
                        )}
                      </svg>
                    )}
                  </span>
                  <span className="min-w-0 flex-1 pt-3">
                    <span
                      className={`block border-l py-1 pl-4 ${
                        played || active ? "border-lilac" : "border-white/10"
                      }`}
                    >
                      <span className="font-terminal text-[11px] uppercase tracking-[0.16em] text-lilac">
                        {step.index}
                      </span>
                      <span className="mt-1 block font-display text-2xl font-bold tracking-[-0.03em]">
                        {step.title}
                      </span>
                    </span>
                    <AnimatePresence initial={false}>
                      {(played || active) && (
                        <motion.span
                          key={step.id}
                          initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                          transition={transition}
                          className="block pl-4 text-base font-normal leading-relaxed tracking-normal text-text-secondary normal-case"
                        >
                          <span className="block pt-2 pb-1">{step.description}</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </button>
                </motion.div>
              </motion.div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
