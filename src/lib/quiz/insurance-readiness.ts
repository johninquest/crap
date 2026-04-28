import type { QuizDefinition } from "./types";

export const INSURANCE_READINESS_QUIZ: QuizDefinition = {
  id: "insurance-readiness",
  slug: "insurance-readiness-check",
  storageKey: "quiz_insurance_readiness_result",
  categories: [
    { id: "access_identity",       icon: "🔑" },
    { id: "endpoint_network",      icon: "🛡️" },
    { id: "backup_recovery",       icon: "💾" },
    { id: "email_awareness",       icon: "📧" },
    { id: "incident_preparedness", icon: "📋" },
  ],
  baseQuestions: [
    // ── Access & Identity ─────────────────────────────────────────────────────
    {
      id: "ins-1",
      categoryId: "access_identity",
      options: [
        { id: "ins-1-yes",    riskScore: 0 },
        { id: "ins-1-partly", riskScore: 1 },
        { id: "ins-1-no",     riskScore: 2 },
      ],
    },
    {
      id: "ins-2",
      categoryId: "access_identity",
      options: [
        { id: "ins-2-yes",    riskScore: 0 },
        { id: "ins-2-partly", riskScore: 1 },
        { id: "ins-2-no",     riskScore: 2 },
      ],
    },
    // ── Endpoint & Network ────────────────────────────────────────────────────
    {
      id: "ins-3",
      categoryId: "endpoint_network",
      options: [
        { id: "ins-3-yes",    riskScore: 0 },
        { id: "ins-3-partly", riskScore: 1 },
        { id: "ins-3-no",     riskScore: 2 },
      ],
    },
    {
      id: "ins-4",
      categoryId: "endpoint_network",
      options: [
        { id: "ins-4-yes",    riskScore: 0 },
        { id: "ins-4-partly", riskScore: 1 },
        { id: "ins-4-no",     riskScore: 2 },
      ],
    },
    // ── Backup & Recovery ─────────────────────────────────────────────────────
    {
      id: "ins-5",
      categoryId: "backup_recovery",
      options: [
        { id: "ins-5-yes",    riskScore: 0 },
        { id: "ins-5-partly", riskScore: 1 },
        { id: "ins-5-no",     riskScore: 2 },
      ],
    },
    {
      id: "ins-6",
      categoryId: "backup_recovery",
      options: [
        { id: "ins-6-yes",    riskScore: 0 },
        { id: "ins-6-partly", riskScore: 1 },
        { id: "ins-6-no",     riskScore: 2 },
      ],
    },
    // ── Email & Staff Awareness ───────────────────────────────────────────────
    {
      id: "ins-7",
      categoryId: "email_awareness",
      options: [
        { id: "ins-7-yes",    riskScore: 0 },
        { id: "ins-7-partly", riskScore: 1 },
        { id: "ins-7-no",     riskScore: 2 },
      ],
    },
    {
      id: "ins-8",
      categoryId: "email_awareness",
      options: [
        { id: "ins-8-yes",    riskScore: 0 },
        { id: "ins-8-partly", riskScore: 1 },
        { id: "ins-8-no",     riskScore: 2 },
      ],
    },
    // ── Incident Preparedness ─────────────────────────────────────────────────
    {
      id: "ins-9",
      categoryId: "incident_preparedness",
      options: [
        { id: "ins-9-yes",    riskScore: 0 },
        { id: "ins-9-partly", riskScore: 1 },
        { id: "ins-9-no",     riskScore: 2 },
      ],
    },
    {
      id: "ins-10",
      categoryId: "incident_preparedness",
      options: [
        { id: "ins-10-yes",    riskScore: 0 },
        { id: "ins-10-partly", riskScore: 1 },
        { id: "ins-10-no",     riskScore: 2 },
      ],
    },
  ],
};
