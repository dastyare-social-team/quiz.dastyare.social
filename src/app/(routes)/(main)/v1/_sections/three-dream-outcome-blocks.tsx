"use client";

import RegistrationForm from "@/components/registration-form";
import SectionWrapper from "@/components/section-wrapper";

const LandingThreeDreamOutcomeBlocksSectionV1 = () => {
  return (
    <>
      <SectionWrapper className="md:flex-row-reverse">
        <div className="flex flex-col flex-1 gap-y-8">
          <div className="flex flex-col gap-y-1.5">
            <p className="text-[20px]">
              A Content System, Not a Content Calendar
            </p>
            <h2>Know Exactly What to Post and Why</h2>
            <p>
              You'll leave with a repeatable framework for what to say, built
              around your actual expertise — not generic "engagement" advice
              that works for influencers and not for founders
            </p>
          </div>

          <RegistrationForm primary_cta="Save My Seat — Now" />
        </div>

        <div className="aspect-square flex-1 bg-primary/[1%] border-2 border-primary/5"></div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="flex flex-col flex-1 gap-y-8">
          <div className="flex flex-col gap-y-1.5">
            <p className="text-[20px]">A Campaign, Not Just Content</p>
            <h2>Turn Posts into a Campaign with a Beginning and an End</h2>
            <p>
              Content in isolation doesn't sell. You'll learn how to structure a
              campaign — a start, a build, a call to action — so your posting
              actually leads somewhere instead of disappearing into the feed
            </p>
          </div>

          <RegistrationForm primary_cta="Save My Seat — Now" />
        </div>

        <div className="aspect-square flex-1 bg-primary/[1%] border-2 border-primary/5"></div>
      </SectionWrapper>

      <SectionWrapper className="md:flex-row-reverse">
        <div className="flex flex-col flex-1 gap-y-8">
          <div className="flex flex-col gap-y-1.5">
            <p className="text-[20px]">A System You Can Run Yourself</p>
            <h2>No Agency, No Ad Budget Required</h2>
            <p>
              Everything taught is built to run solo, with the tools you already
              have. You're not being sold a dependency — you're being taught a
              skill
            </p>
          </div>

          <RegistrationForm primary_cta="Save My Seat — Now" />
        </div>

        <div className="aspect-square flex-1 bg-primary/[1%] border-2 border-primary/5"></div>
      </SectionWrapper>
    </>
  );
};

export default LandingThreeDreamOutcomeBlocksSectionV1;
