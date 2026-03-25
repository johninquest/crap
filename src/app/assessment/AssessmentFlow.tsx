"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/lib/assessment/questions";
import { calculateResult } from "@/lib/assessment/scoring";
import { QuestionCard } from "@/components/assessment/QuestionCard";
import { ProgressBar } from "@/components/assessment/ProgressBar";
import type { Answer } from "@/lib/assessment/types";

export function AssessmentFlow() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  function handleSelect(answer: Answer) {
    setSelectedOptionId(answer.optionId);
    setAnswers((prev) => {
      const without = prev.filter((a) => a.questionId !== answer.questionId);
      return [...without, answer];
    });
  }

  function handleNext() {
    if (!selectedOptionId) return;

    if (isLast) {
      const result = calculateResult(answers);
      // Store result in sessionStorage for the result page to read
      sessionStorage.setItem("clearrisk_result", JSON.stringify(result));
      router.push("/assessment/result");
    } else {
      setCurrentIndex((i) => i + 1);
      // Pre-fill if the user is going back-and-forth
      const nextQ = questions[currentIndex + 1];
      const existing = answers.find((a) => a.questionId === nextQ.id);
      setSelectedOptionId(existing?.optionId ?? null);
    }
  }

  return (
    <div className="space-y-8">
      <ProgressBar current={currentIndex + 1} total={questions.length} />
      <QuestionCard
        key={question.id}
        question={question}
        selectedOptionId={selectedOptionId}
        onSelect={handleSelect}
        onNext={handleNext}
        isLast={isLast}
      />
    </div>
  );
}
