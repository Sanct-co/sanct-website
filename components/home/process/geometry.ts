import { processSteps, type StepId } from "./steps";

export const PLATFORM = { w: 72, h: 38, depth: 16 } as const;
export const PLATFORM_LIFT = 11;
export const VIEWBOX = { width: 1200, height: 530 } as const;

export type LabelPlacement = "above" | "below";

export type NodeAnchor = {
  id: StepId;
  x: number;
  y: number;
  label: LabelPlacement;
};

const yHigh = 158;
const yLow = 308;

export const nodeAnchors: NodeAnchor[] = [
  { id: "discover", x: 188, y: yHigh, label: "above" },
  { id: "plan", x: 456, y: yLow, label: "below" },
  { id: "build", x: 744, y: yHigh, label: "above" },
  { id: "launch", x: 1012, y: yLow, label: "below" },
];

export function faceCenter(anchor: NodeAnchor) {
  return { x: anchor.x, y: anchor.y + PLATFORM.h };
}

export function labelAnchor(anchor: NodeAnchor) {
  if (anchor.label === "above") {
    return { indexY: anchor.y - 54, titleY: anchor.y - 34 };
  }

  const base = anchor.y + PLATFORM.h * 2 + PLATFORM.depth;
  return { indexY: base + 32, titleY: base + 52 };
}

export type DiagramLink = {
  from: StepId;
  to: StepId;
  d: string;
};

function curve(from: NodeAnchor, to: NodeAnchor) {
  const y1 = from.y + PLATFORM.h;
  const y2 = to.y + PLATFORM.h;
  const x1 = from.x + PLATFORM.w + 16;
  const x2 = to.x - PLATFORM.w - 16;
  const dx = Math.max(32, (x2 - x1) * 0.48);
  const round = (value: number) => Math.round(value * 10) / 10;
  return `M ${round(x1)} ${round(y1)} C ${round(x1 + dx)} ${round(y1)}, ${round(x2 - dx)} ${round(y2)}, ${round(x2)} ${round(y2)}`;
}

export const diagramLinks: DiagramLink[] = processSteps.slice(0, -1).map((step, index) => ({
  from: step.id,
  to: processSteps[index + 1].id,
  d: curve(nodeAnchors[index], nodeAnchors[index + 1]),
}));

export type PathState = "idle" | "hot" | "dim";

export function connectionState(active: StepId | null, from: StepId, to: StepId): PathState {
  if (active === null) return "idle";
  return active === from || active === to ? "hot" : "dim";
}

export function pathMidpoint(d: string) {
  const nums = d.match(/-?\d*\.?\d+/g)?.map(Number) ?? [];

  if (nums.length >= 8) {
    const [x0, y0, x1, y1, x2, y2, x3, y3] = nums;
    const t = 0.5;
    const u = 0.5;
    return {
      x: u * u * u * x0 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x3,
      y: u * u * u * y0 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y3,
    };
  }

  if (nums.length >= 4) {
    return {
      x: (nums[0] + nums[nums.length - 2]) / 2,
      y: (nums[1] + nums[nums.length - 1]) / 2,
    };
  }

  return null;
}

export function diagramTransition(reducedMotion: boolean, duration = 0.4) {
  if (reducedMotion) return { duration: 0 };
  return { duration, ease: [0.22, 1, 0.36, 1] as const };
}
