"use client";

import RegistrationForm from "@/components/registration-form";
import SectionWrapper from "@/components/section-wrapper";

const value_props = [
  "no cost to attend, no card required",
  "a campaign system, not just content tips",
  "Live Q&A on your actual brand",
];

const LandingFinalCTASectionV1 = () => {
  return (
    <SectionWrapper className="justify-center items-center">
      <div className="max-w-xl text-center pt-5 flex flex-col gap-y-2.5 items-center">
        <h3>
          Seats Are LIMITED
          <span className="text-primary">
            &nbsp;— Your Invisibility Problem
          </span>
          &nbsp;isn't going Anywhere on its OWN
        </h3>
        <p>
          You already know how to build. This is the missing half — get it in
          one session, and start running it the same week
        </p>

        <div className="flex flex-col gap-y-1">
          {value_props.map((value, index) => (
            <p key={index}>— {value}</p>
          ))}
        </div>

        <div className="pt-5">
          <RegistrationForm primary_cta="Save My Seat — Now" />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default LandingFinalCTASectionV1;
