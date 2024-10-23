"use client";

import DottedSeparator from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import TaskActions from "@/features/tasks/components/task-actions";
import TaskDate from "@/features/tasks/components/task-date";
import { Task } from "@/features/tasks/types";
import { MoreHorizontalIcon } from "lucide-react";

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
      <DottedSeparator />
      <div className="5 flex items-center gap-x-1">
        <TaskDate value={task.dueDate} className="text-xs" />
      </div>
      <div className="5 flex w-full items-center justify-end gap-x-1">
        <span className="text-end text-xs font-medium">
          {task.project.name}
        </span>
      </div>
    </div>
  );
};

export default KanbanCard;
