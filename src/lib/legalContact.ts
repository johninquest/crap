const LEGAL_CONTACT = {
  operatorName: (process.env.LEGAL_OPERATOR_NAME ?? "").trim(),
  operatorUrl: (process.env.LEGAL_OPERATOR_URL ?? "").trim(),
  addressLine: (process.env.LEGAL_ADDRESS_LINE ?? "").trim(),
  postalCodeCity: (process.env.LEGAL_POSTAL_CODE_CITY ?? "").trim(),
  country: (process.env.LEGAL_COUNTRY ?? "").trim(),
  contactEmail: (process.env.LEGAL_CONTACT_EMAIL ?? "").trim(),
  vatId: (process.env.LEGAL_VAT_ID ?? "").trim(),
  registerCourt: (process.env.LEGAL_REGISTER_COURT ?? "").trim(),
  registerNumber: (process.env.LEGAL_REGISTER_NUMBER ?? "").trim(),
};

let hasWarnedMissingLegalContact = false;

function warnMissingLegalContactVars() {
  if (hasWarnedMissingLegalContact) return;

  const missingVars: string[] = [];
  if (!LEGAL_CONTACT.operatorName) missingVars.push("LEGAL_OPERATOR_NAME");
  if (!LEGAL_CONTACT.addressLine) missingVars.push("LEGAL_ADDRESS_LINE");
  if (!LEGAL_CONTACT.postalCodeCity) missingVars.push("LEGAL_POSTAL_CODE_CITY");
  if (!LEGAL_CONTACT.country) missingVars.push("LEGAL_COUNTRY");
  if (!LEGAL_CONTACT.contactEmail) missingVars.push("LEGAL_CONTACT_EMAIL");
  if (!LEGAL_CONTACT.vatId) missingVars.push("LEGAL_VAT_ID");

  if (missingVars.length > 0) {
    console.warn(
      `[legalContact] Missing legal contact environment variables: ${missingVars.join(", ")}. Placeholders will stay visible until configured.`
    );
  }

  hasWarnedMissingLegalContact = true;
}

/** Replaces [TOKEN] placeholders in EN and DE legal copy with env-var values. */
export function applyLegalContact(text: string): string {
  warnMissingLegalContactVars();

  const hasRegisterData =
    LEGAL_CONTACT.registerCourt.length > 0 && LEGAL_CONTACT.registerNumber.length > 0;
  const registerInfoDe = hasRegisterData
    ? `Handelsregister: Amtsgericht ${LEGAL_CONTACT.registerCourt}, HRB ${LEGAL_CONTACT.registerNumber}`
    : "";
  const registerInfoEn = hasRegisterData
    ? `Commercial Register: Local Court ${LEGAL_CONTACT.registerCourt}, HRB ${LEGAL_CONTACT.registerNumber}`
    : "";

  return text
    .replace(/\[OPERATOR_NAME\]/g, LEGAL_CONTACT.operatorName || "[OPERATOR_NAME]")
    .replace(/\[OPERATOR_URL\]/g, LEGAL_CONTACT.operatorUrl || "[OPERATOR_URL]")
    .replace(/\[ADDRESS_LINE\]/g, LEGAL_CONTACT.addressLine || "[ADDRESS_LINE]")
    .replace(/\[ADRESSZEILE\]/g, LEGAL_CONTACT.addressLine || "[ADRESSZEILE]")
    .replace(/\[POSTAL_CODE CITY\]/g, LEGAL_CONTACT.postalCodeCity || "[POSTAL_CODE CITY]")
    .replace(/\[PLZ ORT\]/g, LEGAL_CONTACT.postalCodeCity || "[PLZ ORT]")
    .replace(/\[COUNTRY\]/g, LEGAL_CONTACT.country || "[COUNTRY]")
    .replace(/\[LAND\]/g, LEGAL_CONTACT.country || "[LAND]")
    .replace(/\[CONTACT_EMAIL\]/g, LEGAL_CONTACT.contactEmail || "[CONTACT_EMAIL]")
    .replace(/\[VAT_ID\]/g, LEGAL_CONTACT.vatId || "[VAT_ID]")
    .replace(/\[REGISTER_INFO_DE\]/g, registerInfoDe)
    .replace(/\[REGISTER_INFO_EN\]/g, registerInfoEn);
}
