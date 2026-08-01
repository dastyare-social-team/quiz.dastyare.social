"use client";

import RegistrationForm from "@/components/registration-form";
import SectionWrapper from "@/components/section-wrapper";

const value_props = [
  "what to actually post, so strangers become an audience",
  "how to turn that audience into a campaign, not just content",
  "how to run it without a marketing team or a media budget",
];

const LandingHeroSectionV1 = () => {
  return (
    <SectionWrapper className="md:pt-0 border-0">
      <div className="flex flex-col flex-1 gap-y-8">
        <div className="flex flex-col gap-y-1.5">
          <p className="text-[20px]">
            Build a Personal Brand that Actually Sells Your Products
          </p>
          <h2>
            Stop Posting and Hoping{" "}
            <span className="text-primary">— No More Content with No Plan</span>{" "}
            behind it
          </h2>
          <div className="flex flex-col gap-y-1">
            A hands-on workshop for founders who can build products but can't
            get anyone to notice it. You'll leave with a working personal brand
            and a campaign structure you can run the same week — Limited seats
          </div>
          <div className="flex flex-col gap-y-1">
            {value_props.map((value, index) => (
              <p key={index}>— {value}</p>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-y-2.5">
          <RegistrationForm primary_cta="Save My Seat — Now" />

          <div className="text-[18px] opacity-80 leading-6.5">
            no credit card required, seats limited, live Q&A included
          </div>
        </div>
      </div>

      <div className="aspect-square flex-1 bg-primary/[1%] border-2 border-primary/5"></div>
    </SectionWrapper>
  );
};

export default LandingHeroSectionV1;
