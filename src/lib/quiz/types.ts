// ─── Generic Quiz Engine Types ───────────────────────────────────────────────

import type { RiskLevel } from "@/lib/assessment/types";

export type QuizId = "nis2" | "gdpr" | "ai-check";

// ── Data model (language-independent) ───────────────────────────────────────

export interface BaseQuizOption {
  id: string;
  /** 0 = safest (Yes), 1 = partly, 2 = riskiest (No) */
  riskScore: 0 | 1 | 2;
}

export interface BaseQuizQuestion {
  id: string;
  categoryId: string;
  options: BaseQuizOption[];
}

export interface QuizCategory {
  id: string;
  icon: string;
}

export interface QuizDefinition {
  id: QuizId;
  slug: string;
  storageKey: string;
  categories: QuizCategory[];
  baseQuestions: BaseQuizQuestion[];
}

// ── Localized versions (after merging with dictionary) ───────────────────────

export interface QuizOption {
  id: string;
  label: string;
  riskScore: 0 | 1 | 2;
}

export interface QuizQuestion {
  id: string;
  categoryId: string;
  text: string;
  hint?: string;
  options: QuizOption[];
}

export interface LocalizedQuiz {
  definition: QuizDefinition;
  questions: QuizQuestion[];
  categoryLabels: Record<string, string>;
}

// ── Runtime answer & result ───────────────────────────────────────────────────

export interface QuizAnswer {
  questionId: string;
  optionId: string;
  riskScore: number;
}

export interface QuizCategoryScore {
  categoryId: string;
  label: string;
  icon: string;
  score: number;      // 0–100 (higher = more risk)
  riskLevel: RiskLevel;
}

export interface QuizResult {
  quizId: QuizId;
  overallScore: number;        // 0–100
  overallRiskLevel: RiskLevel;
  categoryScores: QuizCategoryScore[];
  completedAt: string;         // ISO timestamp
}
