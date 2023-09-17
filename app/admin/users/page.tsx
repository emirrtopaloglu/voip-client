import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function UsersPage() {
  return (
    <section id="users-page">
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-medium mb-1">Users</h1>
          <p className="text-sm text-stone-400 leading-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptatibus, quos, tempore, voluptate quia voluptatum.
          </p>
        </div>
        <Button>
          <Plus size={16} className="inline-block mr-2" />
          Create User
        </Button>
      </div>
    </section>
  );
}
