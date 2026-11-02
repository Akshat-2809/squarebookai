/** The four bands from the design's "Accounts in collection" select. Labels are verbatim. */
export const ACCOUNTS_BANDS = [
  { value: "under-5k", label: "Under 5,000" },
  { value: "5k-50k", label: "5,000 – 50,000" },
  { value: "50k-5l", label: "50,000 – 5 lakh" },
  { value: "over-5l", label: "More than 5 lakh" },
] as const;

export type PilotField = "name" | "email" | "organisation" | "accountsBand";
