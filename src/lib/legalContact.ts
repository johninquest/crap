const LEGAL_CONTACT = {
  operatorName:   process.env.LEGAL_OPERATOR_NAME    ?? "",
  addressLine:    process.env.LEGAL_ADDRESS_LINE     ?? "",
  postalCodeCity: process.env.LEGAL_POSTAL_CODE_CITY ?? "",
  country:        process.env.LEGAL_COUNTRY          ?? "",
  contactEmail:   process.env.LEGAL_CONTACT_EMAIL    ?? "",
};

/** Replaces [TOKEN] placeholders in EN and DE legal copy with env-var values. */
export function applyLegalContact(text: string): string {
  return text
    .replace(/\[OPERATOR_NAME\]/g,    LEGAL_CONTACT.operatorName)
    .replace(/\[ADDRESS_LINE\]/g,     LEGAL_CONTACT.addressLine)
    .replace(/\[ADRESSZEILE\]/g,      LEGAL_CONTACT.addressLine)
    .replace(/\[POSTAL_CODE CITY\]/g, LEGAL_CONTACT.postalCodeCity)
    .replace(/\[PLZ ORT\]/g,          LEGAL_CONTACT.postalCodeCity)
    .replace(/\[COUNTRY\]/g,          LEGAL_CONTACT.country)
    .replace(/\[LAND\]/g,             LEGAL_CONTACT.country)
    .replace(/\[CONTACT_EMAIL\]/g,    LEGAL_CONTACT.contactEmail);
}
