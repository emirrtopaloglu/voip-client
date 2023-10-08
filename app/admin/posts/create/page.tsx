import PostForm from "@/views/posts/post-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Post - Voip"
};

export default function NewPostPage() {
  return (
    <section id="new-post-page" className="space-y-4">
      <h1 className="text-xl font-medium">Create Post</h1>
      <PostForm />
    </section>
  );
}
