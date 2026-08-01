"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/avatar";
import SectionWrapper from "@/components/section-wrapper";

const LandingSocialProofBlockNum2SectionV1 = () => {
  const avatars = [
    { src: "/images/elon-musk.webp", alt: "@elonmusk", fallback: "EM" },
    { src: "/images/gary-vaynerchuk.webp", alt: "@garyvee", fallback: "GV" },
    { src: "/images/oprah-winfrey.webp", alt: "@oprahwinfrey", fallback: "OW" },
    { src: "/images/taylor-swift.webp", alt: "@taylorswift", fallback: "TS" },
    { src: "/images/justin-welsh.webp", alt: "@justinwelsh", fallback: "JW" },
  ];

  return (
    <SectionWrapper className="justify-center items-center md:pt-10 md:pb-10">
      <div className="max-w-md">
        <AvatarGroup className="justify-center mb-5">
          {avatars.reverse().map((a, index) => (
            <Avatar key={index} size="lg">
              <AvatarImage src={a.src} alt={a.alt} />
              <AvatarFallback>{a.fallback}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>

        <div className="text-center text-[22px] leading-8">
          We didn't guess, We&nbsp;
          <span className="text-primary bg-primary/5">
            studied 127 Personal Brand Campaigns —
          </span>
          &nbsp;Elon Musk and Gary Vee among them — to prove what actually works
        </div>
      </div>
    </SectionWrapper>
  );
};

export default LandingSocialProofBlockNum2SectionV1;
