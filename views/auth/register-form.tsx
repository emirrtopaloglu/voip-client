"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n";
import toast from "react-hot-toast";
import axios from "@/lib/axios";

const registerSchema = z
  .object({
    firstname: z.string().min(1, { message: i18n.t("error.required") }),
    lastname: z.string().min(1, { message: i18n.t("error.required") }),
    email: z
      .string()
      .min(1, { message: i18n.t("error.required") })
      .email({ message: i18n.t("error.invalidEmail") }),
    password: z
      .string()
      .min(1, { message: i18n.t("error.required") })
      .regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z]).{8,}$"), {
        message: i18n.t("error.invalidPassword")
      }),
    password_confirm: z
      .string()
      .min(1, { message: i18n.t("error.required") })
      .regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z]).{8,}$"), {
        message: i18n.t("error.invalidPassword")
      }),
    company_name: z.string().min(1, { message: i18n.t("error.required") }),
    address: z.string().min(1, { message: i18n.t("error.required") }),
    phone: z
      .string()
      .min(1, { message: i18n.t("error.required") })
      .max(14, { message: i18n.t("error.invalidPhone") })
  })
  .superRefine(({ password_confirm, password }, ctx) => {
    if (password_confirm !== password) {
      ctx.addIssue({
        path: ["password_confirm"],
        code: "custom",
        message: i18n.t("error.passwordsDontMatch")
      });
    }
  });

type RegisterSchema = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password_confirm: "",
      company_name: "",
      address: "",
      phone: ""
    }
  });

  const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/register", {
        ...data,
        password_confirm: undefined
      });

      if (res.status == 201) {
        router.replace("/admin/auth/login");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="firstname">First Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="lastname">Last Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="phone">Phone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="Phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password_confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="company_name">Company</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Company" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="address">Address</FormLabel>
              <FormControl>
                <Textarea placeholder="Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 size={16} className="mr-2 animate-spin" />}
          Register
        </Button>
      </form>
    </Form>
  );
}
