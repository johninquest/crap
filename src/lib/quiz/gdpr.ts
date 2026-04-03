import type { QuizDefinition } from "./types";

export const GDPR_QUIZ: QuizDefinition = {
  id: "gdpr",
  slug: "gdpr-check",
  storageKey: "quiz_gdpr_result",
  accentColor: "#7C3AED",
  categories: [
    { id: "data_awareness",  icon: "👁️" },
    { id: "your_rights",     icon: "⚖️" },
    { id: "digital_habits",  icon: "📱" },
    { id: "breach_response", icon: "🔐" },
  ],
  baseQuestions: [
    // ── Data Awareness ────────────────────────────────────────────────────────
    {
      id: "gdpr-1",
      categoryId: "data_awareness",
      options: [
        { id: "gdpr-1-yes",    riskScore: 0 },
        { id: "gdpr-1-partly", riskScore: 1 },
        { id: "gdpr-1-no",     riskScore: 2 },
      ],
    },
    {
      id: "gdpr-2",
      categoryId: "data_awareness",
      options: [
        { id: "gdpr-2-yes",    riskScore: 0 },
        { id: "gdpr-2-partly", riskScore: 1 },
        { id: "gdpr-2-no",     riskScore: 2 },
      ],
    },
    {
      id: "gdpr-3",
      categoryId: "data_awareness",
      options: [
        { id: "gdpr-3-yes",    riskScore: 0 },
        { id: "gdpr-3-partly", riskScore: 1 },
        { id: "gdpr-3-no",     riskScore: 2 },
      ],
    },
    // ── Your Rights ───────────────────────────────────────────────────────────
    {
      id: "gdpr-4",
      categoryId: "your_rights",
      options: [
        { id: "gdpr-4-yes",    riskScore: 0 },
        { id: "gdpr-4-partly", riskScore: 1 },
        { id: "gdpr-4-no",     riskScore: 2 },
      ],
    },
    {
      id: "gdpr-5",
      categoryId: "your_rights",
      options: [
        { id: "gdpr-5-yes",    riskScore: 0 },
        { id: "gdpr-5-partly", riskScore: 1 },
        { id: "gdpr-5-no",     riskScore: 2 },
      ],
    },
    {
      id: "gdpr-6",
      categoryId: "your_rights",
      options: [
        { id: "gdpr-6-yes",    riskScore: 0 },
        { id: "gdpr-6-partly", riskScore: 1 },
        { id: "gdpr-6-no",     riskScore: 2 },
      ],
    },
    // ── Digital Habits ────────────────────────────────────────────────────────
    {
      id: "gdpr-7",
      categoryId: "digital_habits",
      options: [
        { id: "gdpr-7-yes",    riskScore: 0 },
        { id: "gdpr-7-partly", riskScore: 1 },
        { id: "gdpr-7-no",     riskScore: 2 },
      ],
    },
    {
      id: "gdpr-8",
      categoryId: "digital_habits",
      options: [
        { id: "gdpr-8-yes",    riskScore: 0 },
        { id: "gdpr-8-partly", riskScore: 1 },
        { id: "gdpr-8-no",     riskScore: 2 },
      ],
    },
    // ── Breach Response ───────────────────────────────────────────────────────
    {
      id: "gdpr-9",
      categoryId: "breach_response",
      options: [
        { id: "gdpr-9-yes",    riskScore: 0 },
        { id: "gdpr-9-partly", riskScore: 1 },
        { id: "gdpr-9-no",     riskScore: 2 },
      ],
    },
    {
      id: "gdpr-10",
      categoryId: "breach_response",
      options: [
        { id: "gdpr-10-yes",    riskScore: 0 },
        { id: "gdpr-10-partly", riskScore: 1 },
        { id: "gdpr-10-no",     riskScore: 2 },
      ],
    },
  ],
};
