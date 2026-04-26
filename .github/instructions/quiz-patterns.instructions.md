---
description: "Use when creating, modifying, or debugging quiz logic, quiz flows, quiz result views, or compliance check pages (GDPR, NIS2, AI Act, rules-finder). Covers the three-layer architecture, scoring system, storage, analytics events, and quiz registration."
applyTo: ["src/lib/quiz/**/*.ts", "src/components/quiz/**/*.tsx", "src/app/[lang]/*/page.tsx", "src/app/[lang]/*/result/**"]
---

# Quiz Architecture Patterns

## Three-Layer Architecture

All compliance checks follow this exact layering:

```
Layer 1 — Definition  src/lib/quiz/{slug}.ts
Layer 2 — Registry    src/lib/quiz/registry.ts
Layer 3 — Scoring     src/lib/quiz/scoring.ts
```

### Layer 1: Definition file (`src/lib/quiz/{slug}.ts`)

Exports a `QuizDefinition` constant. Contains **language-agnostic** data only:
- `id` — matches the `QuizId` union type
- `slug` — matches the route segment (e.g. `"gdpr-check"`)
- `storageKey` — sessionStorage key (e.g. `"quiz_gdpr_result"`)
- `categories[]` — `{ id, icon }`
- `baseQuestions[]` — `{ id, categoryId, options: [{ id, riskScore }] }`

No translated text in the definition file. Text lives in the dictionaries.

### Layer 2: Registry (`src/lib/quiz/registry.ts`)

- Import and register the new `QuizDefinition` in `QUIZ_REGISTRY`
- Add a mapping in `quizDictSection()` to the correct `dict.quiz.*` key
- Add the new `QuizId` value to the `QuizId` union in `src/lib/quiz/types.ts`

### Layer 3: Scoring (`src/lib/quiz/scoring.ts`)

`calculateQuizResult()` is generic — works for all quizzes. No per-quiz scoring changes needed unless the risk thresholds differ. Current thresholds: `< 34` → low, `< 67` → medium, `≥ 67` → high.

## Storage

- **All results go to `sessionStorage` only** — there is no backend or database.
- Read/write using the `storageKey` from the quiz definition.
- Storage keys are also catalogued in `src/lib/config.ts` (`STORAGE_KEYS`).

## Analytics

Fire these two events (already implemented in `src/lib/analytics.ts`):
```ts
trackQuizStarted(quizId)     // when user clicks start
trackQuizCompleted(quizId)   // when result is calculated and stored
```
Both dispatch to GA4 and PostHog simultaneously.

## Route Structure for a New Check

```
src/app/[lang]/{slug}/
  page.tsx           ← server component, renders <QuizFlow>
  result/
    page.tsx         ← server component, renders <QuizResultsView> or custom ResultsView
```

## QuizFlow Component

`<QuizFlow quizId="..." dict={dict} />` — handles intro screen + question progression internally. The page just needs to pass a localized quiz ID and dictionary.

## Risk Levels

Type `RiskLevel = "low" | "medium" | "high"` — from `@/lib/assessment/types`.
