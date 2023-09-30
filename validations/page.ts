import { z } from "zod";

export const createPageSchema = z
  .object({
    title: z.string({
      required_error: "Başlık alanı zorunludur.",
    }),
    slug: z.string({
      required_error: "Slug alanı zorunludur.",
    }),
    content: z.string({
      required_error: "İçerik alanı zorunludur.",
    }),
    meta_description: z.string().optional(),
    meta_keyword: z.string().optional(),
    featured_image: z.string().optional(),
  })
  .strict("Lütfen sadece geçerli alanları gönderiniz.");

export const updatePageSchema = z
  .object({
    title: z.string().optional(),
    slug: z.string().optional(),
    content: z.string().optional(),
    meta_description: z.string().optional(),
    meta_keyword: z.string().optional(),
    featured_image: z.string().optional(),
    is_published: z.boolean().optional(),
  })
  .strict("Lütfen sadece geçerli alanları gönderiniz.");
