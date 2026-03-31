export const BRAND = {
  namePrefix: "Cyber",
  nameSuffix: "Oort",
  get name() {
    return this.namePrefix + this.nameSuffix;
  },
  tagline:
    "A quick, clear check to understand your cyber risk — and what actually matters right now. No jargon, no scare tactics.",
  storageKey: "cyberclar_result",
} as const;
