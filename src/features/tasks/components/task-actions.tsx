"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteTask } from "@/features/tasks/api/use-delete-task";
import { useEditTaskModal } from "@/features/tasks/hooks/use-edit-task-modal";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import useConfirm from "@/hooks/use-confirm";
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  id: string;
  projectId: string;
  children: ReactNode;
};

/**
 * TaskActions component provides a dropdown menu with actions for managing a task.
 * 
 * @param {string} id - The ID of the task.
 * @param {string} projectId - The ID of the project the task belongs to.
 * @param {ReactNode} children - The children to be rendered as the trigger for the dropdown menu.
 * 
 * The component renders a dropdown menu with the following actions:
 * - View Task Details: Navigates to the task details page.
 * - Open Project: Navigates to the project page.
 * - Edit Task: Opens the task in edit mode.
 * - Delete Task: Deletes the task after confirmation, this action is destructive and cannot be undone.
 */
const TaskActions = ({ id, projectId, children }: Props) => {
  const router = useRouter();

  const { mutate: deleteTask, isPending: isDeletingTask } = useDeleteTask();

  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Task",
    "This action cannot be undone",
    "destructive",
  );

  const workspaceId = useWorkspaceId();

  const { open } = useEditTaskModal();

  const onDelete = async () => {
    const ok = await confirm();

    if (!ok) return;

    deleteTask({ param: { taskId: id } });
  };

  const onOpenTask = () =>
    router.push(`/workspaces/${workspaceId}/tasks/${id}`);

  const onOpenProject = () =>
    router.push(`/workspaces/${workspaceId}/projects/${projectId}`);

  return (
    <div className="flex justify-end">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={onOpenTask}
            disabled={isDeletingTask}
            className="p-[10px] font-medium"
          >
            <ExternalLinkIcon className="mr-2 size-4 stroke-2" />
            Task Details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onOpenProject}
            disabled={isDeletingTask}
            className="p-[10px] font-medium"
          >
            <ExternalLinkIcon className="mr-2 size-4 stroke-2" />
            Open Project
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => open(id)}
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
