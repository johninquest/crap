import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { Header } from "@/components/layout/Header";
import { BRAND } from "@/lib/config";
import { applyLegalContact } from "@/lib/legalContact";
import { buildAlternates, OG_IMAGE } from "@/lib/seo";

const URL_REGEX = /(https?:\/\/[^\s]+)/g;

function renderTextWithExternalLinks(text: string) {
  const lines = text.split("\n");

  return lines.map((line, lineIndex) => {
    const segments = line.split(URL_REGEX);

    return (
      <>
        {segments.map((segment, segmentIndex) => {
          if (/^https?:\/\//.test(segment)) {
            return (
              <a
                key={`link-${lineIndex}-${segmentIndex}`}
                href={segment}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-current underline-offset-2"
              >
                {segment}
              </a>
            );
          }

          return (
            <span key={`text-${lineIndex}-${segmentIndex}`}>{segment}</span>
          );
        })}
        {lineIndex < lines.length - 1 && <br />}
      </>
    );
  });
}

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
    title: `${dict.legal.imprint.metaTitle} – ${BRAND.name}`,
    description: dict.legal.imprint.metaDesc,
    openGraph: {
      title: `${dict.legal.imprint.metaTitle} – ${BRAND.name}`,
      description: dict.legal.imprint.metaDesc,
      type: "website",
      images: OG_IMAGE,
    },
    twitter: { card: "summary_large_image" },
    alternates: buildAlternates(lang, "/imprint"),
  };
}

export default async function ImprintPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const { imprint } = dict.legal;

  return (
    <>
      <Header lang={lang} langSwitch={dict.common.langSwitch} />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-10">
        <h1 className="text-2xl font-bold text-text mb-8">{imprint.pageTitle}</h1>
        {imprint.intro && (
          <p className="text-text-muted text-sm mb-8">
            {applyLegalContact(imprint.intro)}
          </p>
        )}
        <div className="space-y-6">
          {imprint.sections.map((section) => {
            const body = applyLegalContact(section.body);

            return (
              <section key={section.heading}>
              <h2 className="text-base font-semibold text-text mb-1">
                {section.heading}
              </h2>
              <p className="text-text-muted text-sm">
                {renderTextWithExternalLinks(body)}
              </p>
              </section>
            );
          })}
        </div>
      </main>
    </>
  );
}
