"use client";

import { Button } from "@/components/button";
import SectionWrapper from "@/components/section-wrapper";
import Image from "next/image";
import { downloadPbReport } from "@/lib/pb-report";
import { SCORE_VITALS, statusForVital } from "@/lib/score-vitals";

type Props = {
  total: number;
};

export default function ScoreVitalsBreakdownSectionV1({ total }: Props) {
  return (
    <SectionWrapper id="pb-section-breakdown" className="md:flex-row-reverse">
      <div className="flex flex-col flex-1 gap-y-8">
        <div className="flex flex-col gap-y-1.5">
          <h2>Here’s Where Each Vital Actually Stands</h2>
          <p>
            No two vitals decay the same way. Here’s what your score means for
            each one — and what it actually looks like at your level right now.
          </p>
        </div>

        <ul className="space-y-2">
          {SCORE_VITALS.map((v) => (
            <li key={v.key}>
              <span className="text-primary">{v.label}</span> — {v.value}{" "}
              percent · {statusForVital(v.value)}
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
          src="/images/sections/vitals-breakdown.webp"
          alt="Here is where each vital actually stands"
          className="px-1 py-1 h-full w-full object-cover"
        />
      </div>
    </SectionWrapper>
  );
}
