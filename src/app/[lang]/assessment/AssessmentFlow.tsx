"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { calculateResult } from "@/lib/assessment/scoring";
import { QuestionCard } from "@/components/assessment/QuestionCard";
import { ProgressBar } from "@/components/assessment/ProgressBar";
import type { Answer, Question } from "@/lib/assessment/types";
import type { Dictionary } from "@/lib/types/dictionary";
import { BRAND } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";

interface AssessmentFlowProps {
  lang: string;
  localizedQuestions: Question[];
  dict: Dictionary;
}

export function AssessmentFlow({ lang, localizedQuestions, dict }: AssessmentFlowProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  const question = localizedQuestions[currentIndex];
  const isLast = currentIndex === localizedQuestions.length - 1;

  function handleSelect(answer: Answer) {
    if (!started) {
      setStarted(true);
      trackEvent("assessment_started", { lang });
    }
    setSelectedOptionId(answer.optionId);
    setAnswers((prev) => {
      const without = prev.filter((a) => a.questionId !== answer.questionId);
      return [...without, answer];
    });
  }

  function handleNext() {
    if (!selectedOptionId) return;

    if (isLast) {
      const result = calculateResult(answers, dict);
      sessionStorage.setItem(BRAND.storageKey, JSON.stringify(result));
      trackEvent("assessment_completed", { lang });
      router.push(`/${lang}/assessment/result`);
    } else {
      setCurrentIndex((i) => i + 1);
      const nextQ = localizedQuestions[currentIndex + 1];
      const existing = answers.find((a) => a.questionId === nextQ.id);
      setSelectedOptionId(existing?.optionId ?? null);
    }
  }

  return (
    <div className="space-y-8">
      <ProgressBar
        current={currentIndex + 1}
        total={localizedQuestions.length}
        labelQuestionOf={dict.assessment.questionOf}
        labelPctComplete={dict.assessment.pctComplete}
      />
      <QuestionCard
        key={question.id}
        question={question}
        selectedOptionId={selectedOptionId}
        onSelect={handleSelect}
        onNext={handleNext}
        isLast={isLast}
        labelChooseAnswer={dict.assessment.chooseAnswer}
        labelSeeResults={dict.assessment.seeResults}
        labelNextQuestion={dict.assessment.nextQuestion}
      />
    </div>
  );
}
