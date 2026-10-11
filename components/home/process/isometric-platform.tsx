"use client";

import { useId, type ReactNode } from "react";
import { motion } from "motion/react";
import { diagramTransition, PLATFORM, PLATFORM_LIFT } from "./geometry";

type IsometricPlatformProps = {
  x: number;
  y: number;
  raised: boolean;
  highlighted: boolean;
  reducedMotion: boolean;
  children?: ReactNode;
};

function insetPoint(px: number, py: number, cx: number, cy: number, scale: number) {
  return `${cx + (px - cx) * scale},${cy + (py - cy) * scale}`;
}

export function IsometricPlatform({
  x,
  y,
  raised,
  highlighted,
  reducedMotion,
  children,
}: IsometricPlatformProps) {
  const glowId = `platform-glow-${useId().replace(/:/g, "")}`;
  const { w, h, depth } = PLATFORM;
  const transition = diagramTransition(reducedMotion, 0.45);
  const top = `${x},${y} ${x + w},${y + h} ${x},${y + h * 2} ${x - w},${y + h}`;
  const left = `${x - w},${y + h} ${x},${y + h * 2} ${x},${y + h * 2 + depth} ${x - w},${y + h + depth}`;
  const right = `${x + w},${y + h} ${x},${y + h * 2} ${x},${y + h * 2 + depth} ${x + w},${y + h + depth}`;
  const centerX = x;
  const centerY = y + h;
  const inset = [
    insetPoint(x, y, centerX, centerY, 0.74),
    insetPoint(x + w, y + h, centerX, centerY, 0.74),
    insetPoint(x, y + h * 2, centerX, centerY, 0.74),
    insetPoint(x - w, y + h, centerX, centerY, 0.74),
  ].join(" ");
  const padY = y + h * 2 + depth + 3;
  const padW = w * 1.12;
  const padH = 9;
  const pad = `${x},${padY - padH} ${x + padW},${padY} ${x},${padY + padH} ${x - padW},${padY}`;

  return (
    <g>
      <defs>
        <filter id={glowId} x="-60%" y="-60%" width="220%" height="220%" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="0" stdDeviation="2.2" floodColor="#a09cf5" floodOpacity="0.32" />
        </filter>
      </defs>

      <motion.ellipse
        cx={x}
        cy={padY + 8}
        rx={w * 0.78}
        fill="#000000"
        initial={false}
        animate={{
          opacity: highlighted ? 0.28 : 0.5,
          ry: raised ? 5 : 7,
        }}
        transition={transition}
      />
      <polygon points={pad} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

      <motion.g
        initial={false}
        animate={{ y: raised ? -PLATFORM_LIFT : 0 }}
        transition={transition}
      >
        <polygon points={left} fill={highlighted ? "#1a1624" : "#14121a"} />
        <polygon points={right} fill={highlighted ? "#2a2540" : "#1c1828"} />
        <polygon
          points={top}
          fill={highlighted ? "#312a48" : "#221e2e"}
          stroke="none"
        />
        <polygon
          points={top}
          fill="none"
          stroke={highlighted ? "#c6c2ff" : "rgba(255,255,255,0.24)"}
          strokeWidth={highlighted ? 1.6 : 1.1}
          strokeLinejoin="round"
          filter={highlighted ? `url(#${glowId})` : undefined}
        />
        <polygon
          points={inset}
          fill="none"
          stroke={highlighted ? "rgba(160,156,245,0.45)" : "rgba(255,255,255,0.08)"}
          strokeWidth="1"
        />
        <polyline
          points={`${x},${y} ${x - w},${y + h}`}
          fill="none"
          stroke={highlighted ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.28)"}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {children}
      </motion.g>
    </g>
  );
}
