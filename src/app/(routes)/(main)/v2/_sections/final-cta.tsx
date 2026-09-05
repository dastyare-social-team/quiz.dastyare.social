"use client";

import RegistrationForm from "@/components/registration-form";
import SectionWrapper from "@/components/section-wrapper";
import Image from "next/image";

const value_props = [
  "under 5 minutes, quick signup to start",
  "a real diagnosis, not a vague feeling",
  "a ranked list of what to fix first",
];

const LandingFinalCTASectionV2 = () => {
  return (
    <SectionWrapper>
      <div className="max-w-xl pt-5 flex flex-col gap-y-2.5">
        <h3>
          You can't fix a Personal Brand{" "}
          <span className="text-primary">You haven't diagnosed</span>
        </h3>
        <p>
          A few minutes tells you whether your personal brand is healthy enough
          to generate demand — and exactly what to fix if it isn't
        </p>

        <div className="flex flex-col gap-y-1">
          {value_props.map((value, index) => (
            <p key={index}>— {value}</p>
          ))}
        </div>

        <div className="pt-5">
           <RegistrationForm
              primary_cta="Get Your Score — Now"
              cta_location="final-cta"
              leadMagnetWebhookUrl={process.env.LEAD_MAGNET_WEBHOOK_URL || ""}
              scorecardWebhookUrl={process.env.SCORECARD_WEBHOOK_URL || ""}
              workshopWebhookUrl={process.env.WORKSHOP_WEBHOOK_URL || ""}
            />
        </div>
      </div>

      <div
        onContextMenu={(e) => e.preventDefault()}
        className="aspect-3/4 flex-1 bg-primary/[1%] border-2 border-primary/5"
      >
        <Image
          width={588}
          height={588}
          src="/images/sections/final-cta.webp"
          alt=""
          className="px-1 py-1 aspect-3/4 object-cover"
        />
      </div>
    </SectionWrapper>
  );
};

export default LandingFinalCTASectionV2;
