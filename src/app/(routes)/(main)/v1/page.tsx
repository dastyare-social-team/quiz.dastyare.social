import WindowLayout from "@/components/window-layout";
import LandingHeroSectionV1 from "./_sections/hero";
import LandingProblemSectionV1 from "./_sections/problem";
import LandingSocialProofBlockNum1SectionV1 from "./_sections/social-proof-block-num1";
import LandingThreeDreamOutcomeBlocksSectionV1 from "./_sections/three-dream-outcome-blocks";
import LandingSocialProofBlockNum2SectionV1 from "./_sections/social-proof-block-num2";
import LandingWhyThisScorecardIsDifferentSectionV1 from "./_sections/why-this-scorecard-different";
import LandingHowItWorksSectionV1 from "./_sections/how-it-works";
import LandingFAQSectionV1 from "./_sections/faq";
import LandingFinalCTASectionV1 from "./_sections/final-cta";

const Page = () => {
  const webhookUrl = process.env.WEBHOOK_URL || "";

  return (
    <WindowLayout>
      <LandingHeroSectionV1
        webhookUrl={webhookUrl}
      />

      <LandingSocialProofBlockNum2SectionV1 />

      <LandingProblemSectionV1
        webhookUrl={webhookUrl}
      />

      <LandingSocialProofBlockNum1SectionV1
        webhookUrl={webhookUrl}
      />

      <LandingThreeDreamOutcomeBlocksSectionV1
        webhookUrl={webhookUrl}
      />

      <LandingSocialProofBlockNum1SectionV1
        webhookUrl={webhookUrl}
      />

      <LandingWhyThisScorecardIsDifferentSectionV1
        webhookUrl={webhookUrl}
      />

      <LandingHowItWorksSectionV1
        webhookUrl={webhookUrl}
      />

      <LandingFAQSectionV1 />

      <LandingFinalCTASectionV1
        webhookUrl={webhookUrl}
      />
    </WindowLayout>
  );
};

export default Page;
