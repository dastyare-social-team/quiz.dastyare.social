import WindowLayout from "@/components/window-layout";
import ConfirmationFeaturedOfferSectionV2 from "../v2/_sections/featured-offer";
import ConfirmationCrossPromoteNum1SectionV2 from "../v2/_sections/cross-promote-num1";
import ConfirmationCrossPromoteNum2SectionV2 from "../v2/_sections/cross-promote-num2";

const Page = () => {
  return (
    <WindowLayout>
      {/* <ConfirmationFeaturedOfferSectionV2 /> */}

      <ConfirmationCrossPromoteNum1SectionV2 />

      <ConfirmationCrossPromoteNum2SectionV2 />
    </WindowLayout>
  );
};

export default Page;
