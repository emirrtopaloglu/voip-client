import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function UsersPage() {
  const res = await fetch("http://localhost:3000/api/users");
  const { data: users } = await res.json();

  return (
    <section id="users-page" className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">Users</h1>
        <Button>
          <Plus size={16} className="inline-block mr-2" />
          Create User
        </Button>
      </div>
      <div>
        <DataTable
          columns={columns}
          data={[...users, ...users, ...users, ...users]}
        />
      </div>
    </section>
  );
}
