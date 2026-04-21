export interface QuestionDict {
  text: string;
  hint?: string;
  options: Record<string, string>;
}

// ─── Quiz Engine Dictionary Types ────────────────────────────────────────────

export interface QuizResultLevel {
  narrative: string;
  actions: string[];
}

export interface QuizSectionDict {
  metaTitle: string;
  metaDesc: string;
  title: string;
  subtitle: string;
  description: string;
  estimatedTime: string;
  questionCount: string;
  categories: Record<string, string>;
  questions: Record<string, { text: string; hint?: string }>;
  results: {
    low: QuizResultLevel;
    medium: QuizResultLevel;
    high: QuizResultLevel;
  };
}

export interface QuizCommonDict {
  start: string;
  next: string;
  seeResults: string;
  questionOf: string;
  pctComplete: string;
  chooseAnswer: string;
  retake: string;
  print: string;
  completedOn: string;
  overallTitle: string;
  breakdownTitle: string;
  whatNext: string;
  optionYes: string;
  optionPartly: string;
  optionNo: string;
}

export interface RecommendationDict {
  title: string;
  description: string;
}

export interface IncidentDict {
  title: string;
  description: string;
}

export interface LegalSection {
  heading: string;
  body: string;
}

export interface LegalPageDict {
  metaTitle: string;
  metaDesc: string;
  pageTitle: string;
  lastUpdated?: string;
  intro?: string;
  sections: LegalSection[];
}

export interface CheckEntry {
  title: string;
  description: string;
  tooltip: string;
  time: string;
  cta: string;
}

export interface Dictionary {
  common: {
    riskLow: string;
    riskMedium: string;
    riskHigh: string;
    langSwitch: string;
  };
  header: Record<string, never>;
  footer: {
    madeBy: string;
    toolsLabel: string;
    checks: {
      assessment: string;
      gdprCheck: string;
      nis2Check: string;
      aiCheck: string;
      rulesFinder: string;
    };
    legal: {
      privacy: string;
      imprint: string;
    };
  };
  home: {
    badge: string;
    heroTitle: string;
    heroBody: string;
    heroCtaIndividuals: string;
    heroCtaBusiness: string;
    heroDisclaimer: string;
    individualsTitle: string;
    individualsSubtitle: string;
    businessTitle: string;
    businessSubtitle: string;
    checks: {
      assessment: CheckEntry;
      gdpr: CheckEntry;
      nis2: CheckEntry;
      aiCheck: CheckEntry;
      rulesFinder: CheckEntry;
    };
    quote: string;
    quoteAttrib: string;
    footerTagline: string;
  };
  assessment: {
    metaTitle: string;
    metaDesc: string;
    pageTitle: string;
    pageSubtitle: string;
    questionOf: string;
    pctComplete: string;
    chooseAnswer: string;
    seeResults: string;
    nextQuestion: string;
  };
  results: {
    metaTitle: string;
    metaDesc: string;
    pageTitle: string;
    pageSubtitle: string;
    overallTitle: string;
    assessed: string;
    narrativeLow: string;
    narrativeMedium: string;
    narrativeHigh: string;
    breakdownTitle: string;
    recsTitle: string;
    recsSubtitle: string;
    incidentTitle: string;
    incidentSubtitle: string;
    businessCta: string;
    businessCtaBody: string;
    businessCtaBtn: string;
    retake: string;
    print: string;
  };
  modules: Record<string, string>;
  questions: Record<string, QuestionDict>;
  recommendations: Record<string, RecommendationDict>;
  incident: Record<string, IncidentDict>;
  quiz: {
    common: QuizCommonDict;
    nis2: QuizSectionDict;
    gdpr: QuizSectionDict;
    aiCheck: QuizSectionDict;
  };
  legal: {
    privacy: LegalPageDict;
    imprint: LegalPageDict;
  };
  rulesFinder: {
    metaTitle: string;
    metaDesc: string;
    pageTitle: string;
    pageSubtitle: string;
    description: string;
    estimatedTime: string;
    questionCount: string;
    start: string;
    next: string;
    resultMetaTitle: string;
    resultMetaDesc: string;
    resultPageTitle: string;
    resultPageSubtitle: string;
    resultApplies: string;
    resultMayApply: string;
    resultNoMatch: string;
    resultNoMatchBody: string;
    resultDeepDive: string;
    resultRetake: string;
    questions: {
      q1: { text: string; hint: string; yes: string; no: string; unsure: string };
      q2: { text: string; hint: string; yes: string; no: string; unsure: string };
      q3: { text: string; hint: string; yes: string; no: string; unsure: string };
    };
    rules: {
      nis2: { name: string; summary: string; ctaLabel: string };
      gdpr: { name: string; summary: string; ctaLabel: string };
      aiAct: { name: string; summary: string; ctaLabel: string };
    };
  };
}
