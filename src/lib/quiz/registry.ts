import type { QuizDefinition, QuizId, LocalizedQuiz, QuizQuestion } from "./types";
import { NIS2_QUIZ } from "./nis2";
import { GDPR_QUIZ } from "./gdpr";
import { AI_CHECK_QUIZ } from "./ai-check";
import type { Dictionary } from "@/lib/types/dictionary";

const QUIZ_REGISTRY: Record<QuizId, QuizDefinition> = {
  nis2:        NIS2_QUIZ,
  gdpr:        GDPR_QUIZ,
  "ai-check":  AI_CHECK_QUIZ,
};

/** Returns the quiz definition for a given quiz ID. */
export function getQuizDefinition(quizId: QuizId): QuizDefinition {
  return QUIZ_REGISTRY[quizId];
}

/** Maps a QuizId to the corresponding dictionary key. */
function quizDictSection(quizId: QuizId, dict: Dictionary) {
  const map = {
    nis2:        dict.quiz.nis2,
    gdpr:        dict.quiz.gdpr,
    "ai-check":  dict.quiz.aiCheck,
  } as const;
  return map[quizId];
}

/**
 * Merges a quiz definition with localized text from the dictionary,
 * returning a fully localized quiz ready for rendering.
 */
export function getLocalizedQuiz(quizId: QuizId, dict: Dictionary): LocalizedQuiz {
  const definition = QUIZ_REGISTRY[quizId];
  const quizDict   = quizDictSection(quizId, dict);
  const common     = dict.quiz.common;

  const optionLabel: Record<string, string> = {
    yes:    common.optionYes,
    partly: common.optionPartly,
    no:     common.optionNo,
  };

  const questions: QuizQuestion[] = definition.baseQuestions.map((bq) => {
    const qDict = quizDict.questions[bq.id];
    return {
      id: bq.id,
      categoryId: bq.categoryId,
      text: qDict?.text ?? bq.id,
      hint: qDict?.hint,
      options: bq.options.map((opt) => {
        const suffix = opt.id.split("-").pop() ?? "";
        return {
          id: opt.id,
          label: optionLabel[suffix] ?? suffix,
          riskScore: opt.riskScore,
        };
      }),
    };
  });

  return {
    definition,
    questions,
    categoryLabels: quizDict.categories,
  };
}

/** Returns the category icon map for a given quiz. */
export function getCategoryIcons(quizId: QuizId): Record<string, string> {
  return Object.fromEntries(
    QUIZ_REGISTRY[quizId].categories.map((c) => [c.id, c.icon])
  );
}
