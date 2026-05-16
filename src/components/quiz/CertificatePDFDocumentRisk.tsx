import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { AssessmentResult } from "@/lib/assessment/types";
import type { Dictionary } from "@/lib/types/dictionary";
import { BRAND } from "@/lib/config";

// ── Color palette (hex — Tailwind doesn't apply inside react-pdf) ─────────────
const TEAL   = "#134E4A";
const INK    = "#111827";
const MUTED  = "#6B7280";
const SUBTLE = "#9CA3AF";
const RULE   = "#E5E7EB";

const RISK_INK: Record<string, string> = { low: "#065F46", medium: "#92400E", high: "#991B1B" };
const RISK_BG:  Record<string, string> = { low: "#ECFDF5", medium: "#FFFBEB", high: "#FEF2F2" };
const RISK_BD:  Record<string, string> = { low: "#A7F3D0", medium: "#FDE68A", high: "#FECACA" };

// ── Static styles ─────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica",
    flexDirection: "column",
  },
  topBar:    { height: 8, backgroundColor: TEAL },
  bottomBar: { height: 4, backgroundColor: TEAL },

  content: {
    flex: 1,
    paddingHorizontal: 55,
    paddingTop: 38,
    paddingBottom: 30,
    flexDirection: "column",
  },

  // Header row
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 16,
  },
  brandName: { fontSize: 9.5, fontFamily: "Helvetica-Bold", color: TEAL, letterSpacing: 2 },
  brandUrl:  { fontSize: 7, color: SUBTLE, marginTop: 3 },
  dateLabel: { fontSize: 7, color: SUBTLE, textAlign: "right" },
  dateValue: { fontSize: 8.5, fontFamily: "Helvetica-Bold", color: MUTED, textAlign: "right", marginTop: 2 },

  // Rules
  dividerPrimary: { height: 0.75, backgroundColor: TEAL },
  dividerLight:   { height: 0.5,  backgroundColor: RULE },
  sectionGap:     { height: 24 },

  // Title block
  titleBlock:      { alignItems: "center", paddingVertical: 26 },
  reportTypeLabel: { fontSize: 6.5, color: SUBTLE, letterSpacing: 3, marginBottom: 10, textAlign: "center" },
  quizTitle:       { fontSize: 21, fontFamily: "Helvetica-Bold", color: INK, textAlign: "center" },

  // Section label
  sectionLabel: {
    fontSize: 6.5,
    fontFamily: "Helvetica-Bold",
    color: TEAL,
    letterSpacing: 2.5,
    marginBottom: 12,
  },

  // Score + badge
  scoreRow:    { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  scoreNumber: { fontSize: 48, fontFamily: "Helvetica-Bold", color: INK, lineHeight: 1, marginRight: 18 },
  narrative:   { fontSize: 9.5, color: MUTED, lineHeight: 1.55 },

  // Findings table
  tableHeaderRow: {
    flexDirection: "row",
    borderBottomWidth: 0.75,
    borderBottomColor: TEAL,
    paddingBottom: 6,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 6.5,
    borderBottomWidth: 0.5,
    borderBottomColor: RULE,
  },
  tableHeaderText: { fontSize: 7, fontFamily: "Helvetica-Bold", color: MUTED, letterSpacing: 1 },
  tableCellMain:   { flex: 1, fontSize: 9.5, color: INK },
  tableCellScore:  { width: 48, fontSize: 9.5, color: INK, textAlign: "right" },
  tableCellRisk:   { width: 70, fontSize: 8.5, fontFamily: "Helvetica-Bold", textAlign: "right" },

  // Actions
  actionRow:    { flexDirection: "row", marginBottom: 8 },
  actionNumber: {
    width: 18,
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: TEAL,
    textAlign: "right",
    marginRight: 9,
  },
  actionText: { flex: 1, fontSize: 9.5, color: INK, lineHeight: 1.5 },

  // Footer
  footer:           { marginTop: "auto" },
  footerDivider:    { height: 0.5, backgroundColor: RULE, marginBottom: 10 },
  footerBrand:      { fontSize: 7.5, fontFamily: "Helvetica-Bold", color: INK, textAlign: "center", marginBottom: 4 },
  footerDisclaimer: { fontSize: 6.5, color: SUBTLE, textAlign: "center", lineHeight: 1.4 },
});

// ── Component ─────────────────────────────────────────────────────────────────
interface Props {
  lang: string;
  dict: Dictionary;
  result: AssessmentResult;
}

