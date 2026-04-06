import { BRAND } from "@/lib/config";
import type { Dictionary } from "@/lib/types/dictionary";

interface FooterProps {
  dict: Pick<Dictionary, "footer">;
}

export function Footer({ dict }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E5E7EB] py-6 text-sm text-[#6B7280]">
      <div className="max-w-3xl mx-auto px-4 text-center space-y-1">
        <p>
          © {year}{" "}
          <span className="font-medium text-[#1F2937]">
            {BRAND.namePrefix}
            <span className="text-[#0891B2]">{BRAND.nameSuffix}</span>
          </span>
        </p><br />
        <p>{dict.footer.madeBy}</p>
        <p className="text-xs opacity-75">{dict.footer.disclaimer}</p>
      </div>
    </footer>
  );
}
