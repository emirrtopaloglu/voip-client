import PageHeader from "@/components/layout/page-header";
import Loading from "../loading";
import { Suspense } from "react";
import LogsTable from "@/views/login-logs/logs-table";

export default function PostsPage() {
  return (
    <section id="posts-page" className="space-y-4">
      <PageHeader title="menu.logs" />
      <Suspense fallback={<Loading />}>
        <LogsTable />
      </Suspense>
    </section>
  );
}
