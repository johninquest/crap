import "server-only";
import type { Dictionary } from "@/lib/types/dictionary";

const dictionaries: Record<string, () => Promise<Dictionary>> = {
  en: () =>
    import("@/dictionaries/en.json").then((m) => m.default as unknown as Dictionary),
  de: () =>
    import("@/dictionaries/de.json").then((m) => m.default as unknown as Dictionary),
};

export type Locale = keyof typeof dictionaries;

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();
