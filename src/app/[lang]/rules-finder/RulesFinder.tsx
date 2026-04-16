"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Dictionary } from "@/lib/types/dictionary";
import { ProgressBar } from "@/components/assessment/ProgressBar";
import { trackEvent } from "@/lib/analytics";

// ── Types ────────────────────────────────────────────────────────────────────

type Answer = "yes" | "no" | "unsure";

interface Answers {
  q1: Answer | null;
  q2: Answer | null;
  q3: Answer | null;
}

const QUESTION_IDS = ["q1", "q2", "q3"] as const;
type QuestionId = (typeof QUESTION_IDS)[number];

const STORAGE_KEY = "rules-finder-answers";

// ── Component ─────────────────────────────────────────────────────────────────

interface RulesFinderProps {
  lang: string;
  dict: Dictionary;
}

export function RulesFinder({ lang, dict }: RulesFinderProps) {
  const router = useRouter();
  const t = dict.rulesFinder;

  const [phase, setPhase] = useState<"intro" | "quiz">("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ q1: null, q2: null, q3: null });
  const [selected, setSelected] = useState<Answer | null>(null);

  const currentId = QUESTION_IDS[currentIndex];
  const question = t.questions[currentId];
  const isLast = currentIndex === QUESTION_IDS.length - 1;

  function handleStart() {
    setPhase("quiz");
    trackEvent("rules_finder_started", { lang });
  }

  function handleSelect(value: Answer) {
    setSelected(value);
    setAnswers((prev) => ({ ...prev, [currentId]: value }));
  }

  function handleNext() {
    if (!selected) return;

    const updatedAnswers = { ...answers, [currentId]: selected };

    if (isLast) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAnswers));
      trackEvent("rules_finder_completed", { lang });
      router.push(`/${lang}/rules-finder/result`);
    } else {
      const nextId = QUESTION_IDS[currentIndex + 1];
      setSelected(updatedAnswers[nextId] ?? null);
      setCurrentIndex((i) => i + 1);
    }
  }

  // ── Intro ────────────────────────────────────────────────────────────────────

  if (phase === "intro") {
    return (
      <div className="bg-surface border border-border rounded-2xl p-8 space-y-6">
        <p className="text-text-muted leading-relaxed">{t.description}</p>
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 text-sm text-text-muted bg-surface-muted rounded-full px-3 py-1">
            📋 {t.questionCount}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm text-text-muted bg-surface-muted rounded-full px-3 py-1">
            ⏱ {t.estimatedTime}
          </span>
        </div>
        <button
          onClick={handleStart}
          className="w-full rounded-xl px-6 py-4 text-base font-semibold text-white bg-primary hover:bg-primary-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
        >
          {t.start}
        </button>
        <p className="text-xs text-center text-text-subtle">
          No account required · No personal data collected
        </p>
      </div>
    );
  }

  // ── Quiz ─────────────────────────────────────────────────────────────────────

  const options: { value: Answer; label: string }[] = [
    { value: "yes", label: question.yes },
    { value: "no", label: question.no },
    { value: "unsure", label: question.unsure },
  ];

  return (
    <div className="space-y-8">
      <ProgressBar
        current={currentIndex + 1}
        total={QUESTION_IDS.length}
        labelQuestionOf={dict.assessment.questionOf}
        labelPctComplete={dict.assessment.pctComplete}
      />

      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-xl font-semibold text-text leading-snug">
            {question.text}
          </p>
          {question.hint && (
            <p className="text-sm text-text-muted leading-relaxed">{question.hint}</p>
          )}
        </div>

        <fieldset className="space-y-3">
          <legend className="sr-only">Choose your answer</legend>
          {options.map((opt) => {
            const isSelected = selected === opt.value;
            return (
              <label
                key={opt.value}
                className={`flex items-center gap-4 w-full rounded-xl border-2 px-5 py-4 cursor-pointer transition-all ${
                  isSelected
                    ? "border-primary bg-primary-soft"
                    : "border-border bg-surface hover:border-primary hover:bg-primary-soft"
                }`}
              >
                <input
                  type="radio"
                  name={currentId}
                  value={opt.value}
                  checked={isSelected}
                  onChange={() => handleSelect(opt.value)}
                  className="sr-only"
                />
                <span
                  className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isSelected ? "border-primary" : "border-border"
                  }`}
                >
                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  )}
                </span>
                <span className="text-text font-medium">{opt.label}</span>
              </label>
            );
          })}
        </fieldset>
      </div>

      <button
        onClick={handleNext}
        disabled={!selected}
        className="w-full rounded-xl px-6 py-4 text-base font-semibold text-white bg-primary hover:bg-primary-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
      >
        {t.next}
      </button>
    </div>
  );
}
