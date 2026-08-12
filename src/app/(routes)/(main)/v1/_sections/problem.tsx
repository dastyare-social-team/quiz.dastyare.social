"use client";

import RegistrationForm from "@/components/registration-form";
import SectionWrapper from "@/components/section-wrapper";
import Image from "next/image";

const LandingProblemSectionV1 = () => {
  return (
    <SectionWrapper>
      <div className="flex flex-col flex-1 gap-y-8">
        <div className="flex flex-col gap-y-1.5">
          <h2>
            Posting <span className="text-primary">isn't the Same as</span>{" "}
            Healthy Personal Brand
          </h2>
          <p>
            You might be posting consistently. You might even have decent
            numbers. But none of that tells you whether your personal brand is
            actually working — whether it's generating demand, building trust,
            and turning into money, or just sitting there looking busy. A brand
            can look active and still be unhealthy — no clear positioning, no
            path from content to conversion, no compounding effect. Most
            founders have never actually measured which one they have
          </p>
          <p>
            — scorecard measures your brand's actual health — not vanity
            activity — and tells you exactly what's holding back demand
          </p>
        </div>

         <RegistrationForm primary_cta="Get Your Score — Now" cta_location="problem" />
      </div>

      <div
        onContextMenu={(e) => e.preventDefault()}
        className="aspect-3/4 flex-1 bg-primary/[1%] border-2 border-primary/5"
      >
        <Image
          width={588}
          height={588}
          src="/images/sections/problem.webp"
          alt=""
          className="px-1 py-1 aspect-3/4 object-cover"
        />
      </div>
    </SectionWrapper>
  );
};

export default LandingProblemSectionV1;
