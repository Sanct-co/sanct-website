"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type MotionMode = "prime" | "enter" | "idle";

type Cell = {
  x: number;
  y: number;
  size: number;
  w: number;
  h: number;
  r: number;
  g: number;
  b: number;
  alpha: number;
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

function hexToRgb(hex: string) {
  const value = Number.parseInt(hex.slice(1), 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function pickColor(depth: number, n: number) {
  let hex: string;
  if (depth > 0.62) {
    hex = n > 0.84 ? SOFT[1] : DEEP[Math.floor(n * DEEP.length) % DEEP.length];
  } else if (depth > 0.3) {
    hex = n > 0.8 ? SOFT[1] : MID[Math.floor(n * MID.length) % MID.length];
  } else if (n > 0.62) {
    hex = LIGHT[n > 0.84 ? 1 : 0];
  } else {
    hex = SOFT[Math.floor(n * SOFT.length) % SOFT.length];
  }
  return hexToRgb(hex);
}

function easeOutBack(t: number) {
  const c1 = 1.12;
  const c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
}

const TOP_STEPS = [0, 2, 5, 1, 4, 3, 6, 2, 5, 1] as const;

function columnTop(col: number) {
  const step = TOP_STEPS[Math.abs(col) % TOP_STEPS.length];
  const jitter = hash(col, 1, 5) > 0.62 ? 1 : 0;
  return step + jitter;
}

function buildCells(width: number, height: number): Cell[] {
  const size = width < 640 ? 4 : width < 1100 ? 5 : 6;
  const pitch = size + 1;
  const columns = Math.ceil(width / pitch);
  const rows = Math.ceil(height / pitch);
  const cells: Cell[] = [];
  let maxDelay = 0.001;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const x = col * pitch;
      const y = row * pitch;
      if (x >= width || y >= height) continue;
      if (row < columnTop(col)) continue;
      const w = x + pitch >= width ? width - x : size;
      const h = y + pitch >= height ? height - y : size;

      const nx = (col + 0.5) / columns;
      const up = (rows - row - 0.5) / rows;
      const n = hash(col, row);
      const color = pickColor(1 - up, hash(col, row, 2));
      const alpha = Math.pow(Math.max(0, 1 - up), 1.15);
      if (alpha < 0.05) continue;
      const delay = up * 0.62 + Math.abs(nx - 0.5) * 0.28 + n * 0.1;

      if (delay > maxDelay) maxDelay = delay;

      cells.push({
        x,
        y,
        size,
        w,
        h,
        r: color.r,
        g: color.g,
        b: color.b,
        alpha,
        delay,
      });
    }
  }

  for (const cell of cells) cell.delay /= maxDelay;
  return cells;
}

const OPEN_WINDOW = 0.32;
const HOVER_RADIUS = 92;
const HOVER_LIFT = { r: 236, g: 234, b: 255 };

function mixChannel(from: number, to: number, amount: number) {
  return Math.round(from + (to - from) * amount);
}

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
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, amount: 0, target: 0 };
    let tween: gsap.core.Tween | null = null;
    let frame = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const paint = (progress: number) => {
      const width = wrap.clientWidth;
      const height = wrap.clientHeight;
      ctx.clearRect(0, 0, width, height);

      for (const cell of cells) {
        const raw = (progress - cell.delay * (1 - OPEN_WINDOW)) / OPEN_WINDOW;
        if (raw <= 0) continue;
        const t = Math.min(1, raw);
        const eased = easeOutBack(t);
        const cx = cell.x + cell.w / 2;
        const cy = cell.y + cell.h / 2;
        const dist = Math.hypot(cx - pointer.x, cy - pointer.y);
        const near = dist < HOVER_RADIUS ? 1 - dist / HOVER_RADIUS : 0;
        const influence = near * near * pointer.amount;
        const scale = Math.max(0, eased) * (1 + influence * 0.9);
        const w = cell.w * scale;
        const h = cell.h * scale;
        const x = cx - w / 2;
        const y = cy - h / 2 + (1 - t) * 8 - influence * 2;
        const brighten = Math.min(1, influence * 1.15);
        ctx.globalAlpha = Math.min(1, t * 1.35) * cell.alpha;
        ctx.fillStyle = `rgb(${mixChannel(cell.r, HOVER_LIFT.r, brighten)}, ${mixChannel(cell.g, HOVER_LIFT.g, brighten)}, ${mixChannel(cell.b, HOVER_LIFT.b, brighten)})`;
        ctx.fillRect(x, y, w, h);
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      pointer.x += (pointer.tx - pointer.x) * 0.18;
      pointer.y += (pointer.ty - pointer.y) * 0.18;
      pointer.amount += (pointer.target - pointer.amount) * 0.14;
      paint(state.t);

      const settling =
        Math.abs(pointer.tx - pointer.x) > 0.35 ||
        Math.abs(pointer.ty - pointer.y) > 0.35 ||
        Math.abs(pointer.target - pointer.amount) > 0.012 ||
        pointer.amount > 0.012;

      frame = settling ? window.requestAnimationFrame(tick) : 0;
    };

    const startHover = () => {
      if (reducedMotion || frame) return;
      frame = window.requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = event.clientX - rect.left;
      pointer.ty = event.clientY - rect.top;
      pointer.target = 1;
      if (pointer.amount === 0) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
      startHover();
    };

    const onPointerLeave = () => {
      pointer.target = 0;
      startHover();
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const width = Math.ceil(rect.width);
      const height = Math.ceil(rect.height);
      if (width < 2 || height < 2) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.ceil(rect.width * dpr);
      canvas.height = Math.ceil(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
      cells = buildCells(width, height);
      paint(state.t);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(wrap);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

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
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [mode]);

  return (
    <div ref={wrapRef} aria-hidden="true" className="pointer-events-auto h-full w-full">
      <canvas ref={canvasRef} className="pointer-events-auto block h-full w-full" />
    </div>
  );
}
