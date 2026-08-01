import SectionWrapper from "@/components/section-wrapper";
import { getTranslations } from "next-intl/server";
import { CrownIcon } from "lucide-react";
import RegistrationForm from "@/components/registration-form";

const LandingWhyThisScorecardIsDifferentSectionV2 = async () => {
  const t = await getTranslations("why_this_scorecard_different");

  return (
    <SectionWrapper className="flex flex-1 justify-center items-center">
      <div className="flex flex-col gap-y-8 items-center">
        <div className="flex flex-col text-center max-w-xl gap-y-2.5 items-center">
          <h2 className="text-center">
            Why This Scorecard{" "}
            <span className="text-primary bg-primary/5">is different</span>
          </h2>
          <p>Not Another Vanity "Brand Audit"</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-5 mt-5">
          {/* —— ROW #1 — COL #1 —— */}
          <div className="flex flex-col col-span-1 h-min gap-y-3 rounded-3xl border border-primary/5 bg-primary/[1%] px-5 py-4.5">
            <CrownIcon className="text-primary" />{" "}
            <h5 className="leading-tight text-secondary">
              <span className="text-primary bg-primary/5">reason one —</span>{" "}
              Measures Health, Not Vanity Metrics
            </h5>
            <span className="leading-8 text-secondary/80 text-[22px]">
              Positioning, consistency, and conversion path, not just follower
              count
            </span>
          </div>

          {/* —— ROW #1 — COL #2 —— */}
          <div className="flex flex-col col-span-1 h-min gap-y-3 rounded-3xl border border-primary/5 bg-primary/[1%] px-5 py-4.5">
            <CrownIcon className="text-primary" />{" "}
            <h5 className="leading-tight text-secondary">
              <span className="text-primary bg-primary/5">reason two —</span>{" "}
              Quick Start, No Per-Question Gates
            </h5>
            <span className="leading-8 text-secondary/80 text-[22px]">
              Just name and email to start. No additional gates once you're in
            </span>
          </div>

          {/* —— ROW #1 — COL #3 —— */}
          <div className="flex flex-col col-span-1 h-min gap-y-3 rounded-3xl border border-primary/5 bg-primary/[1%] px-5 py-4.5">
            <CrownIcon className="text-primary" />{" "}
            <h5 className="leading-tight text-secondary">
              <span className="text-primary bg-primary/5">reason three —</span>{" "}
              Built for Founders
            </h5>
            <span className="leading-8 text-secondary/80 text-[22px]">
              Not influencers chasing engagement
            </span>
          </div>

          {/* —— ROW #2 — COL #1 —— */}
          <div className="flex flex-col col-span-1 h-min gap-y-3 rounded-3xl border border-primary/5 bg-primary/[1%] px-5 py-4.5">
            <CrownIcon className="text-primary" />{" "}
            <h5 className="leading-tight text-secondary">
              <span className="text-primary bg-primary/5">reason four —</span> A
              Ranked Fix-List, Not a Grade
            </h5>
            <span className="leading-8 text-secondary/80 text-[22px]">
              You leave knowing exactly what to fix first
            </span>
          </div>

          {/* —— ROW #2 — COL #2 —— */}
          <div className="flex flex-col col-span-1 h-min gap-y-3 rounded-3xl border border-primary/5 bg-primary/[1%] px-5 py-4.5">
            <CrownIcon className="text-primary" />{" "}
            <h5 className="leading-tight text-secondary">
              <span className="text-primary bg-primary/5">reason five —</span>{" "}
              5-8 Minutes
            </h5>
            <span className="leading-8 text-secondary/80 text-[22px]">
              Not a 40-question audit that never gets finished
            </span>
          </div>

          {/* —— ROW #2 — COL #3 —— */}
          <div className="flex flex-col col-span-1 h-min gap-y-3 rounded-3xl border border-primary/5 bg-primary/[1%] px-5 py-4.5">
            <CrownIcon className="text-primary" />{" "}
            <h5 className="leading-tight text-secondary">
              <span className="text-primary bg-primary/5">reason six —</span>{" "}
              Built from Firsthand Experience
            </h5>
            <span className="leading-8 text-secondary/80 text-[22px]">
              Made by someone who diagnosed and fixed his own brand's health
              first
            </span>
          </div>
        </div>

        <RegistrationForm primary_cta="Get Your Score — Now" />
      </div>
    </SectionWrapper>
  );
};

export default LandingWhyThisScorecardIsDifferentSectionV2;
