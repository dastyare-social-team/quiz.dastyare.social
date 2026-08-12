"use client";

import RegistrationForm from "@/components/registration-form";
import SectionWrapper from "@/components/section-wrapper";
import Image from "next/image";

const LandingHeroSectionV2 = () => {
  return (
    <SectionWrapper className="md:pt-0 border-0">
      <div className="flex flex-col flex-1 gap-y-8">
        <div className="flex flex-col gap-y-1.5">
          <p className="text-[20px]">
            Are You Ready to Know Your Personal Brand's Status?
          </p>
          <h2>
            Stop Guessing Whether Your Personal Brand is Working{" "}
            <span className="text-primary">
              — No More Posting without Knowing
            </span>{" "}
            if it's Actually Healthy
          </h2>
          <div className="flex flex-col gap-y-1">
            A scorecard that tells you whether your Personal Brand is healthy
            enough to generate demand and make money — or quietly stalling —
            Takes under 5 minutes
          </div>
        </div>

        <div className="flex flex-col gap-y-2.5">
           <RegistrationForm primary_cta="Get Your Score — Now" cta_location="hero" />

          <div className="text-[18px] opacity-80 leading-6.5">
            under 5 minutes, quick start, straight into your assessment
          </div>
        </div>
      </div>

      <div
        onContextMenu={(e) => e.preventDefault()}
        className="aspect-3/4 flex-1 bg-primary/[1%] border-2 border-primary/5"
      >
        <Image
          width={588}
          height={588}
          src="/images/sections/hero.webp"
          loading="eager"
          alt=""
          className="px-1 py-1 aspect-3/4 object-cover"
        />
      </div>
    </SectionWrapper>
  );
};

export default LandingHeroSectionV2;
