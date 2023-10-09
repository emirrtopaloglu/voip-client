import PageHeader from "@/components/layout/page-header";
import PageForm from "@/views/pages/page-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Post - Voip"
};

export default function NewPostPage({
  params: { slug }
}: {
  params: { slug: string };
}) {
  return (
    <section id="new-post-page" className="space-y-4">
      <PageHeader title="pages.editPage" />
      <PageForm slug={slug} />
    </section>
  );
}
