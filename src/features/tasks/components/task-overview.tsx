import DottedSeparator from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import OverviewProperty from "@/features/tasks/components/overview-property";
import { Task } from "@/features/tasks/types";
import { PencilIcon } from "lucide-react";

type Props = {
  task: Task;
};

const TaskOverview = ({ task }: Props) => {
  return (
    <div className="col-span-1 flex flex-col gap-y-4">
      <div className="rounded-lg bg-muted p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Overview</p>
          <Button variant={"secondary"} size="sm">
            <PencilIcon className="mr-2 size-4" />
            Edit
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <div className="flex flex-col gap-y-4">
          <OverviewProperty />
        </div>
      </div>
    </div>
  );
};

export default TaskOverview;
