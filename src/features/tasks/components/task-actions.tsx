"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteTask } from "@/features/tasks/api/use-delete-task";
import useConfirm from "@/hooks/use-confirm";
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  id: string;
  projectId: string;
  children: ReactNode;
};

const TaskActions = ({ id, projectId, children }: Props) => {
  const { mutate: deleteTask, isPending: isDeletingTask } = useDeleteTask();

  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Task",
    "This action cannot be undone",
    "destructive",
  );

  const onDelete = async () => {
    const ok = await confirm();

    if (!ok) return;

    deleteTask({ param: { taskId: id } });
  };

  return (
    <div className="flex justify-end">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={() => {}}
            disabled={isDeletingTask}
            className="p-[10px] font-medium"
          >
            <ExternalLinkIcon className="mr-2 size-4 stroke-2" />
            Task Details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {}}
            disabled={isDeletingTask}
            className="p-[10px] font-medium"
          >
            <ExternalLinkIcon className="mr-2 size-4 stroke-2" />
            Open Project
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {}}
            disabled={isDeletingTask}
            className="p-[10px] font-medium"
          >
            <PencilIcon className="mr-2 size-4 stroke-2" />
            Edit Task
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onDelete}
            disabled={isDeletingTask}
            className="p-[10px] font-medium text-amber-700 focus:text-amber-700"
          >
            <TrashIcon className="mr-2 size-4 stroke-2" />
            Delete Task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDialog />
    </div>
  );
};

export default TaskActions;
