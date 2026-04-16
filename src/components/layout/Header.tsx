import Link from "next/link";
import { BRAND } from "@/lib/config";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface HeaderProps {
  dict: { startCheck: string };
  lang: string;
  langSwitch: string;
}

export function Header({ dict, lang, langSwitch }: HeaderProps) {
  const otherLang = lang === "en" ? "de" : "en";

  return (
    <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur border-b border-border">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href={`/${lang}`} className="text-lg font-bold text-text tracking-tight">
          {BRAND.namePrefix}<span className="text-primary">{BRAND.nameSuffix}</span>
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSwitcher
            currentLang={lang}
            otherLang={otherLang}
            label={langSwitch}
          />
          <Link
            href={`/${lang}/assessment`}
            className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors"
          >
            {dict.startCheck}
          </Link>
        </div>
      </div>
    </header>
  );
}
