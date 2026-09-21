"use client";

import { Button } from "@/components/button";
import SectionWrapper from "@/components/section-wrapper";
import { downloadPbReport } from "@/lib/pb-report";
import ScoreOverallGauge from "./overall-gauge";

type Props = {
  total: number;
  percent: number;
  bandSlug: string;
  bandTitle: string;
  headline: string;
};

export default function ScoreOverallScoreSectionV1({
  total,
  percent,
  bandSlug,
  bandTitle,
  headline,
}: Props) {
  return (
    <SectionWrapper id="pb-section-overall" className="md:flex-row-reverse md:pt-0 border-0">
      <div className="flex flex-col flex-1 gap-y-8">
        <div className="flex flex-col gap-y-1.5">
          <p className="text-primary font-medium pb-2">
            {percent} percent — {bandTitle}
          </p>
          <h2>{headline}</h2>
          <p>
            Every founder’s personal brand is either compounding or decaying.
            There’s no neutral. Here’s where yours stands today.
          </p>
        </div>

        <div>
          <Button
            onClick={() => downloadPbReport(total)}
            className="max-w-full whitespace-nowrap overflow-hidden text-ellipsis"
          >
            Get Your PB Report — Now
          </Button>
        </div>
      </div>

      <div
        onContextMenu={(e) => e.preventDefault()}
        className="aspect-square flex-1 bg-primary/[1%] border-2 border-primary/5"
      >
        <ScoreOverallGauge bandSlug={bandSlug} />
      </div>
    </SectionWrapper>
  );
}
