import Link from "next/link";
import { BRAND } from "@/lib/config";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-[#E5E7EB]">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-[#1F2937] tracking-tight">
          {BRAND.namePrefix}<span className="text-[#0891B2]">{BRAND.nameSuffix}</span>
        </Link>
        <Link
          href="/assessment"
          className="text-sm font-semibold text-[#0891B2] hover:text-[#0E7490] transition-colors"
        >
          Start Free Check →
        </Link>
      </div>
    </header>
  );
}
