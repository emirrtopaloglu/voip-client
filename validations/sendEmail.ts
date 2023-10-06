import { z } from "zod";

export const createSendEmailSchema = z
  .object({
    is_all: z.boolean().optional(),
    mail_list: z
      .string({
        required_error: "Eposta adresi alanı zorunludur.",
      })
      .array(),
    mail_title: z.string({ required_error: "Mail başlık alanı zorunludur." }),
    mail_body: z.string({ required_error: "Mail gövde alanı zorunludur." }),
  })
  .strict("Lütfen sadece geçerli alanları gönderiniz.");

export const updateBlogSchema = z
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
