import PageHeader from "@/components/layout/page-header";
import axios from "@/lib/axios";
import EditUserForm from "@/views/users/edit-user-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit User - Voip"
};

export default function EditUser({ params: { id } }) {
  return (
    <section id="edit-user-page" className="space-y-4">
      <PageHeader title="users.editUser" />
      <EditUserForm id={id} />
    </section>
  );
}
