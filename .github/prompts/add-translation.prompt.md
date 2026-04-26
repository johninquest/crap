---
description: "Add a new translation key to both EN and DE dictionaries and sync the TypeScript type"
argument-hint: "Key path and text, e.g. 'nav.newPage — New Page / Neue Seite'"
agent: agent
---

Add a new translation key to the project's i18n dictionaries.

The key path is: $input

## Steps

1. **Identify the correct nesting level** in `src/dictionaries/en.json` by searching for the surrounding keys specified in the input.

2. **Add the English value** to `src/dictionaries/en.json` at the correct location. Preserve existing formatting and indentation.

3. **Add the German value** to `src/dictionaries/de.json` at the exact same key path. If the user did not provide a German translation, flag it clearly and insert a placeholder like `"TODO: translate"`.

4. **Check `src/lib/types/dictionary.ts`** — if the new key introduces a new interface, new nested object shape, or a new top-level section, update the type. If the key fits inside an existing `Record<string, string>` or known interface, no type change is needed.

5. **Confirm** by listing:
   - The exact key path added
   - The EN value
   - The DE value
   - Whether `dictionary.ts` was changed and why

## Rules

- Always update both files in the same operation — never one without the other.
- Never change existing keys or values.
- Dictionary loader is server-only — do not import it in client components.
