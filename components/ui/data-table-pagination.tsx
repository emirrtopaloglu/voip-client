"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./select";

interface DataTablePaginationProps {
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
  totalCount: number;
}

export function DataTablePagination({
  page,
  setPage,
  limit,
  setLimit,
  totalCount
}: DataTablePaginationProps) {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between space-x-2">
      <div className="flex items-center space-x-4">
        <span className="text-sm text-stone-700">{t("common.itemsPerPage")}</span>
        <Select
          onValueChange={(val) => setLimit(Number(val))}
          defaultValue={String(limit)}
          value={String(limit)}
        >
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder={t("common.select")}>
              {limit}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex space-x-2">
        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          <ChevronLeft size={16} />
        </Button>
        <div className="h-8 w-12 flex items-center justify-center text-center border border-stone-200 rounded-md">
          <span className="font-normal text-stone-7">{page || 0}</span>
        </div>
        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8"
          disabled={page >= Math.ceil(totalCount / limit)}
          onClick={() => setPage(page + 1)}
        >
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}
