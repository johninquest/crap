import { questions } from "./questions";
import type {
  Answer,
  AssessmentModule,
  AssessmentResult,
  IncidentStep,
  ModuleScore,
  Recommendation,
  RiskLevel,
} from "./types";

const MODULE_LABELS: Record<AssessmentModule, string> = {
  accounts: "Accounts & Passwords",
  devices:  "Devices & Software",
  backups:  "Backups & Recovery",
  behavior: "Habits & Awareness",
};

function riskLevelFromScore(score: number): RiskLevel {
  if (score < 34) return "low";
  if (score < 67) return "medium";
  return "high";
}

function scoreModule(module: AssessmentModule, answers: Answer[]): ModuleScore {
  const moduleQuestions = questions.filter((q) => q.module === module);
  const maxScore = moduleQuestions.length * 2; // max riskScore per question is 2

  const earned = moduleQuestions.reduce((sum, q) => {
    const answer = answers.find((a) => a.questionId === q.id);
    return sum + (answer?.riskScore ?? 0);
  }, 0);

  const score = maxScore === 0 ? 0 : Math.round((earned / maxScore) * 100);

  return {
    module,
    label: MODULE_LABELS[module],
    score,
    riskLevel: riskLevelFromScore(score),
  };
}

const ALL_RECOMMENDATIONS: Recommendation[] = [
  {
    id: "rec-pw-manager",
    title: "Start using a password manager",
    description:
      "Apps like Bitwarden (free) or 1Password generate and store unique passwords for every account. You only need to remember one master password.",
    effort: "low",
    impact: "high",
    module: "accounts",
  },
  {
    id: "rec-2fa-email",
    title: "Enable 2FA on your email account",
    description:
      "Go to your email settings and turn on two-factor authentication. Use an app like Google Authenticator or Authy — not SMS if you can avoid it.",
    effort: "low",
    impact: "high",
    module: "accounts",
  },
  {
    id: "rec-updates",
    title: "Turn on automatic software updates",
    description:
      "Enable auto-updates on your phone and laptop. The single most effective thing you can do to close known security gaps.",
    effort: "low",
    impact: "high",
    module: "devices",
  },
  {
    id: "rec-screen-lock",
    title: "Set your device to lock after 1–2 minutes",
    description:
      "A locked screen protects your data if you lose your device. Set it in your phone/laptop display settings right now.",
    effort: "low",
    impact: "medium",
    module: "devices",
  },
  {
    id: "rec-backup",
    title: "Set up automatic cloud backups",
    description:
      "Enable iCloud, Google Drive, or OneDrive backups. Make sure photos and documents are included. Verify the backup is actually running.",
    effort: "low",
    impact: "high",
    module: "backups",
  },
  {
    id: "rec-recovery-plan",
    title: "Write down your account recovery options",
    description:
      "Note your 2FA backup codes, recovery email addresses, and any recovery keys. Store them somewhere physically safe (not just on your phone).",
    effort: "low",
    impact: "high",
    module: "backups",
  },
  {
    id: "rec-phishing",
    title: "Learn to spot phishing emails",
    description:
      "Check the sender's actual email address (not just the display name). Never click links in unexpected 'urgent' emails — go directly to the website instead.",
    effort: "low",
    impact: "high",
    module: "behavior",
  },
  {
    id: "rec-incident-plan",
    title: "Know your first 3 steps if you're hacked",
    description:
      "Change your password → revoke active sessions → check for forwarding rules in your email. Write these down and save them.",
    effort: "low",
    impact: "medium",
    module: "behavior",
  },
];

function pickTopRecommendations(
  moduleScores: ModuleScore[],
  answers: Answer[]
): Recommendation[] {
  // Sort modules by risk (highest first)
  const sortedModules = [...moduleScores].sort((a, b) => b.score - a.score);

  const picked: Recommendation[] = [];

  for (const ms of sortedModules) {
    if (picked.length >= 5) break;
    const recs = ALL_RECOMMENDATIONS.filter(
      (r) => r.module === ms.module && !picked.find((p) => p.id === r.id)
    );
    picked.push(...recs.slice(0, 2 - picked.filter((p) => p.module === ms.module).length));
  }

  // Fill up to 3 if we haven't reached it
  if (picked.length < 3) {
    for (const rec of ALL_RECOMMENDATIONS) {
      if (picked.length >= 3) break;
      if (!picked.find((p) => p.id === rec.id)) picked.push(rec);
    }
  }

  return picked.slice(0, 5);
}

const INCIDENT_GUIDANCE: IncidentStep[] = [
  {
    order: 1,
    title: "Don't panic — act quickly",
    description:
      "Speed matters, but mistakes under panic make things worse. Take a breath, then work through these steps.",
  },
  {
    order: 2,
    title: "Change your password immediately",
    description:
      "Go directly to the service's website (don't click any links in suspicious emails). Change your password from a trusted device.",
  },
  {
    order: 3,
    title: "Sign out all other sessions",
    description:
      "Most services have a 'sign out all devices' option in security settings. Use it to kick out any attacker who is already logged in.",
  },
  {
    order: 4,
    title: "Check your email for forwarding rules",
    description:
      "Attackers often add a forwarding rule to quietly receive copies of your emails. Check Settings → Forwarding and delete any rules you didn't create.",
  },
  {
    order: 5,
    title: "Secure your account recovery options",
    description:
      "Verify that your recovery email and phone number are still yours. Attackers sometimes change these to lock you out permanently.",
  },
  {
    order: 6,
    title: "Tell the people who need to know",
    description:
      "If a work account was involved, notify your IT contact or manager immediately. If personal data was leaked, consider alerting your bank.",
  },
];

export function calculateResult(answers: Answer[]): AssessmentResult {
  const modules: AssessmentModule[] = ["accounts", "devices", "backups", "behavior"];
  const moduleScores = modules.map((m) => scoreModule(m, answers));

  const overallScore = Math.round(
    moduleScores.reduce((sum, ms) => sum + ms.score, 0) / moduleScores.length
  );

  return {
    overallScore,
    overallRiskLevel: riskLevelFromScore(overallScore),
    moduleScores,
    topRecommendations: pickTopRecommendations(moduleScores, answers),
    incidentGuidance: INCIDENT_GUIDANCE,
    completedAt: new Date().toISOString(),
  };
}
