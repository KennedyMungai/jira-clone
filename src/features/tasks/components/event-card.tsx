"use client";

import { Project } from "@/features/members/types";
import { TaskStatus } from "@/features/tasks/types";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

type Props = {
  id: string;
  title: string;
  assignee: unknown;
  project: Project;
  status: TaskStatus;
};

const statusColorMap: Record<TaskStatus, string> = {
  [TaskStatus.BACKLOG]: "border-l-pink-500",
  [TaskStatus.TODO]: "border-l-red-500",
  [TaskStatus.IN_PROGRESS]: "border-l-yellow-500",
  [TaskStatus.IN_REVIEW]: "border-l-blue-500",
  [TaskStatus.DONE]: "border-l-emerald-500",
};

const EventCard = ({ assignee, id, project, status, title }: Props) => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  };

  return (
    <div className="px-2">
      <div
        className={cn(
          "flex cursor-pointer flex-col gap-y-1.5 rounded-md border border-l-4 bg-white p-1.5 text-xs text-primary transition hover:opacity-75",
          statusColorMap[status],
        )}
        onClick={onClick}
      >
        <p>{title}</p>
        <div className="flex items-center gap-x-1">
          <span className="basis-1/2 text-xs font-semibold text-muted-foreground">
            {project.name}
          </span>
          <span className="basis-1/2 text-xs font-semibold text-muted-foreground">
            {assignee.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
