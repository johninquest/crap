"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { AssessmentResult } from "@/lib/assessment/types";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { Button } from "@/components/ui/Button";

const MODULE_ICONS: Record<string, string> = {
  accounts: "🔑",
  devices:  "💻",
  backups:  "☁️",
  behavior: "🧠",
};

function ScoreBar({ score }: { score: number }) {
  const color =
    score < 34 ? "bg-[#10B981]" : score < 67 ? "bg-[#F59E0B]" : "bg-[#EF4444]";
  return (
    <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-700 ${color}`}
        style={{ width: `${score}%` }}
      />
    </div>
  );
}

export function ResultsView() {
  const router = useRouter();
  const [result, setResult] = useState<AssessmentResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("clearrisk_result");
    if (!stored) {
      router.replace("/assessment");
      return;
    }
    setResult(JSON.parse(stored) as AssessmentResult);
  }, [router]);

  if (!result) return null;

  const formattedDate = new Date(result.completedAt).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className="space-y-10">
      {/* ── Overall Score ──────────────────────────────────────────── */}
      <section className="bg-white border border-[#E5E7EB] rounded-2xl p-6 space-y-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-lg font-semibold text-[#1F2937]">Overall Risk Level</h2>
            <p className="text-sm text-[#6B7280]">Assessed {formattedDate}</p>
          </div>
          <RiskBadge level={result.overallRiskLevel} />
        </div>
        <ScoreBar score={result.overallScore} />
        <p className="text-sm text-[#6B7280]">
          {result.overallRiskLevel === "low" &&
            "Your habits are in good shape. A few targeted improvements will close the remaining gaps."}
          {result.overallRiskLevel === "medium" &&
            "You have solid foundations, but there are meaningful gaps worth addressing soon — before an incident forces your hand."}
          {result.overallRiskLevel === "high" &&
            "There are several significant gaps in your current setup. The good news: most are quick to fix once you know about them."}
        </p>
      </section>

      {/* ── Module Breakdown ──────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-[#1F2937]">Breakdown by area</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {result.moduleScores.map((ms) => (
            <div
              key={ms.module}
              className="bg-white border border-[#E5E7EB] rounded-xl p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{MODULE_ICONS[ms.module]}</span>
                  <span className="font-medium text-[#1F2937] text-sm">{ms.label}</span>
                </div>
                <RiskBadge level={ms.riskLevel} size="sm" />
              </div>
              <ScoreBar score={ms.score} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Recommendations ──────────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-[#1F2937]">What to do next</h2>
          <p className="text-sm text-[#6B7280]">
            These are the highest-impact actions for your specific situation — effort is low for all of them.
          </p>
        </div>
        <ol className="space-y-3">
          {result.topRecommendations.map((rec, i) => (
            <li
              key={rec.id}
              className="flex gap-4 bg-white border border-[#E5E7EB] rounded-xl p-5"
            >
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#E0F2FE] text-[#0891B2] text-sm font-bold flex items-center justify-center">
                {i + 1}
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-[#1F2937]">{rec.title}</p>
                <p className="text-sm text-[#6B7280] leading-relaxed">{rec.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Incident Guidance ─────────────────────────────────────── */}
      <section className="bg-[#FEF3C7] border border-[#FDE68A] rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🚨</span>
          <h2 className="text-lg font-semibold text-[#92400E]">
            If something happens — do this first
          </h2>
        </div>
        <p className="text-sm text-[#92400E]">
          Save or print this. Most people lose valuable response time because they don&apos;t know the steps.
        </p>
        <ol className="space-y-3">
          {result.incidentGuidance.map((step) => (
            <li key={step.order} className="flex gap-3">
              <span className="flex-shrink-0 font-bold text-[#92400E] text-sm w-5 text-right">
                {step.order}.
              </span>
              <div>
                <p className="font-semibold text-[#1F2937] text-sm">{step.title}</p>
                <p className="text-sm text-[#6B7280] leading-relaxed">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="text-center space-y-4 pb-8">
        <p className="text-[#6B7280] text-sm">
          Want to assess your business? The same framework applies — with more depth.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/assessment">
            <Button variant="outline">Retake Assessment</Button>
          </Link>
          <Button
            onClick={() => window.print()}
            variant="ghost"
          >
            🖨 Print / Save Results
          </Button>
        </div>
      </section>
    </div>
  );
}
