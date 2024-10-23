"use client";

import { Task } from "@/features/tasks/types";
import TaskActions from "@/features/tasks/components/task-actions";
import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  task: Task;
};

const KanbanCard = ({ task }: Props) => {
  return (
    <div className="mb-1.5 space-y-3 rounded bg-white p-2.5 shadow-sm">
      <div className="flex items-start justify-between gap-x-2">
        <p className="line-clamp-2 text-sm">{task.name}</p>
        <TaskActions id={task.$id} projectId={task.$projectId}>
          <Button size="icon" variant="ghost">
            <MoreHorizontalIcon className="size-[18px] shrink-0 stroke-1 text-neutral-700 transition hover:opacity-75" />
          </Button>
        </TaskActions>
      </div>
    </div>
  );
};

export default KanbanCard;
