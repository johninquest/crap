import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/lib/config";

const PILLAR_ICONS = ["⚡", "🎯", "✅"];
const MODULE_ICONS = ["🔑", "💻", "☁️", "🧠"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return {
    title: `${BRAND.name} – Understand Your Cyber Risk`,
    description: dict.home.heroBody,
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
      <Header dict={dict.header} lang={lang} langSwitch={dict.common.langSwitch} />

      <main className="flex-1">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 pt-16 pb-12 text-center">
          <div className="inline-block bg-primary-soft text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            {t.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-text leading-tight tracking-tight mb-5">
            {t.heroTitle1}<br className="hidden sm:block" /> {t.heroTitle2}
          </h1>
          <p className="text-lg text-text-muted max-w-xl mx-auto mb-8 leading-relaxed">
            {t.heroBody}
          </p>
          <Link href={`/${lang}/assessment`}>
            <Button size="lg">{t.heroCta}</Button>
          </Link>
          <p className="mt-4 text-sm text-text-muted">{t.heroDisclaimer}</p>
        </section>

        {/* ── Pillars ──────────────────────────────────────────────────── */}
        <section className="bg-surface-muted border-y border-border">
          <div className="max-w-3xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-6">
            {t.pillars.map((p, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="text-3xl">{PILLAR_ICONS[i]}</div>
                <h3 className="font-semibold text-text">{p.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── What We Cover ──────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 py-14">
          <h2 className="text-2xl font-bold text-text mb-2 text-center">
            {t.coversTitle}
          </h2>
          <p className="text-center text-text-muted mb-8">{t.coversSubtitle}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {t.modules.map((m, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-surface border border-border rounded-xl px-5 py-4"
              >
                <span className="text-2xl">{MODULE_ICONS[i]}</span>
                <span className="font-medium text-text">{m.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Social Proof ─────────────────────────────────────────────── */}
        <section className="bg-surface-muted border-y border-border">
          <div className="max-w-2xl mx-auto px-4 py-12 text-center">
            <blockquote className="text-xl font-medium text-text leading-relaxed mb-4">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <cite className="text-sm text-text-muted not-italic">{t.quoteAttrib}</cite>
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-text mb-3">{t.ctaTitle}</h2>
          <p className="text-text-muted mb-8">{t.ctaBody}</p>
          <Link href={`/${lang}/assessment`}>
            <Button size="lg">{t.ctaBtn}</Button>
          </Link>
        </section>
      </main>


    </>
  );
}
