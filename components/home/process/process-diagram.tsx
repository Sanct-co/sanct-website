"use client";

import { useId, useRef, useState, type PointerEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ConnectionPath } from "./connection-path";
import { DataPacket } from "./data-packet";
import {
  VIEWBOX,
  connectionState,
  diagramLinks,
  diagramTransition,
  nodeAnchors,
} from "./geometry";
import { ProcessMobile } from "./process-mobile";
import { ProcessNode } from "./process-node";
import { processSteps, stepById, type StepId } from "./steps";
import { useReducedMotion } from "@/lib/use-reduced-motion";

function isProcessTarget(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest("[data-process-node]"));
}

function now() {
  return performance.now();
}

function IsometricGrid() {
  const lines: string[] = [];
  const gap = 54;
  const extent = 2200;
  const originX = VIEWBOX.width / 2;
  const originY = VIEWBOX.height / 2;

  for (const angle of [Math.PI / 6, -Math.PI / 6]) {
    const dirX = Math.cos(angle);
    const dirY = Math.sin(angle);
    const perpX = -Math.sin(angle);
    const perpY = Math.cos(angle);

    for (let index = -24; index <= 24; index += 1) {
      const cx = originX + perpX * gap * index;
      const cy = originY + perpY * gap * index;
      lines.push(
        `M ${cx - dirX * extent} ${cy - dirY * extent} L ${cx + dirX * extent} ${cy + dirY * extent}`,
      );
    }
  }

  return (
    <g stroke="rgba(255,255,255,0.045)" strokeWidth="1" fill="none" pointerEvents="none">
      {lines.map((d) => (
        <path key={d} d={d} />
      ))}
    </g>
  );
}

function FrameMarks() {
  const { width, height } = VIEWBOX;
  const inset = 18;
  const arm = 16;
  const paths = [
    `M ${inset + arm} ${inset} H ${inset} V ${inset + arm}`,
    `M ${width - inset - arm} ${inset} H ${width - inset} V ${inset + arm}`,
    `M ${inset} ${height - inset - arm} V ${height - inset} H ${inset + arm}`,
    `M ${width - inset} ${height - inset - arm} V ${height - inset} H ${width - inset - arm}`,
  ];

  return (
    <g fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" pointerEvents="none">
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </g>
  );
}

