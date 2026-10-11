"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type MotionMode = "prime" | "enter" | "idle";

type Cell = {
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
};

const DEEP = ["#2C1FA8", "#3426B4", "#3D35B0"] as const;
const MID = ["#3D35B0", "#554CDA", "#6A62E6"] as const;
const SOFT = ["#837CF0", "#A09CF5", "#B7B3F8"] as const;
const LIGHT = ["#C9C6FB", "#DDDAFE"] as const;

function hash(col: number, row: number, salt = 0) {
  const n = Math.sin(col * 127.1 + row * 311.7 + salt * 74.5) * 43758.5453123;
  return n - Math.floor(n);
}

function valley(nx: number) {
  const fromCenter = Math.abs(nx - 0.5) * 2;
  const shaped = Math.pow(fromCenter, 2.7);
  const edge = Math.pow(fromCenter, 5.2) * 0.16;
  const side = nx > 0.5 ? 0.9 : 1;
  return Math.min(0.97, (0.11 + 0.84 * shaped + edge) * side);
}

function pickColor(depth: number, n: number) {
  if (depth > 0.62) {
    if (n > 0.84) return SOFT[1];
    return DEEP[Math.floor(n * DEEP.length) % DEEP.length];
  }
  if (depth > 0.3) {
    if (n > 0.8) return SOFT[1];
    return MID[Math.floor(n * MID.length) % MID.length];
  }
  if (n > 0.62) return LIGHT[n > 0.84 ? 1 : 0];
  return SOFT[Math.floor(n * SOFT.length) % SOFT.length];
}

function easeOutBack(t: number) {
  const c1 = 1.12;
  const c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
}

function buildCells(width: number, height: number): Cell[] {
  const columns = width < 640 ? 42 : width < 1100 ? 64 : 86;
  const pitch = width / columns;
  const rows = Math.max(1, Math.ceil(height / pitch));
  const gap = pitch * 0.14;
  const cells: Cell[] = [];
  let maxDelay = 0.001;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const nx = (col + 0.5) / columns;
      const up = (rows - row - 0.5) / rows;
      const env = valley(nx);
      const band = env - up;
      const n = hash(col, row);
      const n2 = hash(col, row, 2);
      const isBase = up < pitch / height + 0.04;

      if (band < -0.14) continue;
      if (band < 0) {
        if (n > (nx > 0.55 ? 0.1 : 0.045)) continue;
      } else if (!isBase && band < 0.07 && n > 0.58) {
        continue;
      } else if (!isBase && nx > 0.58 && band < 0.28 && n > 0.9) {
        continue;
      } else if (!isBase && n > 0.975) {
        continue;
      }

      const depth = Math.min(1, Math.max(0, band / Math.max(env, 0.18)));
      let scale = 0.78 + n2 * 0.22;
      if (band < 0.08) scale *= 0.72;
      if (n2 > 0.94 && band > 0.1) scale = 1.18;
      const size = Math.max(2, Math.round((pitch - gap) * scale));
      const delay =
        Math.abs(nx - 0.5) * 1.45 +
        up * 0.42 +
        n * 0.12;

      if (delay > maxDelay) maxDelay = delay;

      cells.push({
        x: col * pitch + (pitch - size) / 2,
        y: row * pitch + (pitch - size) / 2,
        size,
        color: pickColor(depth, n2),
        delay,
      });
    }
  }

  for (const cell of cells) cell.delay /= maxDelay;
  return cells;
}

const OPEN_WINDOW = 0.32;

export function HeroPixelField({ mode }: { mode: MotionMode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cells: Cell[] = [];
    const state = { t: mode === "idle" ? 1 : 0 };
    let tween: gsap.core.Tween | null = null;

    const paint = (progress: number) => {
      const width = wrap.clientWidth;
      const height = wrap.clientHeight;
      ctx.clearRect(0, 0, width, height);

      for (const cell of cells) {
        const raw = (progress - cell.delay * (1 - OPEN_WINDOW)) / OPEN_WINDOW;
        if (raw <= 0) continue;
        const t = Math.min(1, raw);
        const eased = easeOutBack(t);
        const size = cell.size * Math.max(0, eased);
        const x = cell.x + (cell.size - size) / 2;
        const y = cell.y + (cell.size - size) / 2 + (1 - t) * 12;
        ctx.globalAlpha = Math.min(1, t * 1.35);
        ctx.fillStyle = cell.color;
        ctx.fillRect(x, y, size, size);
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const width = wrap.clientWidth;
      const height = wrap.clientHeight;
      if (width < 2 || height < 2) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cells = buildCells(width, height);
      paint(state.t);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(wrap);

    if (mode === "enter") {
      state.t = 0;
      paint(0);
      tween = gsap.to(state, {
        t: 1,
        duration: 2.15,
        delay: 0.42,
        ease: "none",
        onUpdate: () => paint(state.t),
      });
    }

    return () => {
      tween?.kill();
      observer.disconnect();
    };
  }, [mode]);

  return (
    <div ref={wrapRef} aria-hidden="true" className="h-full w-full">
      <canvas
        ref={canvasRef}
        className="pointer-events-none block h-full w-full"
      />
    </div>
  );
}
