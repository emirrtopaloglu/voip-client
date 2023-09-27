import { z } from "zod";

export const createUserSchema = z
  .object({
    firstname: z.string({
      required_error: "İsim alanı zorunludur.",
    }),
    lastname: z.string({
      required_error: "Soyisim alanı zorunludur.",
    }),
    email: z.string({
      required_error: "E-posta alanı zorunludur.",
    }),
    password: z
      .string({
        required_error: "Şifre alanı zorunludur.",
      })
      .regex(
        new RegExp("^(?=.*[a-z])(?=.*[A-Z]).{8,}$"),
        "Şifre en az 8 karakter uzunluğunda ve en az 1 büyük, 1 küçük harf içerecek şekilde olmalıdır."
      ),
    company_name: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    last_login: z.string().optional(),
  })
  .strict("Lütfen sadece geçerli alanları gönderiniz.");

export const updateUserSchema = z
  .object({
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    company_name: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    last_login: z.date().optional(),
    is_verified: z.boolean().optional(),
  })
  .strict("Lütfen sadece geçerli alanları gönderiniz.");

export const loginSchema = z
  .object({
    email: z.string({ required_error: "E-posta alanı zorunludur." }),
    password: z.string({ required_error: "Şifre alanı zorunludur." }),
  })
  .strict("Lütfen sadece geçerli alanları gönderiniz.");
