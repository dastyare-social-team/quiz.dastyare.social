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
            What the Workshop{" "}
            <span className="text-primary bg-primary/5">
              Actually Looks Like
            </span>
          </h2>
        </div>

        <RegistrationForm primary_cta="Save My Seat — Now" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-5 mt-5">
          {/* —— COL #1 —— */}
          <div className="flex flex-col col-span-1 h-min gap-y-3 rounded-3xl border border-primary/5 bg-primary/[1%] px-5 py-4.5">
            <FootprintsIcon className="text-primary" />{" "}
            <h5 className="leading-tight text-secondary">
              <span className="text-primary bg-primary/5">Step 1 —</span> Save
              Your Seat before it Fills Up
            </h5>
            <span className="leading-8 text-secondary/80 text-[22px]">
              Takes 30 seconds, no credit card. You'll get the live link and a
              reminder before it starts
            </span>
          </div>

          {/* —— COL #2 —— */}
          <div className="flex flex-col col-span-1 h-min gap-y-3 rounded-3xl border border-primary/5 bg-primary/[1%] px-5 py-4.5">
            <FootprintsIcon className="text-primary" />{" "}
            <h5 className="leading-tight text-secondary">
              <span className="text-primary bg-primary/5">Step 2 —</span> Show
              Up (or Watch the Replay)
            </h5>
            <span className="leading-8 text-secondary/80 text-[22px]">
              Live on Wednesday, 60–90 minutes. Can't make it live? The replay
              is up Thursday and Friday
            </span>
          </div>

          {/* —— COL #3 —— */}
          <div className="flex flex-col col-span-1 h-min gap-y-3 rounded-3xl border border-primary/5 bg-primary/[1%] px-5 py-4.5">
            <FootprintsIcon className="text-primary" />{" "}
            <h5 className="leading-tight text-secondary">
              <span className="text-primary bg-primary/5">Step 3 —</span> Leave
              with a System, Not Notes
            </h5>
            <span className="leading-8 text-secondary/80 text-[22px]">
              You'll walk out with a content and campaign framework you can
              start running that same week
            </span>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default LandingHowItWorksSectionV1;
