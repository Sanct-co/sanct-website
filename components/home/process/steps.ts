export type StepId = "discover" | "plan" | "build" | "launch";

export type ProcessStep = {
  id: StepId;
  index: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: "discover",
    index: "01",
    title: "Discover",
    description:
      "Tell us the problem, not the spec. We ask about your team, your users, and your constraints until the real scope is clear.",
  },
  {
    id: "plan",
    index: "02",
    title: "Plan",
    description:
      "You get a fixed scope, timeline, and price before a line of code ships. No surprises halfway through the build.",
  },
  {
    id: "build",
    index: "03",
    title: "Build",
    description:
      "Weekly demos, not monthly guesswork. You watch the product take shape and can redirect early, when it's cheap to.",
  },
  {
    id: "launch",
    index: "04",
    title: "Launch",
    description:
      "We stay on after go-live, watching, fixing, improving. Support is part of the build, not a separate contract.",
  },
];

export function stepById(id: StepId) {
  const step = processSteps.find((item) => item.id === id);
  if (!step) throw new Error(`Unknown process step: ${id}`);
  return step;
}
