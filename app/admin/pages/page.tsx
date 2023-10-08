import PageHeader from "@/components/layout/page-header";
import Loading from "../loading";
import { Suspense } from "react";
import PagesTable from "@/views/pages/pages-table";

export default function PagesPage() {
  return (
    <section id="pages-page" className="space-y-4">
      <PageHeader
        title="menu.pages"
        buttonText="pages.createPage"
        buttonHref="/admin/pages/create"
      />
      <Suspense fallback={<Loading />}>
        <PagesTable />
      </Suspense>
    </section>
  );
}
