## Plan: Compliance Risk Hub & SME Assessments

Create a centralized "Risk Hub" landing page that offers multiple targeted assessments. Instead of hardcoding the existing quiz, we will abstract the assessment engine to support dynamic questionnaires. We will implement the existing practical NIS2 and GDPR self-assessments, along with two new crucial 2026 assessments (Everyday AI Reality Check and Digital Deception Test), all using a simple Yes/Partly/No scoring model.

**Steps**
1. **Refactor Landing Page**: Update [src/app/[lang]/assessment/page.tsx](src/app/[lang]/assessment/page.tsx) into a "quiet" Risk Hub where users select between "Personal Digital Safety", "NIS2 Quick Check", "GDPR Quick Check", "AI Reality Check", and "Digital Deception Test".
2. **Abstract Assessment Engine**: Generalize `AssessmentFlow.tsx` and [src/lib/assessment/types.ts](src/lib/assessment/types.ts) so quizzes are driven by data files rather than hardcoded logic.
3. **Implement NIS2 Quiz Data**: Create `src/lib/assessment/nis2-questions.ts` mapping the provided 6 categories (Applicability, Systems, Hygiene, Incidents, Backups, Suppliers) to a Yes (0 risk), Partly (1 risk), No (2 risk) scale.
4. **Implement GDPR Quiz Data**: Create `src/lib/assessment/gdpr-questions.ts` mapping the provided 6 categories (Awareness, Documentation, Transparency, Rights, Security, Breaches) to the same scale.
5. **Implement AI Reality Check Data**: Create `src/lib/assessment/ai-questions.ts` focusing on GenAI safety, data leakage risks, and AI Act basics.
6. **Implement Digital Deception Test Data**: Create `src/lib/assessment/deception-questions.ts` focusing on modern fraud like deepfakes and AI voice cloning targeting individuals and SMEs.
7. **Update Scoring & Results**: Modify [src/lib/assessment/scoring.ts](src/lib/assessment/scoring.ts) and `ResultsView.tsx` to output the specific tailored results based on the score thresholds.
8. **Dynamic Routing**: Create `src/app/[lang]/assessment/[quizId]/page.tsx` to load the appropriate quiz flow.

**Relevant files**
- [src/app/[lang]/assessment/page.tsx](src/app/[lang]/assessment/page.tsx) — Transform into the Risk Hub selection page.
- [src/lib/assessment/types.ts](src/lib/assessment/types.ts) — Update to support multiple quiz schemas.
- `src/lib/assessment/nis2-questions.ts` (new) — The NIS2 checklist.
- `src/lib/assessment/gdpr-questions.ts` (new) — The GDPR checklist.
- `src/lib/assessment/ai-questions.ts` (new) — The Everyday AI Reality Check.
- `src/lib/assessment/deception-questions.ts` (new) — The Digital Deception Test.
- `src/app/[lang]/assessment/[quizId]/page.tsx` (new) — Dynamic route for quizzes.

**Verification**
1. Open the assessment landing page and see all 5 distinct quiz options.
2. Complete the NIS2 checklist with mostly "No" and verify it recommends immediate action.
3. Complete the AI Reality Check and verify the AI Act/Data leak guidance outputs properly.
4. Verify the original Personal Digital Safety assessment still works correctly on its dynamic route.

**Decisions**
- The Yes/Partly/No format maps perfectly to our existing 0/1/2 risk scoring model.
- Keep the language simple, emotional, and non-legalistic, exactly as drafted in the markdown files.