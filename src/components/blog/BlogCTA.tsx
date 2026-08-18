import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/lib/types/dictionary";

interface BlogCTAProps {
  checkType?: "gdpr" | "nis2" | "ai" | "risk" | "insurance" | "rules";
  lang: string;
  dict: Dictionary;
}

const CHECK_ROUTES: Record<string, { path: string; nameKey: keyof Dictionary["footer"]["checks"] }> = {
  nis2:      { path: "nis2-check",               nameKey: "nis2Check" },
  gdpr:      { path: "gdpr-check",               nameKey: "gdprCheck" },
  ai:        { path: "ai-check",                 nameKey: "aiCheck" },
  risk:      { path: "risk-check",               nameKey: "assessment" },
  insurance: { path: "insurance-readiness-check", nameKey: "insuranceReadinessCheck" },
  rules:     { path: "rules-finder",             nameKey: "rulesFinder" },
};

export function BlogCTA({ checkType = "rules", lang, dict }: BlogCTAProps) {
  const checkConfig = CHECK_ROUTES[checkType] || CHECK_ROUTES.rules;
  const toolName = dict.footer.checks[checkConfig.nameKey];

  return (
    <aside className="my-10 p-6 sm:p-8 rounded-2xl bg-surface border-2 border-primary/20 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="max-w-md">
          <div className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
            {toolName}
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-text tracking-tight mb-2">
            {dict.blog.relatedCheckTitle}
          </h3>
          <p className="text-sm text-text-muted leading-relaxed">
            {dict.blog.relatedCheckDesc}
          </p>
        </div>

        <Link href={`/${lang}/${checkConfig.path}`} className="shrink-0">
          <Button size="md" className="w-full sm:w-auto">
            {dict.blog.relatedCheckBtn}
          </Button>
        </Link>
      </div>
    </aside>
  );
}
