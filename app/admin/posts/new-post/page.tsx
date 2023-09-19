"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditorState, convertToRaw } from "draft-js";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import draftToHtml from "draftjs-to-html";

const postSchema = z.object({
  title: z.string().nonempty(),
  featuredImage: z.string().url(),
  editor: z.string().nonempty(),
  videoURL: z.string().url().optional(),
});

type PostSchema = z.infer<typeof postSchema>;

export default function NewPostPage() {
  const form = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      featuredImage: "",
      editor: "",
      videoURL: "",
    },
  });

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const onEditorStateChange = (editorState: EditorState) => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);

    setEditorState(editorState);
  };

  const onSubmit: SubmitHandler<PostSchema> = async (data) => {
    console.log(data);
  };

  return (
    <section id="new-post-page" className="space-y-4">
      <h1 className="text-xl font-medium">Create Post</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="title">Title</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="featuredImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="featuredImage">Featured Image</FormLabel>
                <FormControl>
                  <Input type="file" id="featuredImage" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="editor"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="editor">Content</FormLabel>
                <FormControl>
                  <Editor
                    editorState={editorState}
                    toolbarClassName="!mb-0 !rounded-none border border-stone-200"
                    editorClassName="border-l border-r border-b border-stone-200 p-4 min-h-[300px]"
                    onEditorStateChange={onEditorStateChange}
                    placeholder="Write your post here..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
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
          />
          <div className="space-x-4">
            <Button variant="outline">Cancel</Button>
            <Button variant="outline">Draft</Button>
            <Button>Publish</Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
