"use client";

import { Button } from "@/components/ui/button";
import { Project } from "@/features/members/types";
import { Task } from "@/features/tasks/types";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { ChevronRightIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  project: Project;
  task: Task;
};

const TaskBreadCrumbs = ({ project, task }: Props) => {
  const workspaceId = useWorkspaceId();

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
      >
        <TrashIcon className="size-4 lg:mr-2" />
        <span className="hidden lg:block">Delete Task</span>
      </Button>
    </div>
  );
};

export default TaskBreadCrumbs;
