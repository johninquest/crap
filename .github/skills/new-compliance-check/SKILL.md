---
name: new-compliance-check
description: "Use when adding a new compliance check, quiz, regulation check, or EU regulation readiness check to the app. Covers all 9 required touch points: quiz definition, registry, scoring, server pages, result view, EN+DE dictionaries, sitemap, and analytics. Reference implementations: gdpr-check and nis2-check."
argument-hint: "Name and slug for the new check, e.g. 'DORA Check, slug: dora-check'"
---

# New Compliance Check

## When to Use

Invoke this skill when the user asks to add a new compliance check, quiz, risk assessment, or regulation readiness check — e.g. "add a DORA check", "create a new EU AI Act compliance quiz", "add a supply chain regulation check".

## Required Touch Points (in order)

Work through each step in sequence. Use the GDPR check as the primary reference implementation.

---

### Step 1 — Quiz Definition

Create `src/lib/quiz/{slug}.ts` modelled on [src/lib/quiz/gdpr.ts](../../src/lib/quiz/gdpr.ts).

```ts
import type { QuizDefinition } from "./types";

export const MY_QUIZ: QuizDefinition = {
  id: "my-quiz",           // will be added to QuizId union
  slug: "my-quiz-check",   // matches route segment
  storageKey: "quiz_my_quiz_result",
  categories: [
    { id: "category_one", icon: "🔒" },
    { id: "category_two", icon: "📋" },
  ],
  baseQuestions: [
    {
      id: "my-quiz-1",
      categoryId: "category_one",
      options: [
        { id: "my-quiz-1-yes",    riskScore: 0 },
        { id: "my-quiz-1-partly", riskScore: 1 },
        { id: "my-quiz-1-no",     riskScore: 2 },
      ],
    },
    // ... add all questions
  ],
};
```

---

### Step 2 — Update Quiz Types

In `src/lib/quiz/types.ts`, add the new ID to the `QuizId` union:
```ts
export type QuizId = "nis2" | "gdpr" | "ai-check" | "my-quiz";
```

---

### Step 3 — Register in Registry

In `src/lib/quiz/registry.ts`:
1. Import the new definition: `import { MY_QUIZ } from "./my-quiz";`
2. Add to `QUIZ_REGISTRY`: `"my-quiz": MY_QUIZ`
3. Add a mapping in `quizDictSection()`:
```ts
"my-quiz": dict.quiz.myQuiz,
```
4. Update the dictionary type reference in the `map` object.

---

### Step 4 — Scoring

`calculateQuizResult()` in `src/lib/quiz/scoring.ts` is generic and works as-is. No changes needed unless the new check requires custom risk thresholds.

---

### Step 5 — Server Page

Create `src/app/[lang]/{slug}/page.tsx` modelled on [src/app/[lang]/gdpr-check/page.tsx](../../src/app/[lang]/gdpr-check/page.tsx):

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { Header } from "@/components/layout/Header";
import { QuizFlow } from "@/components/quiz/QuizFlow";
import { getLocalizedQuiz } from "@/lib/quiz/registry";
import { BRAND } from "@/lib/config";
import { buildAlternates, OG_IMAGE } from "@/lib/seo";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "de" }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return {
    title: `${dict.quiz.myQuiz.metaTitle} – ${BRAND.name}`,
    description: dict.quiz.myQuiz.metaDesc,
    openGraph: {
      title: `${dict.quiz.myQuiz.metaTitle} – ${BRAND.name}`,
      description: dict.quiz.myQuiz.metaDesc,
      type: "website",
      images: OG_IMAGE,
    },
    twitter: { card: "summary_large_image" },
    alternates: buildAlternates(lang, "/{slug}"),
  };
}

export default async function MyQuizPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const quiz = getLocalizedQuiz("my-quiz", dict);

  return (
    <>
      <Header lang={lang} langSwitch={dict.common.langSwitch} />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-10">
        <QuizFlow quiz={quiz} dict={dict} />
      </main>
    </>
  );
}
```

---

### Step 6 — Result Page

Create `src/app/[lang]/{slug}/result/page.tsx` modelled on [src/app/[lang]/gdpr-check/result/page.tsx](../../src/app/[lang]/gdpr-check/result/page.tsx).

Result pages are `robots: { index: false }` — they contain personal assessment data.

---

### Step 7 — Dictionary Keys (EN)

Add the quiz section to `src/dictionaries/en.json` under `quiz.myQuiz` (use camelCase key).

Required shape (matches `QuizSectionDict`):
```json
"myQuiz": {
  "metaTitle": "...",
  "metaDesc": "...",
  "title": "...",
  "subtitle": "...",
  "description": "...",
  "estimatedTime": "~X min",
  "questionCount": "X questions",
  "categories": {
    "category_one": "Category One Label"
  },
  "questions": {
    "my-quiz-1": { "text": "Question text here?", "hint": "Optional hint" }
  },
  "results": {
    "low":    { "narrative": "...", "actions": ["...", "..."] },
    "medium": { "narrative": "...", "actions": ["...", "..."] },
    "high":   { "narrative": "...", "actions": ["...", "..."] }
  }
}
```

---

### Step 8 — Dictionary Keys (DE)

Add the **exact same key structure** in `src/dictionaries/de.json` with German translations. Never skip this step — missing keys cause runtime errors.

---

### Step 9 — Sitemap & Navigation

- Add the new route to `src/app/sitemap.ts` for both `en` and `de`.
- Add a link/card to the landing page `src/app/[lang]/page.tsx` so users can discover the check.
- Add EN + DE navigation/card labels to both dictionaries if needed.

---

## Analytics

These events are already wired in `QuizFlow` via `src/lib/analytics.ts`:
- `{quizId}_started` — fires when the user clicks Start
- `{quizId}_completed` — fires when result is stored

No extra analytics code needed for standard checks.

## Checklist

- [ ] `src/lib/quiz/{slug}.ts` — definition
- [ ] `src/lib/quiz/types.ts` — QuizId union updated
- [ ] `src/lib/quiz/registry.ts` — registered + dict mapping
- [ ] `src/app/[lang]/{slug}/page.tsx` — server page
- [ ] `src/app/[lang]/{slug}/result/page.tsx` — result page
- [ ] `src/dictionaries/en.json` — quiz section added
- [ ] `src/dictionaries/de.json` — quiz section added (DE)
- [ ] `src/lib/types/dictionary.ts` — type updated if needed
- [ ] `src/app/sitemap.ts` — route added
- [ ] Landing page card/link added
