"use client";

import RegistrationForm from "@/components/registration-form";
import SectionWrapper from "@/components/section-wrapper";

const value_props = [
  "see your Personal Brand Health Score in under 5 minutes",
  "find out if you're generating real demand or just posting into the void",
  "get a specific, ranked list of what to fix first",
];

const LandingHeroSectionV1 = () => {
  return (
    <SectionWrapper className="md:pt-0 border-0">
      <div className="flex flex-col flex-1 gap-y-8">
        <div className="flex flex-col gap-y-1.5">
          <p className="text-[20px]">
            Are You Ready to Know Your Personal Brand's Status?
          </p>
          <h2>
            Stop Guessing Whether Your Personal Brand is Working <span className="text-primary">— No More Posting without Knowing</span> if it's Actually Healthy
          </h2>
          <div className="flex flex-col gap-y-1">
            A scorecard that tells you whether your Personal Brand is healthy enough to generate demand and make money — or quietly stalling — Takes under 5 minutes
          </div>
          <div className="flex flex-col gap-y-1">
            {value_props.map((value, index) => (
              <p key={index}>— {value}</p>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-y-2.5">
          <RegistrationForm primary_cta="Get Your Score — Now" />

          <div className="text-[18px] opacity-80 leading-6.5">
            under 5 minutes, quick start, straight into your assessment
          </div>
        </div>
      </div>

      <div className="aspect-square flex-1 bg-primary/[1%] border-2 border-primary/5"></div>
    </SectionWrapper>
  );
};

export default LandingHeroSectionV1;
