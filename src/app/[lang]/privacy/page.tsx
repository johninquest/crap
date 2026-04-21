import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { Header } from "@/components/layout/Header";
import { BRAND } from "@/lib/config";
import { buildAlternates, OG_IMAGE } from "@/lib/seo";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "de" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return {
    title: `${dict.legal.privacy.metaTitle} – ${BRAND.name}`,
    description: dict.legal.privacy.metaDesc,
    openGraph: {
      title: `${dict.legal.privacy.metaTitle} – ${BRAND.name}`,
      description: dict.legal.privacy.metaDesc,
      type: "website",
      images: OG_IMAGE,
    },
    twitter: { card: "summary_large_image" },
    alternates: buildAlternates(lang, "/privacy"),
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const { privacy } = dict.legal;

  return (
    <>
      <Header lang={lang} langSwitch={dict.common.langSwitch} />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-10">
        <h1 className="text-2xl font-bold text-text mb-2">{privacy.pageTitle}</h1>
        {privacy.lastUpdated && (
          <p className="text-xs text-text-subtle mb-4">{privacy.lastUpdated}</p>
        )}
        {privacy.intro && (
          <p className="text-text-muted mb-8">{privacy.intro}</p>
        )}
        <div className="space-y-6">
          {privacy.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-base font-semibold text-text mb-1">
                {section.heading}
              </h2>
              <p className="text-text-muted text-sm whitespace-pre-line">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
