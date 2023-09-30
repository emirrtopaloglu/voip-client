import { z } from "zod";

export const createNewsLetterSchema = z
  .object({
    fullname: z.string({
      required_error: "Ad-soyad alanı zorunludur.",
    }),
    email: z.string({
      required_error: "Email alanı zorunludur.",
    }),
  })
  .required();

export const updateNewsLetterSchema = z
  .object({
    is_subscribed: z.boolean().optional(),
  })
  .strict("Sadece abonelik alanı güncellenebilir.");
