"use client";

import DottedSeparator from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Task } from "@/features/tasks/types";
import { PencilIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useUpdateTask } from "../api/use-update-task";

type Props = {
  task: Task;
};

const TaskDescription = ({ task }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.description);

  const { mutate: updateTask, isPending: isUpdatingTask } = useUpdateTask();

  const handleSave = () => {
    updateTask({ json: { description: value }, param: { taskId: task.$id } });
  };

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Overview</p>
        <Button
          variant={"secondary"}
          size="sm"
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {isEditing ? (
            <XIcon className="mr-2 size-4" />
          ) : (
            <PencilIcon className="mr-2 size-4" />
          )}
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>
      <DottedSeparator className="my-4" />
      {isEditing ? (
        <div className="flex flex-col gap-y-4">
          <Textarea
            className="size-full"
            placeholder="Add a description..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={4}
            disabled={isUpdatingTask}
          />
          <Button
            size="sm"
            className="ml-auto w-fit"
            onClick={handleSave}
            disabled={isUpdatingTask}
          >
            {isUpdatingTask ? "Saving..." : "Save"}
          </Button>
        </div>
      ) : (
        <div>
          {task.description ?? (
            <span className="text-muted-foreground">No description set</span>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskDescription;
