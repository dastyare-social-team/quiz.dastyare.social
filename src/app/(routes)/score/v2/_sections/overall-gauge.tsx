"use client";

import Image from "next/image";
import { scorecard_v1 } from "@/config/scorecard-v1";

type Props = {
  bandSlug: string;
};

export default function ScoreOverallGauge({ bandSlug }: Props) {
  const band =
    scorecard_v1.interpretationBands.find((b) => b.slug === bandSlug) ??
    scorecard_v1.interpretationBands[0];

  return (
    <Image
      width={1024}
      height={1024}
      src={`/images/sections/overall-${band.slug}.webp`}
      alt={`Your result: ${band.title}`}
      className="px-1 py-1 h-full w-full object-cover"
    />
  );
}
