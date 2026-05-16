const LEGAL_CONTACT = {
  operatorName: (process.env.LEGAL_OPERATOR_NAME ?? "").trim(),
  addressLine: (process.env.LEGAL_ADDRESS_LINE ?? "").trim(),
  postalCodeCity: (process.env.LEGAL_POSTAL_CODE_CITY ?? "").trim(),
  country: (process.env.LEGAL_COUNTRY ?? "").trim(),
  contactEmail: (process.env.LEGAL_CONTACT_EMAIL ?? "").trim(),
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

  return text
    .replace(/\[OPERATOR_NAME\]/g, LEGAL_CONTACT.operatorName || "[OPERATOR_NAME]")
    .replace(/\[ADDRESS_LINE\]/g, LEGAL_CONTACT.addressLine || "[ADDRESS_LINE]")
    .replace(/\[ADRESSZEILE\]/g, LEGAL_CONTACT.addressLine || "[ADRESSZEILE]")
    .replace(/\[POSTAL_CODE CITY\]/g, LEGAL_CONTACT.postalCodeCity || "[POSTAL_CODE CITY]")
    .replace(/\[PLZ ORT\]/g, LEGAL_CONTACT.postalCodeCity || "[PLZ ORT]")
    .replace(/\[COUNTRY\]/g, LEGAL_CONTACT.country || "[COUNTRY]")
    .replace(/\[LAND\]/g, LEGAL_CONTACT.country || "[LAND]")
    .replace(/\[CONTACT_EMAIL\]/g, LEGAL_CONTACT.contactEmail || "[CONTACT_EMAIL]");
}
