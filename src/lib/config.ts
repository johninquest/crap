export const BRAND = {
  namePrefix: "Cyber",
  nameSuffix: "Checklist",
  get name() {
    return this.namePrefix + this.nameSuffix;
  },
  tagline:
    "A quick, clear check to understand your cyber risk — and what actually matters right now. No jargon, no scare tactics.",
  storageKey: "cyberclar_result",
} as const;

export const QUIZ_STORAGE_KEYS = {
  nis2:       "quiz_nis2_result",
  gdpr:       "quiz_gdpr_result",
  "ai-check": "quiz_ai_result",
} as const;
