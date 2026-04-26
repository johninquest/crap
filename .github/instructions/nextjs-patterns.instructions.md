---
description: "Use when writing or editing Next.js pages, layouts, server components, client components, metadata, routing, or any file in src/app/, src/components/, or src/lib/. Covers RSC vs client component rules, generateMetadata, generateStaticParams, and project conventions."
applyTo: ["src/app/**/*.tsx", "src/app/**/*.ts", "src/components/**/*.tsx", "src/lib/**/*.ts"]
---

# Next.js Patterns

This is Next.js 16 with React 19. The App Router is used exclusively — no Pages Router.

## Server vs Client Components

- **Default to Server Components** — every component is a server component unless it needs interactivity.
- Add `"use client"` only when a component needs: `useState`, `useEffect`, `useRouter`, `useRef`, event handlers, or browser APIs.
- Server components can be `async` — fetch data or call `getDictionary()` directly.
- Never add `"use client"` to page files — pages are server components. Interactive sections go into separate client components in `src/components/`.

## Page Conventions

Every route page must export:
```ts
export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "de" }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return {
    title: `${dict.PAGE.metaTitle} – ${BRAND.name}`,
    description: dict.PAGE.metaDesc,
    openGraph: { ... },
    alternates: buildAlternates(lang, "/route-slug"),
  };
}
```
- Always `await params` — params is a Promise in Next.js 16.
- Always call `notFound()` for unknown locales.

## Imports

- Use the `@/*` path alias for all imports from `src/`: e.g. `@/lib/config`, `@/components/ui/Button`.
- Never use relative `../../../` chains across feature boundaries.
- Do **not** write `import React from "react"` — JSX transform handles it automatically.

## i18n

- Dictionary is loaded in the server component via `await getDictionary(lang as Locale)`.
- Pass the `dict` object (or relevant sub-sections) as props to child components.
- Never import the dictionary loader in client components — it's marked server-only.
- Locales: `en` and `de`. Always update both dictionaries when adding keys.

## SEO Helpers

- `buildAlternates(lang, "/route-slug")` — generates hreflang alternates.
- `OG_IMAGE` — shared OG image constant from `@/lib/seo`.
- `BRAND` — site name and base URL from `@/lib/config`.

## Result Pages

- Result pages read from `sessionStorage` — they are `"use client"` components.
- Use the storage keys from `@/lib/config` (`STORAGE_KEYS`).
- Always handle the case where storage is empty (redirect or show empty state).
