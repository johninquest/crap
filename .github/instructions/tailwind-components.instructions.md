---
description: "Use when creating or editing React components or page layouts. Covers Tailwind v4 utility usage, the project's design token color system, spacing conventions, and accessibility requirements."
applyTo: ["src/components/**/*.tsx", "src/app/**/*.tsx"]
---

# Tailwind Component Conventions

This project uses **Tailwind CSS v4** with a custom design-token color system.

## Color Tokens

Always use the project tokens — never raw Tailwind colors like `blue-500` or `gray-200`.

| Token | Purpose |
|-------|---------|
| `bg-primary` | Primary action color (buttons, links) |
| `bg-primary-hover` | Primary hover state |
| `bg-primary-soft` | Soft/muted primary background |
| `text-text` | Default body text |
| `text-text-muted` | Secondary / subdued text |
| `bg-surface` | Card / panel background |
| `bg-surface-muted` | Subtle background (hover states, stripes) |
| `border-border` | Default border color |
| `bg-bg` | Page background |

## Layout Patterns

- **Page container**: `max-w-3xl mx-auto px-4 py-10` (or `max-w-2xl` for narrower result pages)
- **Section spacing**: `space-y-6` or `space-y-8`
- **Card**: `bg-surface rounded-2xl p-6 border border-border`
- **Flex row with wrapping**: `flex flex-col sm:flex-row gap-3`

## Accessibility

- Interactive elements need visible focus styles: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`
- Use `sr-only` for visually-hidden labels on custom controls (radio, checkbox)
- Ensure color contrast meets WCAG AA — the design tokens are pre-calibrated for this

## Component Rules

- **No custom CSS** unless a Tailwind utility genuinely cannot achieve the result
- **No inline `style` props** — use utilities only
- **Mobile-first**: base styles for mobile, then `sm:`, `md:` breakpoints for wider
- Compose `className` strings using template literals, not `clsx` (not installed)
- Extend existing UI components in `src/components/ui/` (Button, CheckCard, RiskBadge) before creating new base elements
