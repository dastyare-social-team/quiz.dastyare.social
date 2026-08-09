import Scorecard from "@/components/scorecard";
import { scorecard_v2 } from "@/config/scorecard";

const Page = () => {
  return <Scorecard scorecard={scorecard_v2} />;
};

export default Page;
