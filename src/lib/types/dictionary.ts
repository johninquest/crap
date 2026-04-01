export interface QuestionDict {
  text: string;
  hint?: string;
  options: Record<string, string>;
}

export interface RecommendationDict {
  title: string;
  description: string;
}

export interface IncidentDict {
  title: string;
  description: string;
}

export interface Dictionary {
  common: {
    riskLow: string;
    riskMedium: string;
    riskHigh: string;
    langSwitch: string;
  };
  header: {
    startCheck: string;
  };
  home: {
    badge: string;
    heroTitle1: string;
    heroTitle2: string;
    heroBody: string;
    heroCta: string;
    heroDisclaimer: string;
    pillars: Array<{ title: string; body: string }>;
    coversTitle: string;
    coversSubtitle: string;
    modules: Array<{ label: string }>;
    quote: string;
    quoteAttrib: string;
    ctaTitle: string;
    ctaBody: string;
    ctaBtn: string;
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
    retake: string;
    print: string;
  };
  modules: Record<string, string>;
  questions: Record<string, QuestionDict>;
  recommendations: Record<string, RecommendationDict>;
  incident: Record<string, IncidentDict>;
}
