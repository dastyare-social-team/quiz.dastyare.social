import WindowLayout from "@/components/window-layout";
import LandingHeroSectionV2 from "./_sections/hero";
import LandingProblemSectionV2 from "./_sections/problem";
import LandingThreeDreamOutcomeBlocksSectionV2 from "./_sections/three-dream-outcome-blocks";
import LandingSocialProofBlockNum2SectionV2 from "./_sections/social-proof-block-num2";
import LandingWhyThisScorecardIsDifferentSectionV2 from "./_sections/why-this-scorecard-different";
import LandingHowItWorksSectionV2 from "./_sections/how-it-works";
import LandingMeetTheHostSectionV2 from "./_sections/meet-the-host";
import LandingFAQSectionV2 from "./_sections/faq";
import LandingFinalCTASectionV2 from "./_sections/final-cta";
import LandingSocialProofBlockNum1SectionV1 from "../v1/_sections/social-proof-block-num1";

const Page = () => {
  return (
    <WindowLayout>
      <LandingHeroSectionV2 />

      <LandingSocialProofBlockNum2SectionV2 />

      <LandingProblemSectionV2 />

      <LandingThreeDreamOutcomeBlocksSectionV2 />

      <LandingSocialProofBlockNum1SectionV1 />

      <LandingWhyThisScorecardIsDifferentSectionV2 />

      <LandingHowItWorksSectionV2 />

      <LandingMeetTheHostSectionV2 />

      <LandingFAQSectionV2 />

      <LandingFinalCTASectionV2 />
    </WindowLayout>
  );
};

export default Page;
