"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw
} from "draft-js";
import htmlToDraft from "html-to-draftjs";
import { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import draftToHtml from "draftjs-to-html";
import dynamic from "next/dynamic";
import type { EditorProps } from "react-draft-wysiwyg";
import i18n from "@/lib/i18n";
import { useTranslation } from "react-i18next";
import slugify from "@/utils/slugify";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import UploadForm from "../uploads/upload-form";

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const postSchema = z.object({
  title: z.string().min(1, { message: i18n.t("error.required") }),
  slug: z.string().min(1, { message: i18n.t("error.required") }),
  content: z.any().optional(),
  featured_image: z.string().optional(),
  meta_description: z.string().optional(),
  meta_keyword: z.string().optional()
});

type PostSchema = z.infer<typeof postSchema>;

export default function PostForm({ slug }: { slug?: string }) {
  const { t } = useTranslation();
  const router = useRouter();

  const form = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      featured_image: "",
      meta_description: "",
      meta_keyword: ""
    }
  });

  const watchTitle = form.watch("title");
  const watchFeaturedImage = form.watch("featured_image");

  const [id, setId] = useState<number | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const onEditorStateChange = (editorState: EditorState) => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);

    console.log("editorState", editorState);
    console.log("rawContentState", markup);
    console.log("markup", markup);

    setEditorState(editorState);
  };

  const onSubmit: SubmitHandler<PostSchema> = async (data) => {
    try {
      setLoading(true);
      if (slug) {
        const res = await axios.put(`api/blogs/${id}`, {
          ...data,
          content: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        });
        if (res.data.success) {
          router.back();
        }
      } else {
        const res = await axios.post("api/blogs", {
          ...data,
          content: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        });
        if (res.data.success) {
          router.back();
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectFeaturedImage = (url: string) => {
    form.setValue("featured_image", url);
    setOpen(false);
  };

  const getPost = async (slug: string) => {
    try {
      const res = await axios.get(`api/blogs/${slug}`);
      if (res.data.success) {
        const data = res.data.data;
        setId(data.id);

        form.setValue("title", data.title);
        form.setValue("slug", data.slug);
        form.setValue("featured_image", data.featured_image);
        form.setValue("meta_description", data.meta_description);
        form.setValue("meta_keyword", data.meta_keyword);

        const blocksFromHtml = htmlToDraft(data.content);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(
          contentBlocks,
          entityMap
        );
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
        form.setValue(
          "content",
          draftToHtml(convertToRaw(editorState.getCurrentContent()))
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    form.setValue("slug", slugify(watchTitle));
  }, [watchTitle]);

  useEffect(() => {
    if (slug) getPost(slug);
  }, [slug]);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4"
          encType="multipart/form-data"
        >
          <div className="space-y-4 col-span-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="title">{t("common.title")}</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={t("common.title")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="title">{t("posts.slug")}</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={t("posts.slug")}
                      className="h-8 text-sm"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="editor">{t("posts.content")}</FormLabel>
                  <FormControl>
                    <Editor
                      editorState={editorState}
                      toolbarClassName="!mb-0 !rounded-none border border-stone-200"
                      editorClassName="border-l border-r border-b border-stone-200 p-4 min-h-[300px]"
                      onEditorStateChange={onEditorStateChange}
                      placeholder={t("posts.writeHere")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="featured_image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="featured_image">
                    {t("posts.featuredImage")}
                  </FormLabel>
                  <FormControl>
                    <>
                      {watchFeaturedImage && (
                        <div className="border p-4 rounded-md mb-4">
                          <img
                            src={watchFeaturedImage}
                            className="w-full h-64 object-contain"
                          />
                        </div>
                      )}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(true)}
                        className="w-full"
                      >
                        {t("uploads.selectFile")}
                      </Button>
                    </>
                    {/* <Input type="hidden" id="featured_image" {...field} /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="meta_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="meta_description">
                    {t("posts.metaDescription")}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      id="meta_description"
                      placeholder={t("posts.metaDescription")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="meta_keyword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="meta_keywords">
                    {t("posts.metaKeywords")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id="meta_keyword"
                      placeholder={t("posts.metaKeywords")}
                      {...field}
                    />
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
                {slug ? t("common.update") : t("common.publish")}
              </Button>
            </div>
          </div>
          {/* <FormField
          control={form.control}
          name="videoURL"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="videoURL">Video URL (optional)</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  id="videoURL"
                  placeholder="https://youtube.com/watch?v="
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        </form>
      </Form>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="block w-full"></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("uploads.uploadFile")}</DialogTitle>
          </DialogHeader>
          <UploadForm
            dialog={{ open: open, setOpen: setOpen }}
            afterUploaded={handleSelectFeaturedImage}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
