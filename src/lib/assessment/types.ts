// ─── Assessment Domain Types ───────────────────────────────────────────────

export type AssessmentModule = "accounts" | "devices" | "backups" | "behavior";

export type RiskLevel = "low" | "medium" | "high";

export interface Option {
  id: string;
  label: string;
  /** 0 = safest, 2 = riskiest */
  riskScore: 0 | 1 | 2;
}

export interface Question {
  id: string;
  module: AssessmentModule;
  text: string;
  hint?: string;
  options: Option[];
}

export interface Answer {
  questionId: string;
  optionId: string;
  riskScore: number;
}

export interface ModuleScore {
  module: AssessmentModule;
  label: string;
  score: number;       // 0–100
  riskLevel: RiskLevel;
}

export interface AssessmentResult {
  overallScore: number;        // 0–100 (higher = more risk)
  overallRiskLevel: RiskLevel;
  moduleScores: ModuleScore[];
  topRecommendations: Recommendation[];
  incidentGuidance: IncidentStep[];
  completedAt: string;         // ISO timestamp
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  effort: "low" | "medium" | "high";
  impact: "low" | "medium" | "high";
  module: AssessmentModule;
}

export interface IncidentStep {
  order: number;
  title: string;
  description: string;
}
