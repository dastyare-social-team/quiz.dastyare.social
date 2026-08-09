"use client";

import WindowLayout from "@/components/window-layout";
import ConfirmationFeaturedOfferSectionV1 from "./_sections/featured-offer";
import ConfirmationCrossPromoteNum1SectionV1 from "./_sections/cross-promote-num1";
import ConfirmationCrossPromoteNum2SectionV1 from "./_sections/cross-promote-num2";

const Page = () => {
  return (
    <WindowLayout>
      {/* <ConfirmationFeaturedOfferSectionV1 /> */}

      <ConfirmationCrossPromoteNum1SectionV1 />

      <ConfirmationCrossPromoteNum2SectionV1 />
    </WindowLayout>
  );
};

export default Page;
