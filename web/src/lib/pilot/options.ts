/** The four bands from the design's "Accounts in collection" select. Labels are verbatim. */
export const ACCOUNTS_BANDS = [
  { value: "under-5k", label: "Under 5,000" },
  { value: "5k-50k", label: "5,000 – 50,000" },
  { value: "50k-5l", label: "50,000 – 5 lakh" },
  { value: "over-5l", label: "More than 5 lakh" },
] as const;

export type AccountsBand = (typeof ACCOUNTS_BANDS)[number]["value"];

export const bandLabel = (value: string) => ACCOUNTS_BANDS.find((b) => b.value === value)?.label ?? value;

export type PilotField = "name" | "email" | "organisation" | "accountsBand";

export type PilotState =
  | { status: "idle" }
  | { status: "success"; reference: string }
  | { status: "error"; message: string; fieldErrors?: Partial<Record<PilotField, string>>; values?: Partial<Record<PilotField, string>> };
