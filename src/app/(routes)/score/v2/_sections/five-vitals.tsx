"use client";

import { Button } from "@/components/button";
import SectionWrapper from "@/components/section-wrapper";
import Image from "next/image";
import { downloadPbReport } from "@/lib/pb-report";
import { SCORE_VITALS } from "@/lib/score-vitals";

type Props = {
  total: number;
};

export default function ScoreFiveVitalsSectionV1({ total }: Props) {
  return (
    <SectionWrapper id="pb-section-vitals">
      <div className="flex flex-col flex-1 gap-y-8">
        <div className="flex flex-col gap-y-1.5">
          <h2>The 5 Vitals of a Personal Brand That Actually Works</h2>
          <p>
            Views and followers aren’t vitals — they’re symptoms. These are the
            5 things that actually decide whether a personal brand builds trust,
            builds demand, or builds nothing at all.
          </p>
        </div>

        <ul className="space-y-2">
          {SCORE_VITALS.map((v) => (
            <li key={v.key}>
              <span className="text-primary">{v.label}</span> — {v.text}
            </li>
          ))}
        </ul>

        <div>
          <Button onClick={() => downloadPbReport(total)}>
            Get Your PB Report — Now
          </Button>
        </div>
      </div>

      <div
        onContextMenu={(e) => e.preventDefault()}
        className="aspect-square flex-1 bg-primary/[1%] border-2 border-primary/5"
      >
        <Image
          width={1024}
          height={1024}
          src="/images/sections/five-vitals.webp"
          alt="The 5 vitals of a personal brand that actually works"
          className="px-1 py-1 h-full w-full object-cover"
        />
      </div>
    </SectionWrapper>
  );
}
