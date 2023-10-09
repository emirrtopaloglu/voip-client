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
import i18n from "@/lib/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as z from "zod";

const newsletterSchema = z.object({
  fullname: z.string().min(3).max(255),
  email: z.string().email({ message: i18n.t("error.invalidEmail") })
});

type NewsletterSchema = z.infer<typeof newsletterSchema>;

export default function NewsletterForm() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<NewsletterSchema>({
    resolver: zodResolver(newsletterSchema)
  });

  const website_url = process.env.WEBSITE_URL || "http://localhost:3000";

  const onSubmit: SubmitHandler<NewsletterSchema> = async (data) => {
    try {
      setLoading(true);
      const res = await fetch(website_url + "/api/newsletters", {
        method: "POST",
        body: JSON.stringify(data)
      });
      const json = await res.json();
      console.log(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex-1 flex flex-row">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex-1 space-y-2"
        >
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="fullname">{t("common.name")}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={t("common.name")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="email">{t("common.email")}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t("common.email")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} className="w-full">
            {loading && <Loader2 size={16} className="mr-2" />}
            {t("common.subscribe")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
