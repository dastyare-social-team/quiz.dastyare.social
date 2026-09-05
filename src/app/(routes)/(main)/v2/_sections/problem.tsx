"use client";

import RegistrationForm from "@/components/registration-form";
import SectionWrapper from "@/components/section-wrapper";

const LandingProblemSectionV2 = () => {
  return (
    <SectionWrapper className="justify-center">
      <div className="flex flex-col flex-1 items-center gap-y-8">
        <div className="flex flex-col items-center text-center gap-y-1.5">
          <h2 className="max-w-xl">
            Posting <span className="text-primary">isn't the Same as</span>{" "}
            Healthy Personal Brand
          </h2>
          <p className="max-w-2xl">
            You might be posting consistently. You might even have decent
            numbers. But none of that tells you whether your personal brand is
            actually working — whether it's generating demand, building trust,
            and turning into money, or just sitting there looking busy. A brand
            can look active and still be unhealthy — no clear positioning, no
            path from content to conversion, no compounding effect. Most
            founders have never actually measured which one they have
          </p>
          <p className="max-w-2xl">
            — scorecard measures your brand's actual health — not vanity
            activity — and tells you exactly what's holding back demand
          </p>
        </div>

         <RegistrationForm
            primary_cta="Get Your Score — Now"
            cta_location="problem"
            leadMagnetWebhookUrl={process.env.LEAD_MAGNET_WEBHOOK_URL || ""}
            scorecardWebhookUrl={process.env.SCORECARD_WEBHOOK_URL || ""}
            workshopWebhookUrl={process.env.WORKSHOP_WEBHOOK_URL || ""}
          />
      </div>
    </SectionWrapper>
  );
};

export default LandingProblemSectionV2;
