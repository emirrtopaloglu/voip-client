import { z } from "zod";

export const createMenuSchema = z
  .object({
    title: z.string({
      required_error: "Başlık alanı zorunludur.",
    }),
  })
  .required();

export const updateMenuSchema = z
  .object({
    title: z.string().optional(),
    is_visible: z.boolean().optional(),
  })
  .strict("Sadece başlık ve görünürlük alanları güncellenebilir.");
