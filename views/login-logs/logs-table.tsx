"use client";
import { DataTable } from "@/components/data-table";
import { useEffect, useState } from "react";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { Loader2, Edit, Trash } from "lucide-react";
import { type ColumnDef } from "@tanstack/react-table";
import i18n from "@/lib/i18n";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import moment from "moment";
import { Badge } from "@/components/ui/badge";

interface Log {
  id: number;
  user_id: number;
  user_ip: string;
  username: string;
  created_at: string;
}

export default function LogsTable() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const getPostsList = async (limit: number, page: number) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/api/login-logs?limit=${limit}&page=${page}`
      );
      setData(res.data.data);
      setTotalCount(res.data.totalCount);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostsList(limit, page);
  }, []);

  const handlePageChange = (page: number) => {
    setPage(page);
    getPostsList(limit, page);
  };

  const handleLimitChange = (limit: number) => {
    setLimit(limit);
    getPostsList(limit, page);
  };

  const deletePost = async (id: number) => {
    try {
      setButtonLoading(true);
      const res = await axios.delete(`/api/blogs/${id}`);
      if (res.data.success) {
        getPostsList(limit, page);
      }
      getPostsList(limit, page);
    } catch (error) {
      console.error(error);
    } finally {
      setButtonLoading(false);
    }
  };

  const columns: ColumnDef<Log>[] = [
    {
      accessorKey: "id",
      header: "ID"
    },
    {
      accessorKey: "username",
      header: i18n.t("common.name"),
      cell: ({ row }) => (
        <Link href={"/admin/users/" + row.original.id} className="font-medium">
          {row.original.username}
        </Link>
      )
    },
    {
      accessorKey: "user_ip",
      header: i18n.t("common.ip_address")
    },
    {
      accessorKey: "date",
      header: i18n.t("common.date"),
      cell: ({ row }) => (
        <span>{moment(row.original.created_at).format("LLL")}</span>
      )
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center">
        <Loader2 size={32} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <DataTable columns={columns} data={data} />
      <DataTablePagination
        page={page}
        setPage={handlePageChange}
        totalCount={totalCount}
        limit={limit}
        setLimit={handleLimitChange}
      />
    </div>
  );
}
