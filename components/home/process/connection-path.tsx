"use client";

import { motion } from "motion/react";
import { diagramTransition, pathMidpoint, type PathState } from "./geometry";

type ConnectionPathProps = {
  d: string;
  state: PathState;
  reducedMotion: boolean;
  marker?: boolean;
  strokeWidth?: number;
};

export function ConnectionPath({
  d,
  state,
  reducedMotion,
  marker = true,
  strokeWidth = 1.15,
}: ConnectionPathProps) {
  const transition = diagramTransition(reducedMotion, 0.35);
  const mid = marker ? pathMidpoint(d) : null;
  const hot = state === "hot";

  return (
    <g pointerEvents="none">
      <motion.path
        d={d}
        fill="none"
        strokeLinecap="round"
        initial={false}
        animate={{
          stroke: hot ? "rgba(160,156,245,0.28)" : "rgba(255,255,255,0)",
          strokeWidth: hot ? 5 : 1,
          opacity: state === "dim" ? 0 : 1,
        }}
        transition={transition}
      />
      <motion.path
        d={d}
        fill="none"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={false}
        animate={{
          stroke: hot ? "#b7b2f6" : "rgba(255,255,255,0.82)",
          strokeWidth: hot ? 1.55 : strokeWidth,
          opacity: state === "dim" ? 0.18 : hot ? 1 : 0.32,
        }}
        transition={transition}
      />
      {mid && (
        <motion.polygon
          points={`${mid.x},${mid.y - 4.5} ${mid.x + 4.5},${mid.y} ${mid.x},${mid.y + 4.5} ${mid.x - 4.5},${mid.y}`}
          initial={false}
          animate={{
            fill: hot ? "#a09cf5" : "#111015",
            stroke: hot ? "#c8c4ff" : "rgba(255,255,255,0.4)",
            opacity: state === "dim" ? 0.2 : 1,
          }}
          strokeWidth="1"
          transition={transition}
        />
      )}
    </g>
  );
}
