"use client";

import RegistrationForm from "@/components/registration-form";
import SectionWrapper from "@/components/section-wrapper";

const LandingSocialProofBlockNum1SectionV2 = () => {
  return (
    <SectionWrapper className="justify-center items-center md:pt-10 md:pb-10">
      <div className="flex flex-col gap-y-8 max-w-md items-center">
        <div className="text-center">
          built from&nbsp;
          <span className="text-primary bg-primary/5">
            Studying 127 Personal Brand Campaigns — including
          </span>
          &nbsp;Elon Musk, Gary Vee, and others — to find the patterns&nbsp;
          <span className="text-primary bg-primary/5">
            that actually drive demand,
          </span>
          &nbsp; not just more views
        </div>

        <RegistrationForm primary_cta="Save My Seat — Now" />
      </div>
    </SectionWrapper>
  );
};

export default LandingSocialProofBlockNum1SectionV2;
