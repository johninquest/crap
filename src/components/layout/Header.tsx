import Link from "next/link";
import { BRAND } from "@/lib/config";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/Button";

interface HeaderProps {
  lang: string;
  langSwitch: string;
  cta?: { label: string; href: string };
}

export function Header({ lang, langSwitch, cta }: HeaderProps) {
  const otherLang = lang === "en" ? "de" : "en";

  return (
    <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur border-b border-border">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href={`/${lang}`} className="text-lg font-bold text-text tracking-tight">
          {BRAND.namePrefix}<span className="text-primary">{BRAND.nameSuffix}</span>
        </Link>
        <div className="flex items-center gap-3">
          {cta && (
            <Link href={cta.href}>
              <Button size="sm" className="text-xs sm:text-sm">{cta.label}</Button>
            </Link>
          )}
          <LanguageSwitcher
            currentLang={lang}
            otherLang={otherLang}
            label={langSwitch}
          />
        </div>
      </div>
    </header>
  );
}
