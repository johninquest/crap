"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Dictionary } from "@/lib/types/dictionary";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

// ── Types ─────────────────────────────────────────────────────────────────────

type Answer = "yes" | "no" | "unsure";

interface StoredAnswers {
  q1: Answer;
  q2: Answer;
  q3: Answer;
}

type RuleKey = "nis2" | "gdpr" | "aiAct";

interface ApplicableRule {
  key: RuleKey;
  applies: "yes" | "maybe";
}

const STORAGE_KEY = "rules-finder-answers";

const RULE_ROUTES: Record<RuleKey, string> = {
  nis2: "nis2-check",
  gdpr: "gdpr-check",
  aiAct: "ai-check",
};

const RULE_ICONS: Record<RuleKey, string> = {
  nis2: "🏛️",
  gdpr: "🔒",
  aiAct: "🤖",
};

// ── Evaluation ────────────────────────────────────────────────────────────────

function evaluateAnswers(answers: StoredAnswers): ApplicableRule[] {
  const rules: ApplicableRule[] = [];

  if (answers.q1 === "yes") rules.push({ key: "nis2", applies: "yes" });
  else if (answers.q1 === "unsure") rules.push({ key: "nis2", applies: "maybe" });

  if (answers.q2 === "yes") rules.push({ key: "gdpr", applies: "yes" });
  else if (answers.q2 === "unsure") rules.push({ key: "gdpr", applies: "maybe" });

  if (answers.q3 === "yes") rules.push({ key: "aiAct", applies: "yes" });
  else if (answers.q3 === "unsure") rules.push({ key: "aiAct", applies: "maybe" });

  return rules;
}

// ── Component ─────────────────────────────────────────────────────────────────

interface RulesResultsViewProps {
  lang: string;
  dict: Dictionary;
}

export function RulesResultsView({ lang, dict }: RulesResultsViewProps) {
  const router = useRouter();
  const t = dict.rulesFinder;
  const [rules, setRules] = useState<ApplicableRule[] | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) {
      router.replace(`/${lang}/rules-finder`);
      return;
    }
    const answers = JSON.parse(stored) as StoredAnswers;
    const applicable = evaluateAnswers(answers);
    setRules(applicable);
    trackEvent("rules_finder_result_viewed", {
      lang,
      rule_count: applicable.length,
      rules: applicable.map((r) => r.key).join(","),
    });
  }, [router, lang]);

  if (!rules) return null;

  if (rules.length === 0) {
    return (
      <div className="space-y-8">
        <section className="bg-white border border-border rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <h2 className="text-lg font-semibold text-text">{t.resultNoMatch}</h2>
          </div>
          <p className="text-sm text-text-muted leading-relaxed">{t.resultNoMatchBody}</p>
        </section>
        <div className="flex justify-center pb-8">
          <Link href={`/${lang}/rules-finder`}>
            <Button variant="outline">{t.resultRetake}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {rules.map((rule) => {
        const ruleDict = t.rules[rule.key];
        const route = RULE_ROUTES[rule.key];
        const icon = RULE_ICONS[rule.key];
        const badgeLabel = rule.applies === "yes" ? t.resultApplies : t.resultMayApply;
        const badgeClass =
          rule.applies === "yes"
            ? "bg-[#FEF3C7] text-[#92400E]"
            : "bg-[#F3F4F6] text-[#6B7280]";

        return (
          <section
            key={rule.key}
            className="bg-white border border-border rounded-2xl p-6 space-y-4"
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{icon}</span>
                <h2 className="text-lg font-semibold text-text">{ruleDict.name}</h2>
              </div>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${badgeClass}`}
              >
                {badgeLabel}
              </span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">{ruleDict.summary}</p>
            <Link href={`/${lang}/${route}`}>
              <Button variant="primary" size="sm">
                {ruleDict.ctaLabel}
              </Button>
            </Link>
          </section>
        );
      })}

      <div className="flex justify-center pt-4">
        <Link href={`/${lang}/rules-finder`}>
          <Button variant="ghost">{t.resultRetake}</Button>
        </Link>
      </div>
    </div>
  );
}
