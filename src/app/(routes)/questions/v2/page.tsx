import { Suspense } from "react";
import Scorecard from "@/components/scorecard";
import { scorecard_v2 } from "@/config/scorecard-v2";

const Page = () => {
  return (
    <Suspense>
      <Scorecard
        scorecard={scorecard_v2}
        resultsWebhookUrl={process.env.SCORE_RESULTS_WEBHOOK_URL || ""}
      />
    </Suspense>
  );
};

export default Page;
