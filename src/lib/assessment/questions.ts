import type { Question } from "./types";
import type { QuestionDict } from "@/lib/types/dictionary";

// Base structure (IDs, modules, riskScores) — locale-independent
const BASE_QUESTIONS: Array<{
  id: string;
  module: Question["module"];
  options: Array<{ id: string; riskScore: 0 | 1 | 2 }>;
}> = [
  // ── Accounts ──────────────────────────────────────────────────────────────
  {
    id: "acc-1", module: "accounts",
    options: [
      { id: "acc-1-a", riskScore: 0 },
      { id: "acc-1-b", riskScore: 1 },
      { id: "acc-1-c", riskScore: 2 },
    ],
  },
  {
    id: "acc-2", module: "accounts",
    options: [
      { id: "acc-2-a", riskScore: 0 },
      { id: "acc-2-b", riskScore: 1 },
      { id: "acc-2-c", riskScore: 2 },
    ],
  },
  {
    id: "acc-3", module: "accounts",
    options: [
      { id: "acc-3-a", riskScore: 0 },
      { id: "acc-3-b", riskScore: 1 },
      { id: "acc-3-c", riskScore: 2 },
    ],
  },
  // ── Devices ───────────────────────────────────────────────────────────────
  {
    id: "dev-1", module: "devices",
    options: [
      { id: "dev-1-a", riskScore: 0 },
      { id: "dev-1-b", riskScore: 1 },
      { id: "dev-1-c", riskScore: 2 },
    ],
  },
  {
    id: "dev-2", module: "devices",
    options: [
      { id: "dev-2-a", riskScore: 0 },
      { id: "dev-2-b", riskScore: 1 },
      { id: "dev-2-c", riskScore: 2 },
    ],
  },
  {
    id: "dev-3", module: "devices",
    options: [
      { id: "dev-3-a", riskScore: 0 },
      { id: "dev-3-b", riskScore: 1 },
      { id: "dev-3-c", riskScore: 2 },
    ],
  },
  // ── Backups ───────────────────────────────────────────────────────────────
  {
    id: "bak-1", module: "backups",
    options: [
      { id: "bak-1-a", riskScore: 0 },
      { id: "bak-1-b", riskScore: 1 },
      { id: "bak-1-c", riskScore: 2 },
    ],
  },
  {
    id: "bak-2", module: "backups",
    options: [
      { id: "bak-2-a", riskScore: 0 },
      { id: "bak-2-b", riskScore: 1 },
      { id: "bak-2-c", riskScore: 2 },
    ],
  },
  // ── Behavior ──────────────────────────────────────────────────────────────
  {
    id: "beh-1", module: "behavior",
    options: [
      { id: "beh-1-a", riskScore: 0 },
      { id: "beh-1-b", riskScore: 1 },
      { id: "beh-1-c", riskScore: 2 },
    ],
  },
  {
    id: "beh-2", module: "behavior",
    options: [
      { id: "beh-2-a", riskScore: 0 },
      { id: "beh-2-b", riskScore: 1 },
      { id: "beh-2-c", riskScore: 2 },
    ],
  },
];

