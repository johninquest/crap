"use client";

import type { Question, Answer } from "@/lib/assessment/types";
import { Button } from "@/components/ui/Button";

interface QuestionCardProps {
  question: Question;
  selectedOptionId: string | null;
  onSelect: (answer: Answer) => void;
  onNext: () => void;
  isLast: boolean;
  labelChooseAnswer: string;
  labelSeeResults: string;
  labelNextQuestion: string;
}

export function QuestionCard({
  question,
  selectedOptionId,
  onSelect,
  onNext,
  isLast,
  labelChooseAnswer,
  labelSeeResults,
  labelNextQuestion,
}: QuestionCardProps) {
  return (
    <div className="space-y-6">
      {/* Question */}
      <div className="space-y-2">
        <p className="text-xl font-semibold text-[#1F2937] leading-snug">
          {question.text}
        </p>
        {question.hint && (
          <p className="text-sm text-[#6B7280] leading-relaxed">{question.hint}</p>
        )}
      </div>

      {/* Options */}
      <fieldset className="space-y-3">
        <legend className="sr-only">{labelChooseAnswer}</legend>
        {question.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          return (
            <label
              key={opt.id}
              className={`flex items-center gap-4 w-full rounded-xl border-2 px-5 py-4 cursor-pointer transition-all
                ${
                  isSelected
                    ? "border-[#0891B2] bg-[#E0F2FE]"
                    : "border-[#E5E7EB] bg-white hover:border-[#0891B2] hover:bg-[#F0FAFA]"
                }`}
            >
              <input
                type="radio"
                name={question.id}
                value={opt.id}
                checked={isSelected}
                onChange={() =>
                  onSelect({
                    questionId: question.id,
                    optionId: opt.id,
                    riskScore: opt.riskScore,
                  })
                }
                className="sr-only"
              />
              {/* Custom radio indicator */}
              <span
                className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                  ${isSelected ? "border-[#0891B2]" : "border-[#D1D5DB]"}`}
              >
                {isSelected && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0891B2]" />
                )}
              </span>
              <span className="text-base text-[#1F2937] font-medium">{opt.label}</span>
            </label>
          );
        })}
      </fieldset>

      {/* Next */}
      <div className="pt-2">
        <Button
          onClick={onNext}
          disabled={!selectedOptionId}
          fullWidth
          size="lg"
        >
          {isLast ? labelSeeResults : labelNextQuestion}
        </Button>
      </div>
    </div>
  );
}
