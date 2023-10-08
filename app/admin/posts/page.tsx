import PageHeader from "@/components/layout/page-header";
import Loading from "../loading";
import { Suspense } from "react";
import PostsTable from "@/views/posts/posts-table";

export default function PostsPage() {
  return (
    <section id="posts-page" className="space-y-4">
      <PageHeader title="menu.posts" buttonText="posts.createPost" buttonHref="/admin/posts/create" />
      <Suspense fallback={<Loading />}>
        <PostsTable />
      </Suspense>
    </section>
  );
}
