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
  const leadMagnetWebhookUrl = process.env.LEAD_MAGNET_WEBHOOK_URL || "";
  const scorecardWebhookUrl = process.env.SCORECARD_WEBHOOK_URL || "";
  const workshopWebhookUrl = process.env.WORKSHOP_WEBHOOK_URL || "";

  return (
    <WindowLayout>
      <LandingHeroSectionV2
        leadMagnetWebhookUrl={leadMagnetWebhookUrl}
        scorecardWebhookUrl={scorecardWebhookUrl}
        workshopWebhookUrl={workshopWebhookUrl}
      />

      <LandingSocialProofBlockNum2SectionV2 />

      <LandingProblemSectionV2
        leadMagnetWebhookUrl={leadMagnetWebhookUrl}
        scorecardWebhookUrl={scorecardWebhookUrl}
        workshopWebhookUrl={workshopWebhookUrl}
      />

      <LandingThreeDreamOutcomeBlocksSectionV2
        leadMagnetWebhookUrl={leadMagnetWebhookUrl}
        scorecardWebhookUrl={scorecardWebhookUrl}
        workshopWebhookUrl={workshopWebhookUrl}
      />

      <LandingSocialProofBlockNum1SectionV1
        leadMagnetWebhookUrl={leadMagnetWebhookUrl}
        scorecardWebhookUrl={scorecardWebhookUrl}
        workshopWebhookUrl={workshopWebhookUrl}
      />

      <LandingWhyThisScorecardIsDifferentSectionV2
        leadMagnetWebhookUrl={leadMagnetWebhookUrl}
        scorecardWebhookUrl={scorecardWebhookUrl}
        workshopWebhookUrl={workshopWebhookUrl}
      />

      <LandingHowItWorksSectionV2
        leadMagnetWebhookUrl={leadMagnetWebhookUrl}
        scorecardWebhookUrl={scorecardWebhookUrl}
        workshopWebhookUrl={workshopWebhookUrl}
      />

      <LandingMeetTheHostSectionV2
        leadMagnetWebhookUrl={leadMagnetWebhookUrl}
        scorecardWebhookUrl={scorecardWebhookUrl}
        workshopWebhookUrl={workshopWebhookUrl}
      />

      <LandingFAQSectionV2 />

      <LandingFinalCTASectionV2
        leadMagnetWebhookUrl={leadMagnetWebhookUrl}
        scorecardWebhookUrl={scorecardWebhookUrl}
        workshopWebhookUrl={workshopWebhookUrl}
      />
    </WindowLayout>
  );
};

export default Page;
