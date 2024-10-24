"use client";

import DottedSeparator from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Task } from "@/features/tasks/types";
import { PencilIcon } from "lucide-react";

type Props = {
  task: Task;
};

const TaskDescription = ({ task }: Props) => {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Overview</p>
        <Button variant={"secondary"} size="sm">
          <PencilIcon className="mr-2 size-4" /> Edit
        </Button>
      </div>
      <DottedSeparator className="my-4" />
      <div className="flex flex-col gap-y-4">
        <div>
          {task.description ?? (
            <span className="text-muted-foreground">No description set</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDescription;
