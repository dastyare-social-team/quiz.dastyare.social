import WindowLayout from "@/components/window-layout";
import LandingHeroSectionV1 from "./_sections/hero";
import LandingProblemSectionV1 from "./_sections/problem";
import LandingSocialProofBlockNum1SectionV1 from "./_sections/social-proof-block-num1";
import LandingThreeDreamOutcomeBlocksSectionV1 from "./_sections/three-dream-outcome-blocks";
import LandingSocialProofBlockNum2SectionV1 from "./_sections/social-proof-block-num2";
import LandingWhyThisWorkshopIsDifferentSectionV1 from "./_sections/why-this-workshop-different";
import LandingHowItWorksSectionV1 from "./_sections/how-it-works";
import LandingFAQSectionV1 from "./_sections/faq";
import LandingFinalCTASectionV1 from "./_sections/final-cta";

const Page = () => {
  return (
    <WindowLayout>
      <LandingHeroSectionV1 />

      <LandingSocialProofBlockNum2SectionV1 />

      <LandingProblemSectionV1 />

      <LandingSocialProofBlockNum1SectionV1 />

      <LandingThreeDreamOutcomeBlocksSectionV1 />

      <LandingSocialProofBlockNum1SectionV1 />

      <LandingWhyThisWorkshopIsDifferentSectionV1 />

      <LandingHowItWorksSectionV1 />

      <LandingFAQSectionV1 />

      <LandingFinalCTASectionV1 />
    </WindowLayout>
  );
};

export default Page;
