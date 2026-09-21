"use client";

import { Suspense, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import WindowLayout from "@/components/window-layout";
import ConfirmationFeaturedOfferSectionV2 from "../v2/_sections/featured-offer";
import ConfirmationCrossPromoteNum1SectionV2 from "../v2/_sections/cross-promote-num1";
import ConfirmationCrossPromoteNum2SectionV2 from "../v2/_sections/cross-promote-num2";
import ScoreOverallScoreSectionV1 from "./_sections/overall-score";
import ScoreFiveVitalsSectionV1 from "./_sections/five-vitals";
import ScoreVitalsBreakdownSectionV1 from "./_sections/vitals-breakdown";
import { getBandBySlug, getBandForTotal, getResultHeadline, toPercent } from "@/lib/pb-report";

const Content = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const result = useMemo(() => {
    const scoreParam = searchParams.get("score");
    const resultParam = searchParams.get("result");

    if (!scoreParam || !resultParam) return null;

    const total = Number.parseInt(scoreParam, 10);
    if (!Number.isFinite(total)) return null;

    const band =
      getBandBySlug(resultParam) ?? getBandForTotal(total);
    if (!band) return null;

    return { total, band };
  }, [searchParams]);

  useEffect(() => {
    if (!result) {
      router.replace("/");
    }
  }, [result, router]);

  if (!result) return null;

  const percent = toPercent(result.total);

  return (
    <WindowLayout>
      {/* <ConfirmationFeaturedOfferSectionV2 /> */}

      <ScoreOverallScoreSectionV1
        total={result.total}
        percent={percent}
        bandSlug={result.band.slug}
        bandTitle={result.band.title}
        headline={getResultHeadline(result.band.slug)}
      />

      <ScoreFiveVitalsSectionV1 total={result.total} />

      <ScoreVitalsBreakdownSectionV1 total={result.total} />

      <ConfirmationCrossPromoteNum1SectionV2 />

      <ConfirmationCrossPromoteNum2SectionV2 />
    </WindowLayout>
  );
};

const Page = () => {
  return (
    <Suspense>
      <Content />
    </Suspense>
  );
};

export default Page;