// Kept for backwards compatibility with scoring.ts (structural data only)
export const questions: Question[] = [
  // ── Accounts ────────────────────────────────────────────────────────────
  {
    id: "acc-1",
    module: "accounts",
    text: "Do you use a unique password for each important account (email, banking, work)?",
    hint: "Reusing passwords is one of the most common causes of account takeovers.",
    options: [
      { id: "acc-1-a", label: "Yes, always", riskScore: 0 },
      { id: "acc-1-b", label: "Sometimes — for the important ones", riskScore: 1 },
      { id: "acc-1-c", label: "No, I reuse the same few passwords", riskScore: 2 },
    ],
  },
  {
    id: "acc-2",
    module: "accounts",
    text: "Do you have two-factor authentication (2FA) enabled on your email account?",
    hint: "Email is the master key to all your other accounts. 2FA adds a critical second lock.",
    options: [
      { id: "acc-2-a", label: "Yes", riskScore: 0 },
      { id: "acc-2-b", label: "Not sure", riskScore: 1 },
      { id: "acc-2-c", label: "No", riskScore: 2 },
    ],
  },
  {
    id: "acc-3",
    module: "accounts",
    text: "Do you use a password manager?",
    options: [
      { id: "acc-3-a", label: "Yes", riskScore: 0 },
      { id: "acc-3-b", label: "I write passwords down / save them in a notes app", riskScore: 1 },
      { id: "acc-3-c", label: "No, I remember them all", riskScore: 2 },
    ],
  },

  // ── Devices ─────────────────────────────────────────────────────────────
  {
    id: "dev-1",
    module: "devices",
    text: "How up-to-date is the software on your main device (phone or laptop)?",
    hint: "Most successful attacks exploit known vulnerabilities that already have patches available.",
    options: [
      { id: "dev-1-a", label: "Auto-updates are on and it's current", riskScore: 0 },
      { id: "dev-1-b", label: "I update occasionally when prompted", riskScore: 1 },
      { id: "dev-1-c", label: "I rarely update or don't know", riskScore: 2 },
    ],
  },
  {
    id: "dev-2",
    module: "devices",
    text: "Do your devices lock automatically after a short period of inactivity?",
    options: [
      { id: "dev-2-a", label: "Yes, with a PIN, password or biometric", riskScore: 0 },
      { id: "dev-2-b", label: "Sometimes — not consistently", riskScore: 1 },
      { id: "dev-2-c", label: "No, I rarely lock them", riskScore: 2 },
    ],
  },
  {
    id: "dev-3",
    module: "devices",
    text: "Have you ever connected to public Wi-Fi (café, airport) without a VPN?",
    options: [
      { id: "dev-3-a", label: "I avoid public Wi-Fi or always use a VPN", riskScore: 0 },
      { id: "dev-3-b", label: "Occasionally for non-sensitive browsing", riskScore: 1 },
      { id: "dev-3-c", label: "Yes, including for email or banking", riskScore: 2 },
    ],
  },

  // ── Backups ──────────────────────────────────────────────────────────────
  {
    id: "bak-1",
    module: "backups",
    text: "Do you have recent backups of your most important files (photos, documents, work)?",
    hint: "Ransomware and device loss are both solved by a backup. Without one, you may lose everything permanently.",
    options: [
      { id: "bak-1-a", label: "Yes, automatic cloud or external backups", riskScore: 0 },
      { id: "bak-1-b", label: "Occasional manual copies", riskScore: 1 },
      { id: "bak-1-c", label: "No backups", riskScore: 2 },
    ],
  },
  {
    id: "bak-2",
    module: "backups",
    text: "If your phone was stolen today, could you recover access to your accounts and data?",
    options: [
      { id: "bak-2-a", label: "Yes, I'm confident I could recover everything", riskScore: 0 },
      { id: "bak-2-b", label: "Partially — some things would be lost", riskScore: 1 },
      { id: "bak-2-c", label: "No, it would be very difficult", riskScore: 2 },
    ],
  },

  // ── Behavior ─────────────────────────────────────────────────────────────
  {
    id: "beh-1",
    module: "behavior",
    text: "How do you react to unexpected emails asking you to click a link or confirm your details?",
    hint: "Phishing is still the #1 way attackers get in — even for businesses.",
    options: [
      { id: "beh-1-a", label: "I verify the sender and never click unprompted links", riskScore: 0 },
      { id: "beh-1-b", label: "I'm careful but have clicked a few in the past", riskScore: 1 },
      { id: "beh-1-c", label: "I usually just click and see what it is", riskScore: 2 },
    ],
  },
  {
    id: "beh-2",
    module: "behavior",
    text: "Do you know what to do in the first 30 minutes if you suspect your account has been hacked?",
    options: [
      { id: "beh-2-a", label: "Yes, I know the steps clearly", riskScore: 0 },
      { id: "beh-2-b", label: "I have a rough idea", riskScore: 1 },
      { id: "beh-2-c", label: "No, I'd be lost", riskScore: 2 },
    ],
  },
];

export function getLocalizedQuestions(
  dictQuestions: Record<string, QuestionDict>
): Question[] {
  return BASE_QUESTIONS.map((bq) => {
    const dq = dictQuestions[bq.id];
    return {
      id: bq.id,
      module: bq.module,
      text: dq.text,
      hint: dq.hint,
      options: bq.options.map((opt) => ({
        id: opt.id,
        label: dq.options[opt.id] ?? opt.id,
        riskScore: opt.riskScore,
      })),
    };
  });
}
