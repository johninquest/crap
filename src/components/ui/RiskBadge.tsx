import type { RiskLevel } from "@/lib/assessment/types";

const CONFIG: Record<RiskLevel, { bg: string; text: string; dot: string }> = {
  low:    { bg: "bg-green-light",  text: "text-green-on",  dot: "bg-green" },
  medium: { bg: "bg-amber-light",  text: "text-amber-on",  dot: "bg-amber" },
  high:   { bg: "bg-red-light",    text: "text-red-on",    dot: "bg-red"   },
};

interface RiskBadgeProps {
  level: RiskLevel;
  size?: "sm" | "md";
  labelLow: string;
  labelMedium: string;
  labelHigh: string;
}

export function RiskBadge({ level, size = "md", labelLow, labelMedium, labelHigh }: RiskBadgeProps) {
  const c = CONFIG[level];
  const padding = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";
  const labels: Record<RiskLevel, string> = { low: labelLow, medium: labelMedium, high: labelHigh };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${padding} ${c.bg} ${c.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {labels[level]}
    </span>
  );
}
