"use client";

import RegistrationForm from "@/components/registration-form";
import SectionWrapper from "@/components/section-wrapper";
import Image from "next/image";

const LandingThreeDreamOutcomeBlocksSectionV2 = ({
  webhookUrl,
}: {
  webhookUrl?: string;
}) => {
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

           <RegistrationForm
              primary_cta="Get Your Score — Now"
              cta_location="three-dream-outcome"
          webhookUrl={webhookUrl}
            />
        </div>

        <div
          onContextMenu={(e) => e.preventDefault()}
          className="aspect-3/4 flex-1 bg-primary/[1%] border-2 border-primary/5"
        >
          <Image
            width={588}
            height={588}
            src="/images/sections/benefit-block-num-1.webp"
            alt=""
            className="px-1 py-1 aspect-3/4 object-cover"
          />
        </div>
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

           <RegistrationForm
              primary_cta="Get Your Score — Now"
              cta_location="three-dream-outcome"
          webhookUrl={webhookUrl}
            />
        </div>

        <div
          onContextMenu={(e) => e.preventDefault()}
          className="aspect-3/4 flex-1 bg-primary/[1%] border-2 border-primary/5"
        >
          <Image
            width={588}
            height={588}
            src="/images/sections/benefit-block-num-2.webp"
            alt=""
            className="px-1 py-1 aspect-3/4 object-cover"
          />
        </div>
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

           <RegistrationForm
              primary_cta="Get Your Score — Now"
              cta_location="three-dream-outcome"
          webhookUrl={webhookUrl}
            />
        </div>

        <div
          onContextMenu={(e) => e.preventDefault()}
          className="aspect-3/4 flex-1 bg-primary/[1%] border-2 border-primary/5"
        >
          <Image
            width={588}
            height={588}
            src="/images/sections/benefit-block-num-3.webp"
            alt=""
            className="px-1 py-1 aspect-3/4 object-cover"
          />
        </div>
      </SectionWrapper>
    </>
  );
};

export default LandingThreeDreamOutcomeBlocksSectionV2;
