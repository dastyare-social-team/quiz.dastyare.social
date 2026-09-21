"use client";

import { Button } from "@/components/button";
import SectionWrapper from "@/components/section-wrapper";
import { downloadPbReport } from "@/lib/pb-report";

const vitals = [
  { key: "visibility", label: "Visibility", value: 68 },
  { key: "authority", label: "Authority", value: 72 },
  { key: "consistency", label: "Consistency", value: 55 },
  { key: "ownership", label: "Ownership", value: 45 },
  { key: "demand", label: "Demand", value: 61 },
];

function statusFor(score: number) {
  if (score <= 39) return "Flatlining";
  if (score <= 59) return "Unstable";
  if (score <= 79) return "Stabilizing";
  return "Compounding";
}

type Props = {
  total: number;
};

export default function ScoreVitalsBreakdownSectionV1({ total }: Props) {
  return (
    <SectionWrapper className="md:flex-row-reverse">
      <div className="flex flex-col flex-1 gap-y-8">
        <div className="flex flex-col gap-y-1.5">
          <h2>Here’s Where Each Vital Actually Stands</h2>
          <p>
            No two vitals decay the same way. Here’s what your score means for
            each one — and what it actually looks like at your level right now.
          </p>
        </div>

        <ul className="space-y-2">
          {vitals.map((v) => (
            <li key={v.key}>
              <span className="text-primary">{v.label}</span> — {v.value}{" "}
              percent · {statusFor(v.value)}
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
        aria-hidden
        className="aspect-square flex-1 bg-primary/[1%] border-2 border-primary/5"
      />
    </SectionWrapper>
  );
}
