"use client";

import { Button } from "@/components/button";
import SectionWrapper from "@/components/section-wrapper";
import Link from "next/link";

const ConfirmationCrossPromoteNum1SectionV2 = () => {
  return (
    <SectionWrapper className="md:flex-row-reverse">
      <div className="flex flex-col flex-1 gap-y-8">
        <div className="flex flex-col gap-y-1.5">
          <h2>Not sure where your brand stands yet? Find out in 5 minutes</h2>
          <p>
            Before the workshop, get a quick read on your Personal Brand Health
            Score — no requirements required to take it
          </p>
        </div>

        <Link
          href="https://quiz.dastyare.social"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button>Get My Score — Now</Button>
        </Link>
      </div>

      <div className="aspect-square flex-1 bg-primary/[1%] border-2 border-primary/5"></div>
    </SectionWrapper>
  );
};

export default ConfirmationCrossPromoteNum1SectionV2;
