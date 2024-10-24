"use client";

import { Button } from "@/components/ui/button";
import { Project } from "@/features/members/types";
import { useDeleteTask } from "@/features/tasks/api/use-delete-task";
import { Task } from "@/features/tasks/types";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import useConfirm from "@/hooks/use-confirm";
import { ChevronRightIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  project: Project;
  task: Task;
};

const TaskBreadCrumbs = ({ project, task }: Props) => {
  const router = useRouter();

  const workspaceId = useWorkspaceId();

  const { mutate: deleteTask, isPending: isDeletingTask } = useDeleteTask();

  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Task?",
    "This operation is irreversible",
    "destructive",
  );

  const handleDeleteTask = async () => {
    const ok = await confirm();

    if (!ok) return;

    deleteTask(
      { param: { taskId: task.$id } },
      { onSuccess: () => router.push(`/workspaces/${workspaceId}/tasks`) },
    );
  };

  return (
    <div className="flex items-center gap-x-2">
      <Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
        <p className="text-sm font-semibold text-muted-foreground transition hover:opacity-75 lg:text-lg">
          {project.name}
        </p>
      </Link>
      <ChevronRightIcon className="size-4 text-muted-foreground lg:size-5" />
      <p className="text-sm font-semibold lg:text-lg">{task.name}</p>
      <Button
        className="ml-auto flex items-center"
        variant={"destructive"}
        size="sm"
        onClick={handleDeleteTask}
      >
        <TrashIcon className="size-4 lg:mr-2" />
        <span className="hidden lg:block">Delete Task</span>
      </Button>
      <ConfirmDialog />
    </div>
  );
};

export default TaskBreadCrumbs;
