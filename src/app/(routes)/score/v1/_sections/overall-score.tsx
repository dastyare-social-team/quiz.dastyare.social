"use client";

import { Button } from "@/components/button";
import SectionWrapper from "@/components/section-wrapper";
import { downloadPbReport } from "@/lib/pb-report";

type Props = {
  total: number;
  percent: number;
  bandTitle: string;
  headline: string;
};

export default function ScoreOverallScoreSectionV1({
  total,
  percent,
  bandTitle,
  headline,
}: Props) {
  return (
    <SectionWrapper className="md:flex-row-reverse md:pt-0 border-0">
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
          <Button onClick={() => downloadPbReport(total)}>
            Get Your PB Report — Now
          </Button>
        </div>
      </div>

      <div
        aria-hidden
        className="aspect-square flex-1 bg-primary/[1%] border-2 border-primary/5"
      />
    </SectionWrapper>
  );
}
