import PageHeader from "@/components/layout/page-header";
import UsersTable from "@/views/users/users-table";
import type { Metadata } from "next";
import { Suspense } from "react";
import Loading from "../loading";

export const metadata: Metadata = {
  title: "Users - Voip"
};

export default async function UsersPage() {
  return (
    <section id="users-page" className="space-y-4">
      <PageHeader title="menu.users" />
      <Suspense fallback={<Loading />}>
        <UsersTable />
      </Suspense>
    </section>
  );
}
