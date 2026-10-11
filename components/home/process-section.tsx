import { ProcessDiagram } from "@/components/home/process/process-diagram";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { TextSplit } from "@/components/ui/text-split";

export function ProcessSection() {
  return (
    <Section id="process" background="dark" className="scroll-mt-24">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <Tag variant="lilac">How We Work</Tag>
          <TextSplit
            text="Four steps, no detours for every project we take on."
            as="h2"
            className="mt-3 font-display text-4xl font-extrabold leading-tight md:text-5xl"
            stagger={0.05}
            scrollStart="top 85%"
          />
        </div>
        <button
          type="button"
          data-cal-link="deo-talip-iwfmht/secret"
          data-cal-namespace="secret"
          data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
          className="inline-flex shrink-0 cursor-pointer items-center justify-center self-start rounded-pill bg-sanct-indigo px-7 py-3 text-sm font-semibold uppercase tracking-[0.06em] text-white transition-[background-color] duration-150 ease-out hover:bg-indigo-mid focus-visible:bg-indigo-mid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lilac lg:self-end"
        >
          Book a Call
        </button>
      </div>
      <ProcessDiagram />
    </Section>
  );
}
