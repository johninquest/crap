import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { Header } from "@/components/layout/Header";
import { AssessmentFlow } from "./AssessmentFlow";
import { getLocalizedQuestions } from "@/lib/assessment/questions";
import { BRAND } from "@/lib/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return {
    title: `${dict.assessment.metaTitle} – ${BRAND.name}`,
    description: dict.assessment.metaDesc,
  };
}

export default async function AssessmentPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const localizedQuestions = getLocalizedQuestions(dict.questions);

  return (
    <>
      <Header dict={dict.header} lang={lang} langSwitch={dict.common.langSwitch} />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1F2937] mb-2">
            {dict.assessment.pageTitle}
          </h1>
          <p className="text-[#6B7280]">{dict.assessment.pageSubtitle}</p>
        </div>
        <AssessmentFlow
          lang={lang}
          localizedQuestions={localizedQuestions}
          dict={dict}
        />
      </main>
    </>
  );
}
