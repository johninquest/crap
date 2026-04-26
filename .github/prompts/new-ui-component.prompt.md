---
description: "Scaffold a new reusable UI component in src/components/ui/ following project conventions"
argument-hint: "Component name and purpose, e.g. 'StatusBadge — shows a colored status label'"
agent: agent
---

Create a new reusable UI component for this Next.js + Tailwind project.

Component name and purpose: $input

## Steps

1. **Determine the file path**: `src/components/ui/{ComponentName}.tsx`

2. **Scaffold the component** following [src/components/ui/Button.tsx](../src/components/ui/Button.tsx) as the pattern:
   - Named export (not default export)
   - Props interface extending the relevant HTML element attributes where appropriate
   - Typed props with sensible defaults
   - No `"use client"` unless the component requires browser state or events

3. **Style with Tailwind only** using the project design tokens:
   - `bg-primary`, `bg-primary-hover`, `bg-primary-soft` for primary actions
   - `text-text`, `text-text-muted` for text
   - `bg-surface`, `bg-surface-muted` for backgrounds
   - `border-border` for borders
   - No raw Tailwind colors (`blue-500`, `gray-200`, etc.)
   - No custom CSS, no inline `style` props

4. **Accessibility**:
   - Include `focus-visible:outline-2 focus-visible:outline-offset-2` on interactive elements
   - Use semantic HTML elements
   - Add `sr-only` labels for icon-only controls

5. **Show a usage example** in a code comment or brief explanation after creating the file.

## Rules

- One component per file.
- No external dependencies — Tailwind utilities only.
- Do not add `"use client"` unless strictly required for the component's function.
- If the component is a variant of an existing one (Button, CheckCard, RiskBadge), extend or compose it rather than duplicating logic.
