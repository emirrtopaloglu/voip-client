import PageHeader from "@/components/layout/page-header";
import PageForm from "@/views/pages/page-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Post - Voip"
};

export default function NewPostPage() {
  return (
    <section id="new-post-page" className="space-y-4">
      <PageHeader title="pages.createPage" />
      <PageForm />
    </section>
  );
}
