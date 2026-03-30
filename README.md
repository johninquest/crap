# Cyber Risk Assessment Platform

A web-based assessment tool that helps individuals and small businesses understand their cyber risk exposure and get actionable recommendations — without jargon or fear-driven upselling.

## 📌 What This Does

- **Simple Risk Assessment**: Answer plain-language questions about your digital habits and security practices
- **Clear Scoring**: Get an overall risk score with category breakdowns (accounts, devices, backups, awareness)
- **Actionable Recommendations**: Receive prioritized, effort-vs-impact guidance on what matters most
- **Incident Guidance**: Understand what to do if something happens — and common mistakes to avoid
- **Shareable Reports**: Generate human-readable summaries you can download or print

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) 18+ or [Bun](https://bun.sh/)

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

3. **Open your browser:** Navigate to [http://localhost:3000](http://localhost:3000)

The app will auto-update as you edit files.

## 🛑 Shutting Down

- **Development server**: `Ctrl+C` in the terminal
- No database cleanup needed (assessment data is client-side only)

## 🔧 Development Guide

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx            # Home landing page
│   ├── assessment/         # Assessment flow
│   │   ├── page.tsx
│   │   └── result/
│   └── layout.tsx          # Root layout
├── components/
│   ├── assessment/         # Assessment UI components
│   ├── layout/             # Header/navigation
│   └── ui/                 # Reusable UI components
└── lib/
    ├── config.ts           # App configuration
    └── assessment/
        ├── types.ts        # TypeScript types
        ├── questions.ts    # Assessment questions
        └── scoring.ts      # Scoring logic
```

### Common Tasks

#### Run the development server
```bash
npm run dev
```

#### Build for production
```bash
npm run build
npm start
```

#### Run linting
```bash
npm run lint
```

#### Add/Update Assessment Questions
Edit [src/lib/assessment/questions.ts](src/lib/assessment/questions.ts) to modify the questionnaire content.

#### Modify Scoring Logic
Update [src/lib/assessment/scoring.ts](src/lib/assessment/scoring.ts) to change how risk categories are calculated.

#### Edit UI Components
Components are located in `src/components/`. Key files:
- [Assessment flow](src/app/assessment/AssessmentFlow.tsx)
- [Results view](src/app/assessment/result/ResultsView.tsx)

### Tech Stack
- **Framework**: [Next.js 16](https://nextjs.org/) (React 19)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Linting**: [ESLint 9](https://eslint.org/)

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) — features and API reference
- [Next.js Tutorial](https://nextjs.org/learn) — interactive walkthrough
- [React Documentation](https://react.dev) — component patterns

## 📦 Production Deployment

Deploy on [Vercel](https://vercel.com) (recommended for Next.js):

```bash
# Push to GitHub
git push origin main

# Deploy automatically from Vercel dashboard
```

For other hosting:
1. Build: `npm run build`
2. Deploy the `.next` folder and `public` files

## 📋 Assessment Data Privacy

- All assessments run locally in the browser
- No data is sent to external servers
- Results can be downloaded/printed for personal records

## 🤝 Contributing

[Add contribution guidelines if applicable]

## 📄 License

[Add license information if applicable]
