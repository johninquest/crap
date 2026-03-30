import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/lib/config";

const PILLARS = [
  {
    icon: "⚡",
    title: "3–5 minutes",
    body: "Ten plain-language questions. No jargon, no installations required.",
  },
  {
    icon: "🎯",
    title: "Clear score",
    body: "See exactly where you stand across accounts, devices, backups, and habits.",
  },
  {
    icon: "✅",
    title: "What to do next",
    body: "Prioritised actions — only the 3–5 things that actually matter for your situation.",
  },
];

const MODULES = [
  { label: "Accounts & Passwords", icon: "🔑" },
  { label: "Devices & Software",   icon: "💻" },
  { label: "Backups & Recovery",   icon: "☁️" },
  { label: "Habits & Awareness",   icon: "🧠" },
];

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex-1">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 pt-16 pb-12 text-center">
          <div className="inline-block bg-[#E0F2FE] text-[#0891B2] text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            Free · No account needed · 5 minutes
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1F2937] leading-tight tracking-tight mb-5">
            Are you exposed<br className="hidden sm:block" /> right now?
          </h1>
          <p className="text-lg text-[#6B7280] max-w-xl mx-auto mb-8 leading-relaxed">
            Cyber threats change fast. Most people don&apos;t know if their habits
            and devices are still safe. In a few minutes, get a clear picture
            — without jargon or scare tactics.
          </p>
          <Link href="/assessment">
            <Button size="lg">Start My Free Risk Check</Button>
          </Link>
          <p className="mt-4 text-sm text-[#6B7280]">
            No personal data collected. No account required.
          </p>
        </section>

        {/* ── Pillars ──────────────────────────────────────────────────── */}
        <section className="bg-[#F9FAFB] border-y border-[#E5E7EB]">
          <div className="max-w-3xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-6">
            {PILLARS.map((p) => (
              <div key={p.title} className="text-center space-y-2">
                <div className="text-3xl">{p.icon}</div>
                <h3 className="font-semibold text-[#1F2937]">{p.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── What We Cover ──────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 py-14">
          <h2 className="text-2xl font-bold text-[#1F2937] mb-2 text-center">
            What the check covers
          </h2>
          <p className="text-center text-[#6B7280] mb-8">
            Four areas that account for the vast majority of personal and business cyber incidents.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {MODULES.map((m) => (
              <div
                key={m.label}
                className="flex items-center gap-4 bg-white border border-[#E5E7EB] rounded-xl px-5 py-4"
              >
                <span className="text-2xl">{m.icon}</span>
                <span className="font-medium text-[#1F2937]">{m.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Social Proof ─────────────────────────────────────────────── */}
        <section className="bg-[#F0FAFA] border-y border-[#E5E7EB]">
          <div className="max-w-2xl mx-auto px-4 py-12 text-center">
            <blockquote className="text-xl font-medium text-[#1F2937] leading-relaxed mb-4">
              &ldquo;I&apos;ve been in IT for years and still found two things I hadn&apos;t
              thought about. The plain-language format is what makes it different.&rdquo;
            </blockquote>
            <cite className="text-sm text-[#6B7280] not-italic">
              — SME Operations Manager, early tester
            </cite>
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-[#1F2937] mb-3">
            Ready to find out where you stand?
          </h2>
          <p className="text-[#6B7280] mb-8">
            It takes about 5 minutes. You&apos;ll walk away knowing exactly what matters and what to do next.
          </p>
          <Link href="/assessment">
            <Button size="lg">Start Free Check →</Button>
          </Link>
        </section>
      </main>

      <footer className="border-t border-[#E5E7EB] py-6 text-center text-sm text-[#6B7280]">
        {BRAND.name} — A decision and clarity tool, not a security product.
      </footer>
    </>
  );
}

