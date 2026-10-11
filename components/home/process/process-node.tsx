"use client";

import { type FocusEvent, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { motion } from "motion/react";
import {
  diagramTransition,
  faceCenter,
  labelAnchor,
  PLATFORM,
  PLATFORM_LIFT,
  type NodeAnchor,
} from "./geometry";
import { IsometricPlatform } from "./isometric-platform";
import { processSteps, stepById, type StepId } from "./steps";

type ProcessNodeProps = {
  anchor: NodeAnchor;
  active: boolean;
  dimmed: boolean;
  reducedMotion: boolean;
  onPointerEnter: (event: PointerEvent<SVGGElement>) => void;
  onPointerLeave: (event: PointerEvent<SVGGElement>) => void;
  onPointerUp: (event: PointerEvent<SVGGElement>) => void;
  onFocus: (event: FocusEvent<SVGGElement>) => void;
  onBlur: (event: FocusEvent<SVGGElement>) => void;
  onKeyDown: (event: KeyboardEvent<SVGGElement>) => void;
};

const icons: Record<StepId, ReactNode> = {
  discover: (
    <g>
      <circle cx="-1.5" cy="-1.5" r="5.6" />
      <path d="M2.6 2.6 6.6 6.6" />
    </g>
  ),
  plan: (
    <g>
      <rect x="-7" y="-8.5" width="14" height="17" rx="1.4" />
      <path d="M-4 -3.4h8M-4 .2h8M-4 3.8h4.5" />
    </g>
  ),
  build: (
    <g>
      <rect x="-8.2" y="-8.2" width="9.2" height="9.2" />
      <rect x="-1" y="-1" width="9.2" height="9.2" />
    </g>
  ),
  launch: (
    <g>
      <path d="M-6.2 6.4h12.4" />
      <path d="M0 6.4V-5.2" />
      <path d="M-3.6 -2.2 0 -6.2 3.6 -2.2" />
    </g>
  ),
};

function StepIcon({ id, active }: { id: StepId; active: boolean }) {
  return (
    <g
      fill="none"
      stroke={active ? "#f7f6ff" : "rgba(255,255,255,0.78)"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[id]}
    </g>
  );
}

export function ProcessNode({
  anchor,
  active,
  dimmed,
  reducedMotion,
  onPointerEnter,
  onPointerLeave,
  onPointerUp,
  onFocus,
  onBlur,
  onKeyDown,
}: ProcessNodeProps) {
  const step = stepById(anchor.id);
  const center = faceCenter(anchor);
  const labels = labelAnchor(anchor);
  const stepIndex = processSteps.findIndex((item) => item.id === anchor.id);
  const top = (anchor.label === "above" ? labels.indexY - 18 : anchor.y - 22) - PLATFORM_LIFT;
  const bottom =
    anchor.label === "below"
      ? labels.titleY + 14
      : anchor.y + PLATFORM.h * 2 + PLATFORM.depth + 26;

  return (
    <motion.g
      data-process-node=""
      role="button"
      tabIndex={0}
      aria-pressed={active}
      aria-label={`${step.index} ${step.title}. ${step.description}`}
      className="cursor-pointer outline-none"
      initial={false}
      animate={{ opacity: dimmed ? 0.3 : 1 }}
      transition={diagramTransition(reducedMotion, 0.35)}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerUp={onPointerUp}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    >
      <rect
        x={anchor.x - PLATFORM.w - 28}
        y={top}
        width={PLATFORM.w * 2 + 56}
        height={bottom - top}
        fill="rgba(0,0,0,0)"
      />
      <g pointerEvents="none">
        <IsometricPlatform
          x={anchor.x}
          y={anchor.y}
          raised={active}
          highlighted={active}
          reducedMotion={reducedMotion}
        >
          <g transform={`translate(${center.x} ${center.y})`}>
            <StepIcon id={anchor.id} active={active} />
          </g>
          {stepIndex > 0 && (
            <circle
              cx={anchor.x - PLATFORM.w}
              cy={anchor.y + PLATFORM.h}
              r={active ? 2.7 : 2.15}
              fill={active ? "#a09cf5" : "#111015"}
              stroke={active ? "#d5d2ff" : "rgba(255,255,255,0.42)"}
              strokeWidth="1"
            />
          )}
          {stepIndex < processSteps.length - 1 && (
            <circle
              cx={anchor.x + PLATFORM.w}
              cy={anchor.y + PLATFORM.h}
              r={active ? 2.7 : 2.15}
              fill={active ? "#a09cf5" : "#111015"}
              stroke={active ? "#d5d2ff" : "rgba(255,255,255,0.42)"}
              strokeWidth="1"
            />
          )}
          <text
            x={anchor.x}
            y={labels.indexY}
            textAnchor="middle"
            className="font-terminal"
            fontSize="11"
            letterSpacing="0.16em"
            fill={active ? "#c8c4ff" : "rgba(255,255,255,0.42)"}
          >
            {step.index}
          </text>
          <text
            x={anchor.x}
            y={labels.titleY}
            textAnchor="middle"
            className="font-display"
            fontSize="16"
            fontWeight="700"
            letterSpacing="-0.03em"
            fill={active ? "#ffffff" : "rgba(255,255,255,0.62)"}
          >
            {step.title}
          </text>
        </IsometricPlatform>
      </g>
    </motion.g>
  );
}
