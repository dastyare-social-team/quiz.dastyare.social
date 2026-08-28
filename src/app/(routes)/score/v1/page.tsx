"use client";

import WindowLayout from "@/components/window-layout";
import ConfirmationCrossPromoteNum1SectionV1 from "./_sections/cross-promote-num1";
import ConfirmationCrossPromoteNum2SectionV1 from "./_sections/cross-promote-num2";
import ScoreOverallScoreSectionV1 from "./_sections/overall-score";
import ScoreFiveVitalsSectionV1 from "./_sections/five-vitals";
import ScoreVitalsBreakdownSectionV1 from "./_sections/vitals-breakdown";

const Page = () => {
  return (
    <WindowLayout>
      <ScoreOverallScoreSectionV1 />

      {/* <ScoreFiveVitalsSectionV1 />

      <ScoreVitalsBreakdownSectionV1 /> */}

      <ConfirmationCrossPromoteNum1SectionV1 />

      <ConfirmationCrossPromoteNum2SectionV1 />
    </WindowLayout>
  );
};

export default Page;
