"use client";

import PageLoader from "@/components/page-loader";
import { useGetTask } from "@/features/tasks/api/use-get-task";
import { useTaskId } from "@/features/tasks/hooks/use-task-id";

const TaskDetailsClient = () => {
  const taskId = useTaskId();

  const { data: task, isLoading: isTaskLoading } = useGetTask({ taskId });

  if (isTaskLoading) return <PageLoader />;

  return <div>{taskId}</div>;
};

export default TaskDetailsClient;
