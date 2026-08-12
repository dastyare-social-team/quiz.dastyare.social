"use client";

import RegistrationForm from "@/components/registration-form";
import SectionWrapper from "@/components/section-wrapper";
import { FootprintsIcon } from "lucide-react";

const LandingHowItWorksSectionV1 = () => {
  return (
    <SectionWrapper className="justify-center items-center">
      <div className="flex flex-col gap-y-8 items-center">
        <div className="flex flex-col max-w-xl gap-y-2.5 items-center">
          <h2 className="text-center">
            What the Scorecard{" "}
            <span className="text-primary bg-primary/5">Actually Measures</span>
          </h2>
        </div>

         <RegistrationForm primary_cta="Get Your Score — Now" cta_location="how-it-works" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-5 mt-5">
          {/* —— COL #1 —— */}
          <div className="flex flex-col col-span-1 h-min gap-y-3 rounded-3xl border border-primary/5 bg-primary/[1%] px-5 py-4.5">
            <FootprintsIcon className="text-primary" />{" "}
            <h5 className="leading-tight text-secondary">
              <span className="text-primary bg-primary/5">Step 1 —</span> Answer
              a Few Honest Questions
            </h5>
            <span className="leading-8 text-secondary/80 text-[22px]">
              About your positioning, your content, and how it currently
              connects (or doesn't) to actual demand
            </span>
          </div>

          {/* —— COL #2 —— */}
          <div className="flex flex-col col-span-1 h-min gap-y-3 rounded-3xl border border-primary/5 bg-primary/[1%] px-5 py-4.5">
            <FootprintsIcon className="text-primary" />{" "}
            <h5 className="leading-tight text-secondary">
              <span className="text-primary bg-primary/5">Step 2 —</span> Get
              your Health Score
            </h5>
            <span className="leading-8 text-secondary/80 text-[22px]">
              A single number, 0–100, with a breakdown by category
            </span>
          </div>

          {/* —— COL #3 —— */}
          <div className="flex flex-col col-span-1 h-min gap-y-3 rounded-3xl border border-primary/5 bg-primary/[1%] px-5 py-4.5">
            <FootprintsIcon className="text-primary" />{" "}
            <h5 className="leading-tight text-secondary">
              <span className="text-primary bg-primary/5">Step 3 —</span> See
              What to Fix First
            </h5>
            <span className="leading-8 text-secondary/80 text-[22px]">
              A ranked, specific list — not generic advice
            </span>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default LandingHowItWorksSectionV1;
