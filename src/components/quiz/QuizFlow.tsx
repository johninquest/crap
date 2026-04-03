"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { QuizAnswer, LocalizedQuiz } from "@/lib/quiz/types";
import type { Dictionary } from "@/lib/types/dictionary";
import { calculateQuizResult } from "@/lib/quiz/scoring";
import { getCategoryIcons } from "@/lib/quiz/registry";
import { ProgressBar } from "@/components/assessment/ProgressBar";
import { trackEvent } from "@/lib/analytics";

// ── Helpers ──────────────────────────────────────────────────────────────────

function getQuizSectionDict(localizedQuiz: LocalizedQuiz, dict: Dictionary) {
  const id = localizedQuiz.definition.id;
  const map = {
    nis2:        dict.quiz.nis2,
    gdpr:        dict.quiz.gdpr,
    "ai-check":  dict.quiz.aiCheck,
  } as const;
  return map[id];
}

// ── QuizFlow ─────────────────────────────────────────────────────────────────

interface QuizFlowProps {
  lang: string;
  localizedQuiz: LocalizedQuiz;
  dict: Dictionary;
}

export function QuizFlow({ lang, localizedQuiz, dict }: QuizFlowProps) {
  const router = useRouter();
  const { definition, questions } = localizedQuiz;
  const c = dict.quiz.common;
  const quizDict = getQuizSectionDict(localizedQuiz, dict);
  const accent = definition.accentColor;

  const [phase, setPhase] = useState<"intro" | "quiz">("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const question = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  function handleStart() {
    setPhase("quiz");
    trackEvent(`${definition.id}_started`, { lang });
  }

  function handleSelect(optionId: string, riskScore: number) {
    setSelectedOptionId(optionId);
    setAnswers((prev) => {
      const without = prev.filter((a) => a.questionId !== question.id);
      return [...without, { questionId: question.id, optionId, riskScore }];
    });
  }

  function handleNext() {
    if (!selectedOptionId) return;

    if (isLast) {
      const categoryIcons = getCategoryIcons(definition.id);
      const result = calculateQuizResult(
        definition.id,
        questions,
        categoryIcons,
        answers,
        localizedQuiz.categoryLabels
      );
      sessionStorage.setItem(definition.storageKey, JSON.stringify(result));
      trackEvent(`${definition.id}_completed`, { lang });
      router.push(`/${lang}/${definition.slug}/result`);
    } else {
      const nextQ = questions[currentIndex + 1];
      const existing = answers.find((a) => a.questionId === nextQ.id);
      setSelectedOptionId(existing?.optionId ?? null);
      setCurrentIndex((i) => i + 1);
    }
  }

  // ── Intro phase ─────────────────────────────────────────────────────────────

  if (phase === "intro") {
    return (
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 space-y-6">
        <p className="text-[#374151] leading-relaxed">{quizDict.description}</p>
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] bg-[#F3F4F6] rounded-full px-3 py-1">
            📋 {quizDict.questionCount}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] bg-[#F3F4F6] rounded-full px-3 py-1">
            ⏱ {quizDict.estimatedTime}
          </span>
        </div>
        <button
          onClick={handleStart}
          className="w-full rounded-xl px-6 py-4 text-base font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{ backgroundColor: accent, outlineColor: accent }}
        >
          {c.start}
        </button>
        <p className="text-xs text-center text-[#9CA3AF]">
          No account required · No personal data collected
        </p>
      </div>
    );
  }

  // ── Quiz phase ───────────────────────────────────────────────────────────────

  const borderSelected = accent;
  const bgSelected = `${accent}15`;

  return (
    <div className="space-y-8">
      <ProgressBar
        current={currentIndex + 1}
        total={questions.length}
        labelQuestionOf={c.questionOf}
        labelPctComplete={c.pctComplete}
      />

      <div className="space-y-6">
        {/* Question text */}
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
          <legend className="sr-only">{c.chooseAnswer}</legend>
          {question.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            return (
              <label
                key={opt.id}
                className="flex items-center gap-4 w-full rounded-xl border-2 px-5 py-4 cursor-pointer transition-all"
                style={
                  isSelected
                    ? { borderColor: borderSelected, backgroundColor: bgSelected }
                    : undefined
                }
                data-state={isSelected ? "selected" : "idle"}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={opt.id}
                  checked={isSelected}
                  onChange={() => handleSelect(opt.id, opt.riskScore)}
                  className="sr-only"
                />
                {/* Custom radio indicator */}
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors"
                  style={
                    isSelected
                      ? { borderColor: accent }
                      : { borderColor: "#D1D5DB" }
                  }
                >
                  {isSelected && (
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: accent }}
                    />
                  )}
                </span>
                <span
                  className="text-base font-medium"
                  style={{ color: isSelected ? "#1F2937" : "#374151" }}
                >
                  {opt.label}
                </span>
              </label>
            );
          })}
        </fieldset>

        {/* Unselected state: subtle border for idle options */}
        <style>{`
          label[data-state="idle"] {
            border-color: #E5E7EB;
            background-color: white;
          }
          label[data-state="idle"]:hover {
            border-color: ${accent};
            background-color: ${accent}0D;
          }
        `}</style>

        {/* Next button */}
        <button
          onClick={handleNext}
          disabled={!selectedOptionId}
          className="w-full rounded-xl px-6 py-4 text-base font-semibold text-white transition-opacity disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{ backgroundColor: accent }}
        >
          {isLast ? c.seeResults : c.next}
        </button>
      </div>
    </div>
  );
}
