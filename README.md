# CyberCL – Compliance & Cyber Risk Checks

A multilingual (EN/DE) web platform offering free, plain-language self-assessments for individuals and small businesses across cyber security, data privacy, and AI compliance. No accounts, no data collection, no jargon.

## Available Checks

| Check | Route | Target audience | Questions | Regulatory basis |
|---|---|---|---|---|
| **Personal Cyber Risk Check** | `/[lang]/risk-check` | Individuals | 10 | General best practice |
| **NIS2 Cyber Security Check** | `/[lang]/nis2-check` | SMEs | 12 | NIS2 Directive, BSI |
| **GDPR Privacy Awareness Check** | `/[lang]/gdpr-check` | Individuals | 10 | GDPR |
| **EU AI Act Compliance Check** | `/[lang]/ai-check` | SMEs / freelancers | 9 | EU AI Act, GDPR Art. 22 |
| **Cyber Insurance Readiness Check** | `/[lang]/insurance-readiness-check` | SMEs | 10 | Cyber insurance underwriting practice |

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
content/
└── blog/                             # Markdown articles with YAML frontmatter
src/
├── app/
│   └── [lang]/
│       ├── page.tsx                  # Landing page
│       ├── blog/                     # Blog listing and post details
│       │   ├── page.tsx              # Blog index
│       │   └── [slug]/page.tsx       # Blog post detail
│       ├── risk-check/               # Personal Cyber Risk Check
│       │   ├── AssessmentFlow.tsx
│       │   └── result/ResultsView.tsx
│       ├── nis2-check/               # NIS2 Cyber Security Check
│       ├── gdpr-check/               # GDPR Privacy Awareness Check
│       ├── ai-check/                 # EU AI Act Compliance Check
│       └── insurance-readiness-check/ # Cyber Insurance Readiness Check
├── components/
│   ├── blog/                         # PostCard, KeyTakeaways, BlogCTA, Breadcrumbs
│   ├── assessment/                   # QuestionCard, ProgressBar
│   ├── quiz/                         # QuizFlow, QuizResultsView (generic engine)
│   ├── layout/                       # Header, LanguageSwitcher, Footer
│   └── ui/                           # Button, RiskBadge
├── dictionaries/
│   ├── en.json                       # English copy for all checks and blog
│   └── de.json                       # German translations
└── lib/
    ├── blog.ts                       # Blog markdown parser, frontmatter, read time
    ├── config.ts
    ├── assessment/                   # Original personal check engine
    │   ├── types.ts
    │   ├── questions.ts
    │   └── scoring.ts
    ├── quiz/                         # Generic quiz engine (NIS2 / GDPR / AI / Insurance)
        ├── types.ts
        ├── scoring.ts
        ├── registry.ts               # Quiz lookup + i18n merge
        ├── nis2.ts
        ├── gdpr.ts
        ├── ai-check.ts
        └── insurance-readiness.ts
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
| `LEGAL_OPERATOR_NAME` | Yes (for legal pages) | Legal entity or operator name shown on Imprint and Privacy pages |
| `LEGAL_ADDRESS_LINE` | Yes (for legal pages) | Street and house number for legal disclosures |
| `LEGAL_POSTAL_CODE_CITY` | Yes (for legal pages) | Postal code and city line for legal disclosures |
| `LEGAL_COUNTRY` | Yes (for legal pages) | Country for legal disclosures |
| `LEGAL_CONTACT_EMAIL` | Yes (for legal pages) | Contact email shown on Imprint and Privacy pages |
| `LEGAL_VAT_ID` | Yes (for imprint tax details) | VAT ID shown on the Imprint page |
| `LEGAL_REGISTER_COURT` | No | Local court for commercial register line on Imprint |
| `LEGAL_REGISTER_NUMBER` | No | Commercial register number line on Imprint |

Example `.env.local` for this project setup (JohnX Labs):

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=

LEGAL_OPERATOR_NAME="JohnX Labs"
LEGAL_ADDRESS_LINE="<street and number>"
LEGAL_POSTAL_CODE_CITY="<postal code> <city>"
LEGAL_COUNTRY="Germany"
LEGAL_CONTACT_EMAIL="<contact@johnxlabs.example>"
LEGAL_VAT_ID="DE123456789"
LEGAL_REGISTER_COURT=""
LEGAL_REGISTER_NUMBER=""
```

## Deployment

### Vercel / static hosting

The app is fully static (`generateStaticParams` on all routes). Deploy on Vercel or any static host:

```bash
npm run build
# Output: .next/  (Vercel) or export with `output: 'export'` for plain static hosting
```

### Docker (self-hosted)

The repo includes a multi-stage `Dockerfile` (node:24-alpine, standalone output) and a `docker-compose.yml` pre-configured for Traefik.

> **Note:** `NEXT_PUBLIC_*` environment variables are baked into the JS bundle at **build time**. Set them in your shell before building if you want analytics injected.

**With Docker Compose (Traefik):**

```bash
# Ensure the external Traefik proxy network exists (one-time setup)
docker network create proxy

# Optional: export NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
docker compose up -d --build
```

The container listens on port `3000` internally. The Compose file handles TLS and routing via Traefik labels for `cyberchecklist.app`.

**Without Compose:**

```bash
docker build -t cybercl .
docker run -d -p 3000:3000 --name cybercl cybercl
```

## Data Privacy

- No personal data is collected or transmitted
- Assessment results are stored in `sessionStorage` only and cleared when the tab closes
- No cookies set by the application itself
