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
  const leadMagnetWebhookUrl = process.env.LEAD_MAGNET_WEBHOOK_URL || "";
  const scorecardWebhookUrl = process.env.SCORECARD_WEBHOOK_URL || "";
  const workshopWebhookUrl = process.env.WORKSHOP_WEBHOOK_URL || "";

  return (
    <WindowLayout>
      <LandingHeroSectionV1
        leadMagnetWebhookUrl={leadMagnetWebhookUrl}
        scorecardWebhookUrl={scorecardWebhookUrl}
        workshopWebhookUrl={workshopWebhookUrl}
      />

      <LandingSocialProofBlockNum2SectionV1 />

      <LandingProblemSectionV1
        leadMagnetWebhookUrl={leadMagnetWebhookUrl}
        scorecardWebhookUrl={scorecardWebhookUrl}
        workshopWebhookUrl={workshopWebhookUrl}
      />

      <LandingSocialProofBlockNum1SectionV1
        leadMagnetWebhookUrl={leadMagnetWebhookUrl}
        scorecardWebhookUrl={scorecardWebhookUrl}
        workshopWebhookUrl={workshopWebhookUrl}
      />

      <LandingThreeDreamOutcomeBlocksSectionV1
        leadMagnetWebhookUrl={leadMagnetWebhookUrl}
        scorecardWebhookUrl={scorecardWebhookUrl}
        workshopWebhookUrl={workshopWebhookUrl}
      />

      <LandingSocialProofBlockNum1SectionV1
        leadMagnetWebhookUrl={leadMagnetWebhookUrl}
        scorecardWebhookUrl={scorecardWebhookUrl}
        workshopWebhookUrl={workshopWebhookUrl}
      />

      <LandingWhyThisScorecardIsDifferentSectionV1
        leadMagnetWebhookUrl={leadMagnetWebhookUrl}
        scorecardWebhookUrl={scorecardWebhookUrl}
        workshopWebhookUrl={workshopWebhookUrl}
      />

      <LandingHowItWorksSectionV1
        leadMagnetWebhookUrl={leadMagnetWebhookUrl}
        scorecardWebhookUrl={scorecardWebhookUrl}
        workshopWebhookUrl={workshopWebhookUrl}
      />

      <LandingFAQSectionV1 />

      <LandingFinalCTASectionV1
        leadMagnetWebhookUrl={leadMagnetWebhookUrl}
        scorecardWebhookUrl={scorecardWebhookUrl}
        workshopWebhookUrl={workshopWebhookUrl}
      />
    </WindowLayout>
  );
};

export default Page;
