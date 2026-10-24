import { z } from "zod";
import { ACCOUNTS_BANDS } from "./options";

const bandValues = ACCOUNTS_BANDS.map((b) => b.value) as [string, ...string[]];

export const pilotRequestSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(120, "That name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your work email.")
    .max(254, "That email is too long.")
    .pipe(z.email("Please enter a valid email address.")),
  organisation: z.string().trim().min(1, "Please enter your organisation.").max(160, "That name is too long."),
  accountsBand: z.enum(bandValues, "Please choose how many accounts are in collection."),
  // Honeypot: real visitors never see or fill this.
  website: z.string().optional().default(""),
});

export type PilotRequestInput = z.infer<typeof pilotRequestSchema>;
