import type { AssessmentResult } from "@/lib/assessment/types";
import type { Dictionary } from "@/lib/types/dictionary";
import { BRAND } from "@/lib/config";

const MODULE_ICONS: Record<string, string> = {
  accounts: "🔑",
  devices:  "💻",
  backups:  "☁️",
  behavior: "🧠",
};

function riskTextColor(level: string): string {
  if (level === "low")  return "text-green-on";
  if (level === "high") return "text-red-on";
  return "text-amber-on";
}

function riskBorderStyle(level: string): string {
  if (level === "low")  return "border-green-on text-green-on";
  if (level === "high") return "border-red-on text-red-on";
  return "border-amber-on text-amber-on";
}

interface CertificatePrintRiskProps {
  lang: string;
  dict: Dictionary;
  result: AssessmentResult;
}

export function CertificatePrintRisk({ lang, dict, result }: CertificatePrintRiskProps) {
  const t = dict.results;

  const formattedDate = new Date(result.completedAt).toLocaleDateString(
    lang === "de" ? "de-DE" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" }
  );

  const riskLabel = {
    low:    dict.common.riskLow,
    medium: dict.common.riskMedium,
    high:   dict.common.riskHigh,
  }[result.overallRiskLevel];

  return (
    <div className="hidden print:block">
      <div className="border-2 border-primary">
        {/* Top accent bar */}
        <div className="h-2 bg-primary" />

        <div className="px-10 py-8 space-y-6 font-sans text-text">
          {/* Header */}
          <div className="flex justify-between items-end">
            <div>
              <p className="text-base font-bold tracking-widest uppercase text-primary">
                {BRAND.name}
              </p>
              <p className="text-xs text-text-muted">cyberchecklist.app</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-text-muted">{t.issuedOn}</p>
              <p className="text-sm font-semibold">{formattedDate}</p>
            </div>
          </div>

          <hr className="border-primary" />

          {/* Report title */}
          <div className="text-center space-y-1 py-2">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-text-muted">
              {t.certificateTitle}
            </p>
            <h1 className="text-xl font-bold">{t.pageTitle}</h1>
          </div>

          <hr className="border-border" />

          {/* Overall result */}
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-primary">
              {t.overallTitle}
            </p>
            <div className="flex items-center gap-8">
              <div>
                <span className="text-4xl font-bold">{result.overallScore}</span>
                <span className="text-2xl font-bold">%</span>
              </div>
              <span
                className={`text-sm font-bold px-4 py-1 border-2 rounded uppercase tracking-wide ${riskBorderStyle(result.overallRiskLevel)}`}
              >
                {riskLabel}
              </span>
            </div>
          </div>

          {/* Module breakdown */}
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-primary">
              {t.findings}
            </p>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-primary">
                  <th className="text-left py-2 pr-4 font-semibold" />
                  <th className="text-right py-2 pr-4 font-semibold w-16">Score</th>
                  <th className="text-right py-2 font-semibold w-28">Risk</th>
                </tr>
              </thead>
              <tbody>
                {result.moduleScores.map((ms, i) => (
                  <tr
                    key={ms.module}
                    className={`border-b border-border ${i % 2 === 0 ? "bg-bg" : ""}`}
                  >
                    <td className="py-2 pr-4">
                      {MODULE_ICONS[ms.module]} {ms.label}
                    </td>
                    <td className="py-2 pr-4 text-right">{ms.score}%</td>
                    <td className={`py-2 text-right font-semibold ${riskTextColor(ms.riskLevel)}`}>
                      {{ low: dict.common.riskLow, medium: dict.common.riskMedium, high: dict.common.riskHigh }[ms.riskLevel]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Top recommendations */}
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-primary">
              {t.printActions}
            </p>
            <ol className="space-y-1">
              {result.topRecommendations.map((rec, i) => (
                <li key={rec.id} className="flex gap-3 text-sm">
                  <span className="shrink-0 font-bold text-primary w-5 text-right">{i + 1}.</span>
                  <span>{rec.title}</span>
                </li>
              ))}
            </ol>
          </div>

          <hr className="border-primary" />

          {/* Footer */}
          <div className="text-center space-y-1">
            <p className="text-xs font-semibold">{BRAND.name} · cyberchecklist.app</p>
            <p className="text-xs text-text-muted">{t.disclaimer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
