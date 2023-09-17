import { redirect } from "next/navigation";

export default async function AdminRootPage() {
  return redirect("/admin/home");
}
