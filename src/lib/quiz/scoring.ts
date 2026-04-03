import type {
  QuizAnswer,
  QuizCategoryScore,
  QuizDefinition,
  QuizQuestion,
  QuizResult,
} from "./types";
import type { RiskLevel } from "@/lib/assessment/types";

function riskLevelFromScore(score: number): RiskLevel {
  if (score < 34) return "low";
  if (score < 67) return "medium";
  return "high";
}

export function calculateQuizResult(
  quizId: QuizDefinition["id"],
  questions: QuizQuestion[],
  categoryIcons: Record<string, string>,
  answers: QuizAnswer[],
  categoryLabels: Record<string, string>
): QuizResult {
  const categoryIds = [...new Set(questions.map((q) => q.categoryId))];

  const categoryScores: QuizCategoryScore[] = categoryIds.map((catId) => {
    const catQuestions = questions.filter((q) => q.categoryId === catId);
    const maxScore = catQuestions.length * 2;

    const earned = catQuestions.reduce((sum, q) => {
      const answer = answers.find((a) => a.questionId === q.id);
      return sum + (answer?.riskScore ?? 0);
    }, 0);

    const score = maxScore === 0 ? 0 : Math.round((earned / maxScore) * 100);

    return {
      categoryId: catId,
      label: categoryLabels[catId] ?? catId,
      icon: categoryIcons[catId] ?? "📋",
      score,
      riskLevel: riskLevelFromScore(score),
    };
  });

  const overallScore =
    categoryScores.length === 0
      ? 0
      : Math.round(
          categoryScores.reduce((sum, c) => sum + c.score, 0) /
            categoryScores.length
        );

  return {
    quizId,
    overallScore,
    overallRiskLevel: riskLevelFromScore(overallScore),
    categoryScores,
    completedAt: new Date().toISOString(),
  };
}
