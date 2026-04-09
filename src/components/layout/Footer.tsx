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
    <footer className="border-t border-[#E5E7EB] py-8 text-sm text-[#6B7280]">
      <div className="max-w-3xl mx-auto px-4 space-y-5">
        <div className="text-center space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9CA3AF]">
            {footer.toolsLabel}
          </p>
          <nav aria-label={footer.toolsLabel}>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {CHECKS.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={`/${lang}/${href}`}
                    className="hover:text-[#0891B2] transition-colors"
                  >
                    {footer.checks[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <hr className="border-[#E5E7EB]" />

        <div className="text-center space-y-1">
          <p>
            © {year}{" "}
            <span className="font-medium text-[#1F2937]">
              {BRAND.namePrefix}
              <span className="text-[#0891B2]">{BRAND.nameSuffix}</span>
            </span>
          </p>
          <p>{footer.madeBy}</p>
          <p className="text-xs opacity-75">{footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
