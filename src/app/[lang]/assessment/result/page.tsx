import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../../dictionaries";
import { Header } from "@/components/layout/Header";
import { ResultsView } from "./ResultsView";
import { BRAND } from "@/lib/config";

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
    title: `${dict.results.metaTitle} – ${BRAND.name}`,
    description: dict.results.metaDesc,
    robots: { index: false, follow: false },
  };
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <Header dict={dict.header} lang={lang} langSwitch={dict.common.langSwitch} />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-text mb-2">
            {dict.results.pageTitle}
          </h1>
          <p className="text-text-muted">{dict.results.pageSubtitle}</p>
        </div>
        <ResultsView lang={lang} dict={dict} />
      </main>
    </>
  );
}
