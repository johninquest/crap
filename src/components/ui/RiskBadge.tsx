import type { RiskLevel } from "@/lib/assessment/types";

const CONFIG: Record<
  RiskLevel,
  { label: string; bg: string; text: string; dot: string }
> = {
  low:    { label: "Low Risk",    bg: "bg-[#D1FAE5]", text: "text-[#065F46]", dot: "bg-[#10B981]" },
  medium: { label: "Medium Risk", bg: "bg-[#FEF3C7]", text: "text-[#92400E]", dot: "bg-[#F59E0B]" },
  high:   { label: "High Risk",   bg: "bg-[#FEE2E2]", text: "text-[#991B1B]", dot: "bg-[#EF4444]" },
};

interface RiskBadgeProps {
  level: RiskLevel;
  size?: "sm" | "md";
}

export function RiskBadge({ level, size = "md" }: RiskBadgeProps) {
  const c = CONFIG[level];
  const padding = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${padding} ${c.bg} ${c.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}
