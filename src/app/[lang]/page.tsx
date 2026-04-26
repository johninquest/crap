import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { CheckCard } from "@/components/ui/CheckCard";
import { buildAlternates, OG_IMAGE } from "@/lib/seo";

const INDIVIDUAL_CHECKS = [
  { key: "assessment" as const, icon: "🛡️", slug: "risk-check" },
  { key: "gdpr" as const, icon: "⚖️", slug: "gdpr-check" },
] as const;

const BUSINESS_CHECKS = [
  { key: "nis2" as const, icon: "🏛️", slug: "nis2-check" },
  { key: "aiCheck" as const, icon: "🤖", slug: "ai-check" },
  { key: "rulesFinder" as const, icon: "🧭", slug: "rules-finder" },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.home.heroTitle,
    description: dict.home.heroBody,
    openGraph: {
      title: dict.home.heroTitle,
      description: dict.home.heroBody,
      type: "website",
      images: OG_IMAGE,
    },
    twitter: {
      card: "summary_large_image",
    },
    alternates: buildAlternates(lang, ""),
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const t = dict.home;

  return (
    <>
      <Header
        lang={lang}
        langSwitch={dict.common.langSwitch}
        cta={{ label: dict.common.navCta, href: `/${lang}/risk-check` }}
      />

      <main className="flex-1">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 pt-16 pb-14 text-center">
          <div className="inline-block bg-primary-soft text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            {t.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-text leading-tight tracking-tight mb-5">
            {t.heroTitle}
          </h1>
          <p className="text-lg text-text-muted max-w-xl mx-auto mb-8 leading-relaxed">
            {t.heroBody}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#individuals">
              <Button size="lg">{t.heroCtaIndividuals}</Button>
            </a>
            <a href="#businesses">
              <Button size="lg" variant="outline">{t.heroCtaBusiness}</Button>
            </a>
          </div>
          <p className="mt-4 text-sm text-text-muted">{t.heroDisclaimer}</p>
        </section>

        {/* ── For Individuals ──────────────────────────────────────────── */}
        <section
          id="individuals"
          className="bg-surface-muted border-y border-border scroll-mt-16"
        >
          <div className="max-w-3xl mx-auto px-4 py-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-text mb-2">
                {t.individualsTitle}
              </h2>
              <p className="text-text-muted">{t.individualsSubtitle}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {INDIVIDUAL_CHECKS.map(({ key, icon, slug }) => {
                const c = t.checks[key];
                return (
                  <CheckCard
                    key={key}
                    icon={icon}
                    title={c.title}
                    description={c.description}
                    tooltip={c.tooltip}
                    time={c.time}
                    cta={c.cta}
                    href={`/${lang}/${slug}`}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* ── For Businesses ───────────────────────────────────────────── */}
        <section id="businesses" className="scroll-mt-16">
          <div className="max-w-3xl mx-auto px-4 py-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-text mb-2">
                {t.businessTitle}
              </h2>
              <p className="text-text-muted">{t.businessSubtitle}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {BUSINESS_CHECKS.map(({ key, icon, slug }, i) => {
                const c = t.checks[key];
                const isLast = i === BUSINESS_CHECKS.length - 1;
                return (
                  <CheckCard
                    key={key}
                    icon={icon}
                    title={c.title}
                    description={c.description}
                    tooltip={c.tooltip}
                    time={c.time}
                    cta={c.cta}
                    href={`/${lang}/${slug}`}
                    className={isLast ? "sm:col-span-2" : ""}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Testimonial ──────────────────────────────────────────────── */}
        <section className="bg-surface-muted border-y border-border">
          <div className="max-w-2xl mx-auto px-4 py-12 text-center">
            <blockquote className="text-xl font-medium text-text leading-relaxed mb-4">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <cite className="text-sm text-text-muted not-italic">{t.quoteAttrib}</cite>
          </div>
        </section>
      </main>
    </>
  );
}
