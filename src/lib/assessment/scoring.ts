import { questions } from "./questions";
import type {
  Answer,
  AssessmentModule,
  AssessmentResult,
  ModuleScore,
  Recommendation,
  RiskLevel,
} from "./types";
import type { Dictionary } from "@/lib/types/dictionary";



function riskLevelFromScore(score: number): RiskLevel {
  if (score < 34) return "low";
  if (score < 67) return "medium";
  return "high";
}

function scoreModule(
  module: AssessmentModule,
  answers: Answer[],
  moduleLabels: Record<string, string>
): ModuleScore {
  const moduleQuestions = questions.filter((q) => q.module === module);
  const maxScore = moduleQuestions.length * 2; // max riskScore per question is 2

  const earned = moduleQuestions.reduce((sum, q) => {
    const answer = answers.find((a) => a.questionId === q.id);
    return sum + (answer?.riskScore ?? 0);
  }, 0);

  const score = maxScore === 0 ? 0 : Math.round((earned / maxScore) * 100);

  return {
    module,
    label: moduleLabels[module] ?? module,
    score,
    riskLevel: riskLevelFromScore(score),
  };
}

const RECOMMENDATION_IDS = [
  "rec-pw-manager",
  "rec-2fa-email",
  "rec-updates",
  "rec-screen-lock",
  "rec-backup",
  "rec-recovery-plan",
  "rec-phishing",
  "rec-incident-plan",
] as const;

const RECOMMENDATION_MODULES: Record<string, AssessmentModule> = {
  "rec-pw-manager":    "accounts",
  "rec-2fa-email":     "accounts",
  "rec-updates":       "devices",
  "rec-screen-lock":   "devices",
  "rec-backup":        "backups",
  "rec-recovery-plan": "backups",
  "rec-phishing":      "behavior",
  "rec-incident-plan": "behavior",
};

const INCIDENT_ORDERS = [1, 2, 3, 4, 5, 6] as const;

function buildRecommendations(dict: Dictionary): Recommendation[] {
  return RECOMMENDATION_IDS.map((id) => ({
    id,
    title: dict.recommendations[id].title,
    description: dict.recommendations[id].description,
    effort: "low" as const,
    impact: "high" as const,
    module: RECOMMENDATION_MODULES[id],
  }));
}

function pickTopRecommendations(
  moduleScores: ModuleScore[],
  answers: Answer[],
  allRecommendations: Recommendation[]
): Recommendation[] {
  const sortedModules = [...moduleScores].sort((a, b) => b.score - a.score);
  const picked: Recommendation[] = [];

  for (const ms of sortedModules) {
    if (picked.length >= 5) break;
    const recs = allRecommendations.filter(
      (r) => r.module === ms.module && !picked.find((p) => p.id === r.id)
    );
    picked.push(...recs.slice(0, 2 - picked.filter((p) => p.module === ms.module).length));
  }

  if (picked.length < 3) {
    for (const rec of allRecommendations) {
      if (picked.length >= 3) break;
      if (!picked.find((p) => p.id === rec.id)) picked.push(rec);
    }
  }

  return picked.slice(0, 5);
}

export function calculateResult(answers: Answer[], dict: Dictionary): AssessmentResult {
  const modules: AssessmentModule[] = ["accounts", "devices", "backups", "behavior"];
  const moduleScores = modules.map((m) => scoreModule(m, answers, dict.modules));

  const overallScore = Math.round(
    moduleScores.reduce((sum, ms) => sum + ms.score, 0) / moduleScores.length
  );

  const localizedRecommendations = buildRecommendations(dict);
  const incidentGuidance = INCIDENT_ORDERS.map((order) => ({
    order,
    title: dict.incident[String(order)].title,
    description: dict.incident[String(order)].description,
  }));

  return {
    overallScore,
    overallRiskLevel: riskLevelFromScore(overallScore),
    moduleScores,
    topRecommendations: pickTopRecommendations(moduleScores, answers, localizedRecommendations),
    incidentGuidance,
    completedAt: new Date().toISOString(),
  };
}