export function ProcessDiagram() {
  const [activeNode, setActiveNode] = useState<StepId | null>(null);
  const reducedMotion = useReducedMotion();
  const focusRef = useRef<StepId | null>(null);
  const ignoreMouseUntil = useRef(0);
  const vignetteId = `process-vignette-${useId().replace(/:/g, "")}`;
  const activeStep = activeNode ? stepById(activeNode) : null;
  const textTransition = diagramTransition(reducedMotion, 0.24);

  function mouseIsSettling() {
    return now() < ignoreMouseUntil.current;
  }

  function enter(id: StepId) {
    if (mouseIsSettling()) return;
    setActiveNode(id);
  }

  function leave(id: StepId, next: EventTarget | null) {
    if (mouseIsSettling()) return;
    if (isProcessTarget(next)) return;
    setActiveNode(focusRef.current === id ? id : focusRef.current);
  }

  function toggle(id: StepId) {
    ignoreMouseUntil.current = now() + 800;
    setActiveNode((current) => (current === id ? null : id));
  }

  function focusNode(id: StepId) {
    focusRef.current = id;
    setActiveNode(id);
  }

  function blurNode(id: StepId, next: EventTarget | null) {
    if (focusRef.current === id) focusRef.current = null;
    if (isProcessTarget(next)) return;
    setActiveNode((current) => (current === id ? focusRef.current : current));
  }

  return (
    <div className="mt-10 lg:mt-12">
      <div className="hidden lg:block">
        <svg
          viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
          role="group"
          aria-label="Discover, plan, build, and launch"
          className="h-auto w-full select-none"
        >
          <defs>
            <radialGradient id={vignetteId} cx="50%" cy="46%" r="72%">
              <stop offset="0%" stopColor="#111015" stopOpacity="0" />
              <stop offset="62%" stopColor="#111015" stopOpacity="0" />
              <stop offset="100%" stopColor="#111015" stopOpacity="1" />
            </radialGradient>
          </defs>

          <IsometricGrid />
          <rect
            width={VIEWBOX.width}
            height={VIEWBOX.height}
            fill={`url(#${vignetteId})`}
            pointerEvents="none"
          />
          <FrameMarks />
          <text
            x="36"
            y="40"
            className="font-terminal"
            fontSize="11"
            letterSpacing="0.16em"
            fill="rgba(255,255,255,0.38)"
            pointerEvents="none"
          >
            PROCESS
          </text>
          <text
            x={VIEWBOX.width - 36}
            y="40"
            textAnchor="end"
            className="font-terminal"
            fontSize="11"
            letterSpacing="0.16em"
            fill="rgba(255,255,255,0.38)"
            pointerEvents="none"
          >
            01–04
          </text>

          {diagramLinks.map((link) => {
            const state = connectionState(activeNode, link.from, link.to);
            return (
              <g key={`${link.from}-${link.to}`}>
                <ConnectionPath d={link.d} state={state} reducedMotion={reducedMotion} />
                {state !== "dim" && (
                  <DataPacket
                    key={state}
                    d={link.d}
                    emphasized={state === "hot"}
                    reducedMotion={reducedMotion}
                  />
                )}
              </g>
            );
          })}

          {nodeAnchors.map((anchor) => (
            <ProcessNode
              key={anchor.id}
              anchor={anchor}
              active={activeNode === anchor.id}
              dimmed={activeNode !== null && activeNode !== anchor.id}
              reducedMotion={reducedMotion}
              onPointerEnter={(event) => {
                if (event.pointerType === "touch") return;
                enter(anchor.id);
              }}
              onPointerLeave={(event) => {
                if (event.pointerType === "touch") return;
                leave(anchor.id, event.relatedTarget);
              }}
              onPointerUp={(event) => {
                if (event.pointerType !== "touch") return;
                toggle(anchor.id);
              }}
              onFocus={(event) => {
                if (!event.currentTarget.matches(":focus-visible")) return;
                focusNode(anchor.id);
              }}
              onBlur={(event) => blurNode(anchor.id, event.relatedTarget)}
              onKeyDown={(event) => {
                if (event.key !== "Enter" && event.key !== " ") return;
                event.preventDefault();
                enter(anchor.id);
              }}
            />
          ))}
        </svg>

        <div className="mt-1 grid items-start gap-10 border-t border-white/10 pt-6 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div className="min-h-[8.75rem]" aria-hidden="true">
            <AnimatePresence mode="wait" initial={false}>
              {activeStep ? (
                <motion.div
                  key={activeStep.id}
                  initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={textTransition}
                >
                  <p className="font-terminal text-[11px] uppercase tracking-[0.16em] text-lilac">
                    <span className="mr-2 inline-block size-1.5 translate-y-[-1px] rounded-full bg-lilac align-middle" />
                    {activeStep.index}
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-bold tracking-[-0.03em] md:text-4xl">
                    {activeStep.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-text-secondary">
                    {activeStep.description}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={textTransition}
                >
                  <p className="font-terminal text-[11px] uppercase tracking-[0.16em] text-text-muted">
                    Hover a step
                  </p>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-text-secondary">
                    Discover, Plan, Build, Launch.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden flex-col lg:flex" aria-hidden="true">
            {processSteps.map((step) => {
              const active = activeNode === step.id;
              const dimmed = activeNode !== null && !active;
              return (
                <motion.div
                  key={step.id}
                  data-process-node=""
                  initial={false}
                  animate={{ opacity: dimmed ? 0.3 : 1 }}
                  transition={diagramTransition(reducedMotion, 0.35)}
                  className={`flex cursor-pointer items-center gap-3 border-l py-2 pl-3 ${
                    active ? "border-lilac" : "border-white/10"
                  }`}
                  onPointerEnter={(event: PointerEvent<HTMLDivElement>) => {
                    if (event.pointerType === "touch") return;
                    enter(step.id);
                  }}
                  onPointerLeave={(event: PointerEvent<HTMLDivElement>) => {
                    if (event.pointerType === "touch") return;
                    leave(step.id, event.relatedTarget);
                  }}
                  onPointerUp={(event: PointerEvent<HTMLDivElement>) => {
                    if (event.pointerType !== "touch") return;
                    toggle(step.id);
                  }}
                >
                  <span className="w-7 font-terminal text-[11px] tracking-[0.14em] text-lilac">
                    {step.index}
                  </span>
                  <span
                    className={`font-display text-[15px] font-semibold tracking-[-0.02em] ${
                      active ? "text-white" : "text-white/55"
                    }`}
                  >
                    {step.title}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <ProcessMobile
          activeNode={activeNode}
          reducedMotion={reducedMotion}
          enter={enter}
          leave={leave}
          toggle={toggle}
          focusNode={focusNode}
          blurNode={blurNode}
        />
      </div>
    </div>
  );
}
