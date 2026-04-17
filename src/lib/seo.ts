const BASE = "https://cyberchecklist.app";

export const OG_IMAGE = [
  { url: "/og-image.png", width: 1200, height: 630, alt: "CyberChecklist" },
];

export function buildAlternates(lang: string, path: string) {
  const enUrl = `${BASE}/en${path}`;
  const deUrl = `${BASE}/de${path}`;
  return {
    canonical: lang === "en" ? enUrl : deUrl,
    languages: {
      en: enUrl,
      de: deUrl,
      "x-default": enUrl,
    } as Record<string, string>,
  };
}
