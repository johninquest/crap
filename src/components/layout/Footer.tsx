import Link from "next/link";
import { BRAND } from "@/lib/config";
import type { Dictionary } from "@/lib/types/dictionary";

interface FooterProps {
  dict: Pick<Dictionary, "footer">;
  lang: string;
}

const CHECKS: Array<{ key: keyof Dictionary["footer"]["checks"]; href: string }> = [
  { key: "assessment",  href: "assessment" },
  { key: "gdprCheck",   href: "gdpr-check" },
  { key: "nis2Check",   href: "nis2-check" },
  { key: "aiCheck",     href: "ai-check" },
  { key: "rulesFinder", href: "rules-finder" },
];

export function Footer({ dict, lang }: FooterProps) {
  const year = new Date().getFullYear();
  const { footer } = dict;

  return (
    <footer className="border-t border-border py-6 text-sm text-text-subtle">
      <div className="max-w-3xl mx-auto px-4 flex flex-col items-center gap-4">
        <nav aria-label={footer.toolsLabel}>
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {CHECKS.map(({ key, href }) => (
              <li key={key}>
                <Link
                  href={`/${lang}/${href}`}
                  className="hover:text-primary transition-colors"
                >
                  {footer.checks[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-xs">
          © {year}{" "}
          <span className="font-medium text-text-muted">
            {BRAND.namePrefix}
            <span className="text-primary">{BRAND.nameSuffix}</span>
          </span>
        </p>
      </div>
    </footer>
  );
}
