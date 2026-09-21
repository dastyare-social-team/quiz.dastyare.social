"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/button";
import QuestionOption from "@/components/question-option";
import { useRouter, useSearchParams } from "next/navigation";
import { capture, captureException } from "@/lib/posthog";
import {
  getHighlightWords,
  Scorecard as scorecard_model,
  ScoreOption,
  ScoreQuestion,
} from "@/types";

/* —— Helper that now accepts highlight words as parameter —— */
function highlightQuestionText(text: string, highlightWords: string[]) {
  if (!highlightWords.length) return text;

  const escapedWords = highlightWords.map((w) =>
    w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  );
  const regex = new RegExp(`(${escapedWords.join("|")})`, "gi");

  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (regex.test(part)) {
      return (
        <span
          key={index}
          className={
            "text-primary" +
            " bg-primary/8 px-1.5 leading-3 border border-primary/10 rounded-full inline-flex"
          }
        >
          {part}
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

const Scorecard = ({
  scorecard,
  resultsWebhookUrl,
}: {
  scorecard: scorecard_model;
  resultsWebhookUrl?: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const questions = scorecard.questions as ScoreQuestion[];
  const total_questions = questions.length;

  const [current_index, set_current_index] = useState(0);
  const [answers, setAnswers] = useState<(ScoreOption | null)[]>(
    Array(total_questions).fill(null),
  );

  /* —— Compute highlight words for this scorecard —— */
  const highlightWords = useMemo(
    () => getHighlightWords(scorecard),
    [scorecard],
  );

  const currentQuestion = questions[current_index];

  const progress = useMemo(() => {
    return ((current_index + 1) / total_questions) * 100;
  }, [current_index, total_questions]);

  const handle_select_option = (option: ScoreOption) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[current_index] = option;
      return updated;
    });
  };

  const handle_next = () => {
    if (current_index < total_questions - 1) {
      set_current_index((prev) => prev + 1);
    }
  };

  const handle_previous = () => {
    if (current_index > 0) {
      set_current_index((prev) => prev - 1);
    }
  };

  const handle_finish = () => {
    const totalScore = answers.reduce((sum, ans) => sum + (ans?.score ?? 0), 0);

    const band = scorecard.interpretationBands.find(
      (b) => totalScore >= b.range[0] && totalScore <= b.range[1],
    );

    if (!band) {
      console.error("Score band not found");
      return;
    }

    const maxOptionScore = Math.max(
      ...questions.flatMap((q) => q.options.map((o) => o.score)),
    );
    const maxScore = questions.length * maxOptionScore;
    const percent = Math.round((totalScore / maxScore) * 100);
    const variant = scorecard.id.includes("v2") ? "v2" : "v1";

    // Send quiz results to the CRM webhook (fire-and-forget, never blocks).
    if (resultsWebhookUrl) {
      const payload = {
        name: searchParams.get("name") || "",
        email: searchParams.get("email") || "",
        phone: searchParams.get("phone") || "",
        variant,
        score: totalScore,
        max_score: maxScore,
        percent,
        band_slug: band.slug,
        band_title: band.title,
        answers: questions.map((q, i) => ({
          question_id: q.id,
          category: q.category,
          question: q.question,
          selected_label: answers[i]?.label || "",
          selected_score: answers[i]?.score ?? 0,
        })),
      };
      capture("score_quiz_finished", {
        variant,
        score: totalScore,
        percent,
        result: band.slug,
      });
      void fetch(resultsWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch((error) => {
        captureException(error, { context: "quiz_results_webhook" });
      });
    }

    const params = new URLSearchParams({
      score: totalScore.toString(),
      result: band.slug,
    });

    router.push(`${band.redirectUrl}?${params.toString()}`);
  };

  const isFirst = current_index === 0;
  const isLast = current_index === total_questions - 1;
  const isCurrentAnswered = answers[current_index] !== null;

  return (
    <div className="w-full flex justify-center items-center h-full px-5 py-5">
      <div className="flex flex-col gap-y-8 max-w-xl w-full">
        {/* —— PROGRESS BAR —— */}
        <div className="w-full">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[20px]">
              Question — {current_index + 1} / {total_questions}
            </span>
            <span className="text-[18px] text-neutral-500">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full h-0.5 rounded-full bg-secondary/10 overflow-hidden">
            <div
              className={`h-full bg-primary transition-all duration-300`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* —— QUESTION —— */}
        <div className="flex flex-col gap-y-5">
          <div className="leading-relaxed">
            <span className="mr-1">{current_index + 1} —</span>
            {highlightQuestionText(currentQuestion.question, highlightWords)}
          </div>

          {/* —— OPTIONS —— */}
          <div className="flex flex-col gap-y-2">
            {currentQuestion.options.map((option: ScoreOption, _index) => {
              const selected = answers[current_index]?.label === option.label;
              return (
                <QuestionOption
                  key={_index}
                  index={_index}
                  option={option}
                  isSelected={selected}
                  onClick={() => handle_select_option(option)}
                />
              );
            })}
          </div>
        </div>

        {/* —— NAVIGATION BUTTONS —— */}
        <div className="flex gap-x-2 justify-between pt-4 border-t border-secondary/5">
          {!isFirst ? (
            <Button
              onClick={handle_previous}
              className="text-md md:text-lg px-2.5 py-0.5 flex justify-center items-end gap-x-1"
            >
              — / BACK
            </Button>
          ) : (
            <div />
          )}

          <div className="flex-1" />

          {!isLast ? (
            <Button
              onClick={handle_next}
              disabled={!isCurrentAnswered}
              className="text-md md:text-lg px-2.5 py-0.5 flex justify-center items-end gap-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              NEXT / —
            </Button>
          ) : (
            <Button
              onClick={handle_finish}
              disabled={!isCurrentAnswered}
              className="text-md md:text-lg px-2.5 py-0.5 flex justify-center items-end gap-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              FINISH / —
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scorecard;
