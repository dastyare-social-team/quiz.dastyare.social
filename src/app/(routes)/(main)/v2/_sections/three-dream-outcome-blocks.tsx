"use client";

import RegistrationForm from "@/components/registration-form";
import SectionWrapper from "@/components/section-wrapper";

const LandingThreeDreamOutcomeBlocksSectionV2 = () => {
  return (
    <>
      <SectionWrapper className="md:flex-row-reverse">
        <div className="flex flex-col flex-1 gap-y-8">
          <div className="flex flex-col gap-y-1.5">
            <p className="text-[20px]">A Real Diagnosis, Not a Vague Feeling</p>
            <h2>Know if Your Personal Brand is Actually Healthy</h2>
            <p>
              Most founders have a gut sense sth's off but no way to name it.
              You'll get a specific health score across the dimensions that
              actually drive demand — positioning, consistency, conversion path,
              and more
            </p>
          </div>

          <RegistrationForm primary_cta="Get Your Score — Now" />
        </div>

        <div className="aspect-square flex-1 bg-primary/[1%] border-2 border-primary/5"></div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="flex flex-col flex-1 gap-y-8">
          <div className="flex flex-col gap-y-1.5">
            <p className="text-[20px]">A Breakdown, Not Just a Grade</p>
            <h2>See Exactly What's Suppressing Demand</h2>
            <p>
              The score isn't a single number in a vacuum — you'll see which
              specific areas (clarity of positioning, content-to-offer path,
              platform reliance) are holding your brand back from generating
              real demand
            </p>
          </div>

          <RegistrationForm primary_cta="Get Your Score — Now" />
        </div>

        <div className="aspect-square flex-1 bg-primary/[1%] border-2 border-primary/5"></div>
      </SectionWrapper>

      <SectionWrapper className="md:flex-row-reverse">
        <div className="flex flex-col flex-1 gap-y-8">
          <div className="flex flex-col gap-y-1.5">
            <p className="text-[20px]">A Next Step, Not Just a Report</p>
            <h2>Get a Ranked List of What to Fix First</h2>
            <p>
              No generic advice. You'll leave with a prioritized list based on
              your specific score — the highest-leverage fix first, the one most
              likely to turn activity into money
            </p>
          </div>

          <RegistrationForm primary_cta="Get Your Score — Now" />
        </div>

        <div className="aspect-square flex-1 bg-primary/[1%] border-2 border-primary/5"></div>
      </SectionWrapper>
    </>
  );
};

export default LandingThreeDreamOutcomeBlocksSectionV2;
