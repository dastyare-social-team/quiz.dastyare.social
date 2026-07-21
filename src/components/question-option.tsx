"use client";

import { ScoreOption } from "@/config/scorecard";
import { cn } from "@/lib/utils";

const QuestionOption = ({
  index,
  option,
  isSelected = false,
  onClick,
}: {
  index: number;
  option: ScoreOption;
  isSelected?: boolean,
  onClick?: VoidFunction
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex sm:justify-center items-center px-2.5 py-1 text-start sm:text-center rounded-xl sm:rounded-full border border-secondary/3 hover:bg-primary/3 hover:border-primary/3 hover:text-primary opacity-80 cursor-pointer select-none",
        isSelected && "bg-primary/5 border-primary/5 text-primary"
      )}
    >
      {index + 1} — {option.label}
    </div>
  );
};

export default QuestionOption;
