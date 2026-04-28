"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { QuizResult } from "@/lib/quiz/types";
import type { QuizId } from "@/lib/quiz/types";
import type { Dictionary } from "@/lib/types/dictionary";
import { getQuizDefinition } from "@/lib/quiz/registry";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

// ── Helpers ──────────────────────────────────────────────────────────────────

function getQuizSectionDict(quizId: QuizId, dict: Dictionary) {
  const map = {
    nis2:                  dict.quiz.nis2,
    gdpr:                  dict.quiz.gdpr,
    "ai-check":            dict.quiz.aiCheck,
    "insurance-readiness": dict.quiz.insuranceReadiness,
  } as const;
  return map[quizId];
}

function ScoreBar({ score }: { score: number }) {
  const colorClass = score < 34 ? "bg-green" : score < 67 ? "bg-amber" : "bg-red";
  return (
    <div className="h-2 bg-border rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-700 ${colorClass}`}
        style={{ width: `${score}%` }}
      />
    </div>
  );
}

// ── QuizResultsView ───────────────────────────────────────────────────────────

interface QuizResultsViewProps {
  lang: string;
  quizId: QuizId;
  dict: Dictionary;
}

export function QuizResultsView({ lang, quizId, dict }: QuizResultsViewProps) {
  const router = useRouter();
  const [result, setResult] = useState<QuizResult | null>(null);
  const definition = getQuizDefinition(quizId);
  const quizDict = getQuizSectionDict(quizId, dict);
  const c = dict.quiz.common;

  useEffect(() => {
    const stored = sessionStorage.getItem(definition.storageKey);
    if (!stored) {
      router.replace(`/${lang}/${definition.slug}`);
      return;
    }
    const parsed = JSON.parse(stored) as QuizResult;
    setResult(parsed);
    trackEvent(`${quizId}_result_viewed`, { lang, risk_level: parsed.overallRiskLevel });
  }, [router, lang, definition, quizId]);

  if (!result) return null;

  const formattedDate = new Date(result.completedAt).toLocaleDateString(
    lang === "de" ? "de-DE" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" }
  );

  const resultLevel = quizDict.results[result.overallRiskLevel];

  return (
    <div className="space-y-10 quiz-result-content">
      {/* ── Overall Score ──────────────────────────────────────────────── */}
      <section className="bg-surface border border-border rounded-2xl p-6 space-y-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-lg font-semibold text-text">{c.overallTitle}</h2>
            <p className="text-sm text-text-muted">
              {c.completedOn} {formattedDate}
            </p>
          </div>
          <RiskBadge
            level={result.overallRiskLevel}
            labelLow={dict.common.riskLow}
            labelMedium={dict.common.riskMedium}
            labelHigh={dict.common.riskHigh}
          />
        </div>
        <ScoreBar score={result.overallScore} />
        <p className="text-sm text-text-muted leading-relaxed">{resultLevel.narrative}</p>
      </section>

      {/* ── Category Breakdown ───────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-text">{c.breakdownTitle}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {result.categoryScores.map((cs) => (
            <div
              key={cs.categoryId}
              className="bg-surface border border-border rounded-xl p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{cs.icon}</span>
                  <span className="font-medium text-text text-sm">{cs.label}</span>
                </div>
                <RiskBadge
                  level={cs.riskLevel}
                  size="sm"
                  labelLow={dict.common.riskLow}
                  labelMedium={dict.common.riskMedium}
                  labelHigh={dict.common.riskHigh}
                />
              </div>
              <ScoreBar score={cs.score} />
            </div>
          ))}
        </div>
      </section>

      {/* ── What to do next ─────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-text">{c.whatNext}</h2>
        <ol className="space-y-3">
          {resultLevel.actions.map((action, i) => (
            <li
              key={i}
              className="flex gap-4 bg-surface border border-border rounded-xl p-5"
            >
              <div className="shrink-0 w-7 h-7 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
                {i + 1}
              </div>
              <p className="text-sm text-text-muted leading-relaxed pt-0.5">{action}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Actions ─────────────────────────────────────────────────────────── */}
      <section className="flex flex-col sm:flex-row gap-3 justify-center pb-8 no-print">
        <Link href={`/${lang}/${definition.slug}`}>
          <Button variant="outline">{c.retake}</Button>
        </Link>
        <Button onClick={() => window.print()} variant="ghost">
          {c.print}
        </Button>
      </section>
    </div>
  );
}
