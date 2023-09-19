"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { User } from "./types";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "firstName",
    header: "Name Surname",
    cell: ({ row }) => (
      <span>{`${row.getValue("firstName")} ${row.getValue("lastName")}`}</span>
    ),
  },
  {
    accessorKey: "lastName",
    header: "Name Surname",
    cell: ({ row }) => (
      <span>{`${row.getValue("firstName")} ${row.getValue("lastName")}`}</span>
    ),
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
];
