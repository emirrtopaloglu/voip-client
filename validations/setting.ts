import { z } from "zod";

export const createSettingSchema = z
  .object({
    kv_settings: z.string({
      required_error: "Ayarlar alanı zorunludur.",
    }),
  })
  .required();

export const updateSettingSchema = z
  .object({
    kv_settings: z.string({
      required_error: "Ayarlar alanı zorunludur.",
    }),
  })
  .strict("Sadece ayarlar alanları güncellenebilir.");
