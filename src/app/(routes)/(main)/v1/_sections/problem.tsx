"use client";

import RegistrationForm from "@/components/registration-form";
import SectionWrapper from "@/components/section-wrapper";

const LandingProblemSectionV1 = () => {
  return (
    <SectionWrapper>
      <div className="flex flex-col flex-1 gap-y-8">
        <div className="flex flex-col gap-y-1.5">
          <h2>
            You Built sth real
            <span className="text-primary"> — But Your Personal Brand</span> is
            three random Posts and a Stalled LinkedIn
          </h2>
          <p>
            You know how to build. You don't know what to post, how often, or
            why any of it should turn into a sale
          </p>
        </div>

        <RegistrationForm primary_cta="Save My Seat — Now" />
      </div>

      <div className="aspect-square flex-1 bg-primary/[1%] border-2 border-primary/5">
        {/* —— IMG —— */}
      </div>
    </SectionWrapper>
  );
};

export default LandingProblemSectionV1;
