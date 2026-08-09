import Scorecard from "@/components/scorecard";
import { scorecard_v1 } from "@/config/scorecard";

const Page = () => {
  return <Scorecard scorecard={scorecard_v1} />;
};

export default Page;
