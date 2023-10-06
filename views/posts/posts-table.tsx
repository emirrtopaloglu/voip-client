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

interface Post {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  is_published: boolean;
}

export default function PostsTable() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const getPostsList = async (limit: number, page: number) => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/blogs?limit=${limit}&page=${page}`);
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

  const columns: ColumnDef<Post>[] = [
    {
      accessorKey: "id",
      header: "ID"
    },
    {
      accessorKey: "title",
      header: i18n.t("common.title"),
      cell: ({ row }) => (
        <Link href={"/admin/posts/" + row.original.id} className="font-medium">
          {row.original.title}
        </Link>
      )
    },
    {
      accessorKey: "created_at",
      header: i18n.t("common.createdAt"),
      cell: ({ row }) => (
        <span>{moment(row.original.created_at).format("LLL")}</span>
      )
    },
    {
      accessorKey: "updated_at",
      header: i18n.t("common.updatedAt"),
      cell: ({ row }) => (
        <span>{moment(row.original.updated_at).format("LLL")}</span>
      )
    },
    {
      accessorKey: "is_published",
      header: i18n.t("common.status"),
      cell: ({ row }) => (
        <Badge
          variant={row.original.is_published ? "default" : "secondary"}
          className="px-2"
        >
          {row.original.is_published
            ? i18n.t("posts.published")
            : i18n.t("posts.draft")}
        </Badge>
      )
    },
    {
      header: i18n.t("common.actions"),
      cell: ({ row }) => (
        <div className="space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={"/admin/posts/" + row.original.id}>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-8 h-8"
                >
                  <Edit size={16} />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>{i18n.t("common.edit")}</TooltipContent>
          </Tooltip>
          <AlertDialog>
            <AlertDialogTrigger>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full w-8 h-8"
                    disabled={buttonLoading}
                  >
                    <Trash size={16} className="text-red-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{i18n.t("common.delete")}</TooltipContent>
              </Tooltip>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                {i18n.t("common.areYouSure")}
              </AlertDialogHeader>
              <AlertDialogDescription>
                {i18n.t("posts.deletePostText")}
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel>{i18n.t("common.cancel")}</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={() => deletePost(row.original.id)}
                >
                  {i18n.t("common.delete")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
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
