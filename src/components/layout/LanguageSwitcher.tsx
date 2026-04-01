"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

interface LanguageSwitcherProps {
  currentLang: string;
  otherLang: string;
  label: string;
}

export function LanguageSwitcher({ currentLang, otherLang, label }: LanguageSwitcherProps) {
  const pathname = usePathname();
  // Swap the first path segment (the locale) e.g. /en/assessment → /de/assessment
  const newPath = pathname.replace(new RegExp(`^/${currentLang}(/|$)`), `/${otherLang}$1`);

  return (
    <Link
      href={newPath}
      onClick={() => trackEvent("language_selected", { from: currentLang, to: otherLang })}
      className="text-sm font-semibold text-[#6B7280] hover:text-[#1F2937] transition-colors border border-[#E5E7EB] rounded-md px-2 py-1"
    >
      {label}
    </Link>
  );
}
