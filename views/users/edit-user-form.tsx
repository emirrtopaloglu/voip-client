"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from "@/lib/axios";
import i18n from "@/lib/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as z from "zod";

const editUserSchema = z.object({
  firstname: z.string().min(1, { message: i18n.t("error.required") }),
  lastname: z.string().min(1, { message: i18n.t("error.required") }),
  email: z
    .string()
    .min(1, { message: i18n.t("error.required") })
    .email({ message: i18n.t("error.invalidEmail") }),
  phone: z
    .string()
    .min(1, { message: i18n.t("error.required") })
    .max(14, { message: i18n.t("error.invalidPhone") }),
  company_name: z.string().min(1, { message: i18n.t("error.required") }),
  address: z.string().min(1, { message: i18n.t("error.required") })
  //   is_verified: z.boolean().optional()
});

type EditUserSchema = z.infer<typeof editUserSchema>;

export default function EditUserForm({ id }: { id: string }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<EditUserSchema>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      company_name: "",
      address: ""
    }
  });

  const onSubmit: SubmitHandler<EditUserSchema> = async (data) => {
    try {
      setLoading(true);
      const res = await axios.put(`/api/users/${id}`, data);
      console.log(res);
      if (res.status == 200) {
        router.back();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const res = await axios.get(`/api/users/${id}`);
      form.reset(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="firstname">
                  {t("common.firstName")}
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={t("common.firstName")}
                    {...field}
                  />
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
                <FormLabel htmlFor="lastname">{t("common.lastName")}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={t("common.lastName")}
                    {...field}
                  />
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
                <FormLabel htmlFor="email">{t("common.email")}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t("common.email")}
                    {...field}
                    disabled={true}
                    readOnly={true}
                  />
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
                <FormLabel htmlFor="phone">{t("common.phone")}</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder={t("common.phone")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* <FormField
          control={form.control}
          name="is_verified"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="is_verified">Verified</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("common.select")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="true">{t("common.active")}</SelectItem>
                  <SelectItem value="false">{t("common.passive")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="company_name">
                {t("common.company")}
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder={t("common.company")}
                  {...field}
                />
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
              <FormLabel htmlFor="address">{t("common.address")}</FormLabel>
              <FormControl>
                <Textarea placeholder={t("common.address")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-x-4">
          <Button variant="outline" onClick={() => router.back()}>
            {t("common.cancel")}
          </Button>
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 size={16} className="mr-2 animate-spin" />}
            {t("common.save")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
