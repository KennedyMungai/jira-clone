"use client";

import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { useGetTask } from "@/features/tasks/api/use-get-task";
import TaskBreadCrumbs from "@/features/tasks/components/task-breadcrumbs";
import { useTaskId } from "@/features/tasks/hooks/use-task-id";

const TaskDetailsClient = () => {
  const taskId = useTaskId();

  const { data: task, isLoading: isTaskLoading } = useGetTask({ taskId });

  if (isTaskLoading) return <PageLoader />;

  if (!task) return <PageError message="Task not found" />;

  return (
    <div className="flex flex-col">
      <TaskBreadCrumbs project={task.project} task={task} />
    </div>
  );
};

export default TaskDetailsClient;
