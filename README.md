# CyberCL – Compliance & Cyber Risk Checks

A multilingual (EN/DE) web platform offering free, plain-language self-assessments for individuals and small businesses across cyber security, data privacy, and AI compliance. No accounts, no data collection, no jargon.

## Available Checks

| Check | Route | Target audience | Questions | Regulatory basis |
|---|---|---|---|---|
| **Personal Cyber Risk Check** | `/[lang]/assessment` | Individuals | 10 | General best practice |
| **NIS2 Cyber Security Check** | `/[lang]/nis2-check` | SMEs | 12 | NIS2 Directive, BSI |
| **GDPR Privacy Awareness Check** | `/[lang]/gdpr-check` | Individuals | 10 | GDPR |
| **Everyday AI Reality Check** | `/[lang]/ai-check` | SMEs / freelancers | 9 | EU AI Act, GDPR Art. 22 |

Each check:
- Produces a scored result with category breakdown and tailored action items
- Is printable as a self-contained score document (`/[lang]/*/result`)
- Is statically rendered with full SEO metadata in both languages
- Stores results in `sessionStorage` only — nothing leaves the browser

## Quick Start

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the middleware will redirect to your preferred locale.

```bash
npm run build   # production build
npm run lint    # ESLint
```

## Project Structure

```
src/
├── app/
│   └── [lang]/
│       ├── page.tsx                  # Landing page
│       ├── assessment/               # Personal Cyber Risk Check
│       │   ├── AssessmentFlow.tsx
│       │   └── result/ResultsView.tsx
│       ├── nis2-check/               # NIS2 Cyber Security Check
│       ├── gdpr-check/               # GDPR Privacy Awareness Check
│       └── ai-check/                 # Everyday AI Reality Check
├── components/
│   ├── assessment/                   # QuestionCard, ProgressBar
│   ├── quiz/                         # QuizFlow, QuizResultsView (generic engine)
│   ├── layout/                       # Header, LanguageSwitcher
│   └── ui/                           # Button, RiskBadge
├── dictionaries/
│   ├── en.json                       # English copy for all checks
│   └── de.json                       # German translations
└── lib/
    ├── config.ts
    ├── assessment/                   # Original personal check engine
    │   ├── types.ts
    │   ├── questions.ts
    │   └── scoring.ts
    ├── quiz/                         # Generic quiz engine (NIS2 / GDPR / AI)
    │   ├── types.ts
    │   ├── scoring.ts
    │   ├── registry.ts               # Quiz lookup + i18n merge
    │   ├── nis2.ts
    │   ├── gdpr.ts
    │   └── ai-check.ts
    └── types/
        └── dictionary.ts             # Strict TypeScript interface for all i18n keys
```

## Adding a New Quiz

1. Define your quiz in `src/lib/quiz/yourquiz.ts` (copy `nis2.ts` as a template — set a unique `id`, `slug`, `storageKey`, `accentColor`, `categories`, and `baseQuestions`)
2. Register it in `src/lib/quiz/registry.ts`
3. Add it to the `QuizId` union in `src/lib/quiz/types.ts`
4. Add the `quiz.yourquiz` section to `src/lib/types/dictionary.ts`, `en.json`, and `de.json`
5. Create `src/app/[lang]/your-slug/page.tsx` and `result/page.tsx` (copy any existing quiz page pair)

## Scoring Model

All checks use a consistent 0–100 risk score per category:

```
category_score = (sum of answer riskScores) / (num_questions × 2) × 100
overall_score  = average of category scores
```

Answer risk scores: **Yes = 0**, **Partly = 1**, **No = 2**

Risk thresholds: `< 34` → Low · `34–66` → Medium · `≥ 67` → High

## Tech Stack

- **Framework**: Next.js 16 (App Router, React 19)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript 5 (strict)
- **i18n**: Static locale routing (`/en/`, `/de/`) via middleware
- **Analytics**: Google Analytics 4 (optional, via `NEXT_PUBLIC_GA_MEASUREMENT_ID`)

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | Google Analytics 4 Measurement ID |

## Deployment

The app is fully static (`generateStaticParams` on all routes). Deploy on Vercel or any static host:

```bash
npm run build
# Output: .next/  (Vercel) or export with `output: 'export'` for plain static hosting
```

## Data Privacy

- No personal data is collected or transmitted
- Assessment results are stored in `sessionStorage` only and cleared when the tab closes
- No cookies set by the application itself
