"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Task } from "@/features/tasks/types";
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name <ArrowUpDownIcon className="ml-2 size-4" />
      </Button>
    ),
  },
];
