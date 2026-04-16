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
      className="text-sm font-semibold text-text-muted hover:text-text transition-colors border border-border rounded-md px-2 py-1"
    >
      {label}
    </Link>
  );
}
