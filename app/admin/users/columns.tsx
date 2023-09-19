"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { User } from "./types";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "companyName",
    header: "Company",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    header: "Actions",
    cell: (row) => (
      <div className="space-x-2">
        <Button variant="outline" size="icon" className="rounded-full w-8 h-8">
          <Edit size={16} />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full w-8 h-8">
          <Trash size={16} className="text-red-500" />
        </Button>
      </div>
    ),
  },
];
