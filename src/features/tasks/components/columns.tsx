"use client";

import { Button } from "@/components/ui/button";
import { Task } from "@/features/tasks/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDownIcon } from "lucide-react";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Task Name <ArrowUpDownIcon className="ml-2 size-4" />
      </Button>
    ),
  },
];
