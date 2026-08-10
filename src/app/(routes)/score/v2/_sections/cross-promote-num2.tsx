"use client";

import { Button } from "@/components/button";
import SectionWrapper from "@/components/section-wrapper";
import Link from "next/link";

const ConfirmationCrossPromoteNum2SectionV2 = () => {
  return (
    <SectionWrapper>
      <div className="flex flex-col flex-1 gap-y-8">
        <div className="flex flex-col gap-y-1.5">
          <h2>Want a place to start today?</h2>
          <p>
            Grab the founder's guide — positioning, content structure, and the
            path from posting to actual demand
          </p>
        </div>

        <Link
          href="https://magnet.dastyare.social"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button>Get My Guide — Now</Button>
        </Link>
      </div>

      <div className="aspect-square flex-1 bg-primary/[1%] border-2 border-primary/5"></div>
    </SectionWrapper>
  );
};

export default ConfirmationCrossPromoteNum2SectionV2;
