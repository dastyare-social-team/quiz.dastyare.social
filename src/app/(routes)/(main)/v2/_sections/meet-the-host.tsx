"use client";

import RegistrationForm from "@/components/registration-form";
import SectionWrapper from "@/components/section-wrapper";
import Image from "next/image";

const LandingMeetTheHostSectionV2 = ({
  leadMagnetWebhookUrl = "",
  scorecardWebhookUrl = "",
  workshopWebhookUrl = "",
}: {
  leadMagnetWebhookUrl?: string;
  scorecardWebhookUrl?: string;
  workshopWebhookUrl?: string;
}) => {
  return (
    <SectionWrapper>
      <div className="max-w-xl pt-5 flex flex-col gap-y-2.5">
        <h3>
          Built by a Founder
          <span className="text-primary">&nbsp;Who diagnosed his own</span>
          &nbsp;brand first
        </h3>
        <p>
          Before this was a scorecard, it was a question I asked myself — is my
          brand actually healthy, or just busy? The honest answer, for a long
          time, was "just busy." This is the framework I built to measure it
          properly — and then fix it, on my own brand, before turning it into
          something you can run on yours
        </p>

        <div className="pt-5">
           <RegistrationForm
              primary_cta="Get Your Score — Now"
              cta_location="meet-the-host"
          leadMagnetWebhookUrl={leadMagnetWebhookUrl}
          scorecardWebhookUrl={scorecardWebhookUrl}
          workshopWebhookUrl={workshopWebhookUrl}
            />
        </div>
      </div>

      <div
        onContextMenu={(e) => e.preventDefault()}
        className="aspect-3/4 flex-1 bg-primary/[1%] border-2 border-primary/5"
      >
        <Image
          width={588}
          height={588}
          src="/images/sections/meet-the-host.webp"
          alt=""
          className="px-1 py-1 aspect-3/4 object-cover"
        />
      </div>
    </SectionWrapper>
  );
};

export default LandingMeetTheHostSectionV2;