export function CertificatePDFDocumentRisk({ lang, dict, result }: Props) {
  const t     = dict.results;
  const level = result.overallRiskLevel;

  const formattedDate = new Date(result.completedAt).toLocaleDateString(
    lang === "de" ? "de-DE" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" },
  );

  const narrative = {
    low:    t.narrativeLow,
    medium: t.narrativeMedium,
    high:   t.narrativeHigh,
  }[level];

  const riskLabel = {
    low:    dict.common.riskLow,
    medium: dict.common.riskMedium,
    high:   dict.common.riskHigh,
  }[level];

  return (
    <Document
      title={`${t.pageTitle} — ${BRAND.name}`}
      author={BRAND.name}
      creator={BRAND.name}
    >
      <Page size="A4" style={s.page}>
        {/* ── Top accent bar ─────────────────────────────────────── */}
        <View style={s.topBar} />

        {/* ── Main content ───────────────────────────────────────── */}
        <View style={s.content}>

          {/* Header: brand left, date right */}
          <View style={s.header}>
            <View>
              <Text style={s.brandName}>{BRAND.name.toUpperCase()}</Text>
              <Text style={s.brandUrl}>cyberchecklist.app</Text>
            </View>
            <View>
              <Text style={s.dateLabel}>{t.issuedOn.toUpperCase()}</Text>
              <Text style={s.dateValue}>{formattedDate}</Text>
            </View>
          </View>

          {/* Teal rule */}
          <View style={s.dividerPrimary} />

          {/* Centered title block */}
          <View style={s.titleBlock}>
            <Text style={s.reportTypeLabel}>{t.certificateTitle.toUpperCase()}</Text>
            <Text style={s.quizTitle}>{t.pageTitle}</Text>
          </View>

          <View style={s.dividerLight} />
          <View style={s.sectionGap} />

          {/* ── Overall Result ─────────────────────────────────── */}
          <Text style={s.sectionLabel}>{t.overallTitle.toUpperCase()}</Text>
          <View style={s.scoreRow}>
            <Text style={s.scoreNumber}>{result.overallScore}%</Text>
            {/* Risk badge — inline styles for dynamic colors */}
            <View style={{
              borderWidth: 1.25,
              borderColor: RISK_BD[level],
              borderRadius: 3,
              backgroundColor: RISK_BG[level],
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}>
              <Text style={{
                fontSize: 8.5,
                fontFamily: "Helvetica-Bold",
                color: RISK_INK[level],
                letterSpacing: 1,
              }}>
                {riskLabel.toUpperCase()}
              </Text>
            </View>
          </View>
          <Text style={s.narrative}>{narrative}</Text>

          <View style={s.sectionGap} />

          {/* ── Assessment Findings ────────────────────────────── */}
          <Text style={s.sectionLabel}>{t.findings.toUpperCase()}</Text>
          <View>
            <View style={s.tableHeaderRow}>
              <Text style={[s.tableHeaderText, { flex: 1 }]}>AREA</Text>
              <Text style={[s.tableHeaderText, { width: 48, textAlign: "right" }]}>SCORE</Text>
              <Text style={[s.tableHeaderText, { width: 70, textAlign: "right" }]}>RISK LEVEL</Text>
            </View>
            {result.moduleScores.map((ms) => (
              <View key={ms.module} style={s.tableRow}>
                <Text style={s.tableCellMain}>{ms.label}</Text>
                <Text style={s.tableCellScore}>{ms.score}%</Text>
                <Text style={[s.tableCellRisk, { color: RISK_INK[ms.riskLevel] }]}>
                  {
                    { low: dict.common.riskLow, medium: dict.common.riskMedium, high: dict.common.riskHigh }[ms.riskLevel]
                  }
                </Text>
              </View>
            ))}
          </View>

          <View style={s.sectionGap} />

          {/* ── Recommended Actions ────────────────────────────── */}
          <Text style={s.sectionLabel}>{t.printActions.toUpperCase()}</Text>
          {result.topRecommendations.map((rec, i) => (
            <View key={rec.id} style={s.actionRow}>
              <Text style={s.actionNumber}>{i + 1}.</Text>
              <Text style={s.actionText}>{rec.title}</Text>
            </View>
          ))}

          {/* ── Footer (pushed to page bottom by marginTop:auto) ── */}
          <View style={s.footer}>
            <View style={s.footerDivider} />
            <Text style={s.footerBrand}>{BRAND.name} · cyberchecklist.app</Text>
            <Text style={s.footerDisclaimer}>{t.disclaimer}</Text>
          </View>
        </View>

        {/* ── Bottom accent bar ──────────────────────────────────── */}
        <View style={s.bottomBar} />
      </Page>
    </Document>
  );
}
