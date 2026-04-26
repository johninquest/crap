---
description: "Use when adding, renaming, or removing a route; changing sitemap or robots rules; adding or editing instruction files. Keeps README.md, public/llms.txt, src/app/sitemap.ts, and src/app/robots.ts in sync with the actual app structure."
applyTo: ["src/app/sitemap.ts", "src/app/robots.ts", "src/app/[lang]/*/page.tsx", "README.md", "public/llms.txt", ".github/instructions/**/*.md"]
---

# Documentation Sync Rules

Any structural change to the app must be reflected in the four documentation surfaces below **in the same change set**. Never merge a route change without updating all affected docs.

## 1. `README.md`

### Checks table (top section)
Maintain one row per check:

| Column | What to update |
|---|---|
| Check name | Human-readable title |
| Route | `/[lang]/{slug}` |
| Target audience | Who the check is for |
| Questions | Current question count |
| Regulatory basis | Standards/directives it covers |

When a route is **renamed**: update the Route cell.  
When a route is **added**: add a new row.  
When a route is **removed**: remove the row.

### Project structure section
Keep the `src/app/[lang]/` tree in sync with actual folder names.

## 2. `public/llms.txt`

This file is served to AI crawlers. It must list every publicly accessible check with its full URL.

- **English tools** block: one bullet per check pointing to `https://cyberchecklist.app/en/{slug}`
- **Deutsch** block: matching bullet pointing to `https://cyberchecklist.app/de/{slug}`
- When renaming a route, update **both** language URLs.
- When adding a route, add **both** language bullets with a short description.
- When removing a route, remove both bullets.

## 3. `src/app/sitemap.ts`

`TOOL_PATHS` is the source of truth for what gets indexed.

- Add the new slug to `TOOL_PATHS` when a new check is added.
- Remove the old slug and add the new one when a route is renamed.
- **Do not add** result pages (`/*/result`) — they carry `robots: { index: false }`.
- The home page (`/`) is handled separately — do not add it to `TOOL_PATHS`.

## 4. `src/app/robots.ts`

Only update this when crawl rules change (e.g. a new path that must be blocked from indexing, or a previously blocked path that is now public). Most route additions or renames do **not** require a robots change.

When you do change `robots.ts`, document the reason in a comment on the affected rule.

## 5. `.github/instructions/` files

When adding a new instruction file:
- Set a precise `applyTo` glob so it auto-attaches to the right files.
- Add an entry (file path + description) to the `<instruction>` list in the root instruction block (`.github/copilot-instructions.md` or equivalent) if one exists.
- Keep `description` short and specific — it is used to decide when to apply the file.

When renaming or restructuring a route that is referenced inside an existing instruction file, update the example paths in that file too.
