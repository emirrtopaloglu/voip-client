import { z } from "zod";

export const createLoginLogSchema = z
  .object({
    user_id: z.number({
      required_error: "User ID alanı zorunludur.",
    }),
    username: z.string({
      required_error: "Username alanı zorunludur.",
    }),
  })
  .required()
  .strict("Geçersiz alanlar bulunmaktadır.");
