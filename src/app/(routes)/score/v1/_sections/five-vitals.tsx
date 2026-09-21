"use client";

import { Button } from "@/components/button";
import SectionWrapper from "@/components/section-wrapper";
import { downloadPbReport } from "@/lib/pb-report";

const vitals = [
  {
    name: "Visibility",
    text: "Can the right people find you before they find someone else?",
  },
  {
    name: "Authority",
    text: "When they find you, do they trust what they see?",
  },
  {
    name: "Consistency",
    text: "Are you showing up on a rhythm, or ghosting for weeks at a time?",
  },
  {
    name: "Ownership",
    text: "Do you own your audience, or are you renting it from a platform?",
  },
  {
    name: "Demand",
    text: "Does any of this actually make you money?",
  },
];

type Props = {
  total: number;
};

export default function ScoreFiveVitalsSectionV1({ total }: Props) {
  return (
    <SectionWrapper>
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
          {vitals.map((v) => (
            <li key={v.name}>
              <span className="text-primary">{v.name}</span> — {v.text}
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
