"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { AssessmentResult } from "@/lib/assessment/types";
import type { Dictionary } from "@/lib/types/dictionary";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/lib/config";
import { trackEvent } from "@/lib/analytics";

const MODULE_ICONS: Record<string, string> = {
  accounts: "🔑",
  devices: "💻",
  backups: "☁️",
  behavior: "🧠",
};

function ScoreBar({ score }: { score: number }) {
  const color =
    score < 34 ? "bg-green" : score < 67 ? "bg-amber" : "bg-red";
  return (
    <div className="h-2 bg-border rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-700 ${color}`}
        style={{ width: `${score}%` }}
      />
    </div>
  );
}

interface ResultsViewProps {
  lang: string;
  dict: Dictionary;
}

export function ResultsView({ lang, dict }: ResultsViewProps) {
  const router = useRouter();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const t = dict.results;

  useEffect(() => {
    const stored = sessionStorage.getItem(BRAND.storageKey);
    if (!stored) {
      router.replace(`/${lang}/risk-check`);
      return;
    }
    const parsed = JSON.parse(stored) as AssessmentResult;
    setResult(parsed);
    trackEvent("result_viewed", { lang, risk_level: parsed.overallRiskLevel });
  }, [router, lang]);

  if (!result) return null;

  const formattedDate = new Date(result.completedAt).toLocaleDateString(
    lang === "de" ? "de-DE" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" }
  );

  const narratives: Record<string, string> = {
    low: t.narrativeLow,
    medium: t.narrativeMedium,
    high: t.narrativeHigh,
  };

  return (
    <div className="space-y-10">
      {/* ── Overall Score ──────────────────────────────────────────── */}
      <section className="bg-surface border border-border rounded-2xl p-6 space-y-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-lg font-semibold text-text">{t.overallTitle}</h2>
            <p className="text-sm text-text-muted">
              {t.assessed} {formattedDate}
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
        <p className="text-sm text-text-muted">{narratives[result.overallRiskLevel]}</p>
      </section>

      {/* ── Module Breakdown ──────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-text">{t.breakdownTitle}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {result.moduleScores.map((ms) => (
            <div
              key={ms.module}
              className="bg-surface border border-border rounded-xl p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{MODULE_ICONS[ms.module]}</span>
                  <span className="font-medium text-text text-sm">{ms.label}</span>
                </div>
                <RiskBadge
                  level={ms.riskLevel}
                  size="sm"
                  labelLow={dict.common.riskLow}
                  labelMedium={dict.common.riskMedium}
                  labelHigh={dict.common.riskHigh}
                />
              </div>
              <ScoreBar score={ms.score} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Recommendations ──────────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-text">{t.recsTitle}</h2>
          <p className="text-sm text-text-muted">{t.recsSubtitle}</p>
        </div>
        <ol className="space-y-3">
          {result.topRecommendations.map((rec, i) => (
            <li
              key={rec.id}
              className="flex gap-4 bg-surface border border-border rounded-xl p-5"
            >
              <div className="shrink-0 w-7 h-7 rounded-full bg-primary-light text-primary text-sm font-bold flex items-center justify-center">
                {i + 1}
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-text">{rec.title}</p>
                <p className="text-sm text-text-muted leading-relaxed">{rec.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Incident Guidance ─────────────────────────────────────── */}
      <section className="bg-amber-light border border-amber-border rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🚨</span>
          <h2 className="text-lg font-semibold text-amber-on">{t.incidentTitle}</h2>
        </div>
        <p className="text-sm text-amber-on">{t.incidentSubtitle}</p>
        <ol className="space-y-3">
          {result.incidentGuidance.map((step) => (
            <li key={step.order} className="flex gap-3">
              <span className="shrink-0 font-bold text-amber-on text-sm w-5 text-right">
                {step.order}.
              </span>
              <div>
                <p className="font-semibold text-amber-on text-sm">{step.title}</p>
                <p className="text-sm text-amber-on leading-relaxed">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="bg-green-soft border border-green-border rounded-2xl p-6 space-y-4">
        <div>
          <p className="font-semibold text-green-on">{t.businessCta}</p>
          <p className="text-sm text-green-on mt-1">{t.businessCtaBody}</p>
        </div>
        <Link href={`/${lang}/rules-finder`}>
          <Button variant="primary">{t.businessCtaBtn}</Button>
        </Link>
      </section>

      <section className="text-center space-y-4 pb-8">
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href={`/${lang}/assessment`}>
            <Button variant="outline">{t.retake}</Button>
          </Link>
          <Button onClick={() => window.print()} variant="ghost">
            {t.print}
          </Button>
        </div>
      </section>
    </div>
  );
}
