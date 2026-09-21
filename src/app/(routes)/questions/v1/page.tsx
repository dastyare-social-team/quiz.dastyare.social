import { Suspense } from "react";
import Scorecard from "@/components/scorecard";
import { scorecard_v1 } from "@/config/scorecard-v1";

const Page = () => {
  return (
    <Suspense>
      <Scorecard
        scorecard={scorecard_v1}
        resultsWebhookUrl={process.env.SCORE_RESULTS_WEBHOOK_URL || ""}
      />
    </Suspense>
  );
};

export default Page;
