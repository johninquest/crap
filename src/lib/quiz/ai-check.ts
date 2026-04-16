import type { QuizDefinition } from "./types";

export const AI_CHECK_QUIZ: QuizDefinition = {
  id: "ai-check",
  slug: "ai-check",
  storageKey: "quiz_ai_result",
  categories: [
    { id: "data_ip_leaks",  icon: "🔓" },
    { id: "transparency",   icon: "👁️" },
    { id: "high_risk",      icon: "⚠️" },
    { id: "human_oversight", icon: "👤" },
  ],
  baseQuestions: [
    // ── Data & IP Leaks ───────────────────────────────────────────────────────
    {
      id: "ai-1",
      categoryId: "data_ip_leaks",
      options: [
        { id: "ai-1-yes",    riskScore: 0 },
        { id: "ai-1-partly", riskScore: 1 },
        { id: "ai-1-no",     riskScore: 2 },
      ],
    },
    {
      id: "ai-2",
      categoryId: "data_ip_leaks",
      options: [
        { id: "ai-2-yes",    riskScore: 0 },
        { id: "ai-2-partly", riskScore: 1 },
        { id: "ai-2-no",     riskScore: 2 },
      ],
    },
    {
      id: "ai-3",
      categoryId: "data_ip_leaks",
      options: [
        { id: "ai-3-yes",    riskScore: 0 },
        { id: "ai-3-partly", riskScore: 1 },
        { id: "ai-3-no",     riskScore: 2 },
      ],
    },
    // ── Transparency ──────────────────────────────────────────────────────────
    {
      id: "ai-4",
      categoryId: "transparency",
      options: [
        { id: "ai-4-yes",    riskScore: 0 },
        { id: "ai-4-partly", riskScore: 1 },
        { id: "ai-4-no",     riskScore: 2 },
      ],
    },
    {
      id: "ai-5",
      categoryId: "transparency",
      options: [
        { id: "ai-5-yes",    riskScore: 0 },
        { id: "ai-5-partly", riskScore: 1 },
        { id: "ai-5-no",     riskScore: 2 },
      ],
    },
    // ── High-Risk Zones ───────────────────────────────────────────────────────
    {
      id: "ai-6",
      categoryId: "high_risk",
      options: [
        { id: "ai-6-yes",    riskScore: 0 },
        { id: "ai-6-partly", riskScore: 1 },
        { id: "ai-6-no",     riskScore: 2 },
      ],
    },
    {
      id: "ai-7",
      categoryId: "high_risk",
      options: [
        { id: "ai-7-yes",    riskScore: 0 },
        { id: "ai-7-partly", riskScore: 1 },
        { id: "ai-7-no",     riskScore: 2 },
      ],
    },
    // ── Human Oversight ───────────────────────────────────────────────────────
    {
      id: "ai-8",
      categoryId: "human_oversight",
      options: [
        { id: "ai-8-yes",    riskScore: 0 },
        { id: "ai-8-partly", riskScore: 1 },
        { id: "ai-8-no",     riskScore: 2 },
      ],
    },
    {
      id: "ai-9",
      categoryId: "human_oversight",
      options: [
        { id: "ai-9-yes",    riskScore: 0 },
        { id: "ai-9-partly", riskScore: 1 },
        { id: "ai-9-no",     riskScore: 2 },
      ],
    },
  ],
};
