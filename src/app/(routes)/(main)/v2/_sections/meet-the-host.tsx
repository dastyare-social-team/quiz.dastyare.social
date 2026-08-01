"use client";

import RegistrationForm from "@/components/registration-form";
import SectionWrapper from "@/components/section-wrapper";

const LandingMeetTheHostSectionV2 = () => {
  return (
    <SectionWrapper>
      <div className="max-w-xl pt-5 flex flex-col gap-y-2.5">
        <h3>
          Built by a Founder
          <span className="text-primary">&nbsp;Who diagnosed his own</span>
          &nbsp;brand first
        </h3>
        <p>
          Before this was a scorecard, it was a question I asked myself — is my
          brand actually healthy, or just busy? The honest answer, for a long
          time, was "just busy." This is the framework I built to measure it
          properly — and then fix it, on my own brand, before turning it into
          something you can run on yours
        </p>

        <div className="pt-5">
          <RegistrationForm primary_cta="Get Your Score — Now" />
        </div>
      </div>

      <div className="aspect-square flex-1 bg-primary/[1%] border-2 border-primary/5"></div>
    </SectionWrapper>
  );
};

export default LandingMeetTheHostSectionV2;
