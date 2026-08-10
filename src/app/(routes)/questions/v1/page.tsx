import Scorecard from "@/components/scorecard";
import { scorecard_v1 } from "@/config/scorecard-v1";

const Page = () => {
  return <Scorecard scorecard={scorecard_v1} />;
};

export default Page;
