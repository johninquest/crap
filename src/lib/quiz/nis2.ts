import type { QuizDefinition } from "./types";

export const NIS2_QUIZ: QuizDefinition = {
  id: "nis2",
  slug: "nis2-check",
  storageKey: "quiz_nis2_result",
  accentColor: "#2563EB",
  categories: [
    { id: "applicability", icon: "🏛️" },
    { id: "systems",       icon: "⚙️" },
    { id: "hygiene",       icon: "🔒" },
    { id: "incidents",     icon: "🚨" },
    { id: "backups",       icon: "💾" },
    { id: "suppliers",     icon: "🤝" },
  ],
  baseQuestions: [
    // ── Applicability & Responsibility ───────────────────────────────────────
    {
      id: "nis2-1",
      categoryId: "applicability",
      options: [
        { id: "nis2-1-yes",    riskScore: 0 },
        { id: "nis2-1-partly", riskScore: 1 },
        { id: "nis2-1-no",     riskScore: 2 },
      ],
    },
    {
      id: "nis2-2",
      categoryId: "applicability",
      options: [
        { id: "nis2-2-yes",    riskScore: 0 },
        { id: "nis2-2-partly", riskScore: 1 },
        { id: "nis2-2-no",     riskScore: 2 },
      ],
    },
    // ── Critical Systems ─────────────────────────────────────────────────────
    {
      id: "nis2-3",
      categoryId: "systems",
      options: [
        { id: "nis2-3-yes",    riskScore: 0 },
        { id: "nis2-3-partly", riskScore: 1 },
        { id: "nis2-3-no",     riskScore: 2 },
      ],
    },
    {
      id: "nis2-4",
      categoryId: "systems",
      options: [
        { id: "nis2-4-yes",    riskScore: 0 },
        { id: "nis2-4-partly", riskScore: 1 },
        { id: "nis2-4-no",     riskScore: 2 },
      ],
    },
    // ── Basic Hygiene ─────────────────────────────────────────────────────────
    {
      id: "nis2-5",
      categoryId: "hygiene",
      options: [
        { id: "nis2-5-yes",    riskScore: 0 },
        { id: "nis2-5-partly", riskScore: 1 },
        { id: "nis2-5-no",     riskScore: 2 },
      ],
    },
    {
      id: "nis2-6",
      categoryId: "hygiene",
      options: [
        { id: "nis2-6-yes",    riskScore: 0 },
        { id: "nis2-6-partly", riskScore: 1 },
        { id: "nis2-6-no",     riskScore: 2 },
      ],
    },
    // ── Incident Detection & Response ─────────────────────────────────────────
    {
      id: "nis2-7",
      categoryId: "incidents",
      options: [
        { id: "nis2-7-yes",    riskScore: 0 },
        { id: "nis2-7-partly", riskScore: 1 },
        { id: "nis2-7-no",     riskScore: 2 },
      ],
    },
    {
      id: "nis2-8",
      categoryId: "incidents",
      options: [
        { id: "nis2-8-yes",    riskScore: 0 },
        { id: "nis2-8-partly", riskScore: 1 },
        { id: "nis2-8-no",     riskScore: 2 },
      ],
    },
    // ── Business Continuity & Backups ─────────────────────────────────────────
    {
      id: "nis2-9",
      categoryId: "backups",
      options: [
        { id: "nis2-9-yes",    riskScore: 0 },
        { id: "nis2-9-partly", riskScore: 1 },
        { id: "nis2-9-no",     riskScore: 2 },
      ],
    },
    {
      id: "nis2-10",
      categoryId: "backups",
      options: [
        { id: "nis2-10-yes",    riskScore: 0 },
        { id: "nis2-10-partly", riskScore: 1 },
        { id: "nis2-10-no",     riskScore: 2 },
      ],
    },
    // ── Suppliers & IT Providers ─────────────────────────────────────────────
    {
      id: "nis2-11",
      categoryId: "suppliers",
      options: [
        { id: "nis2-11-yes",    riskScore: 0 },
        { id: "nis2-11-partly", riskScore: 1 },
        { id: "nis2-11-no",     riskScore: 2 },
      ],
    },
    {
      id: "nis2-12",
      categoryId: "suppliers",
      options: [
        { id: "nis2-12-yes",    riskScore: 0 },
        { id: "nis2-12-partly", riskScore: 1 },
        { id: "nis2-12-no",     riskScore: 2 },
      ],
    },
  ],
};
