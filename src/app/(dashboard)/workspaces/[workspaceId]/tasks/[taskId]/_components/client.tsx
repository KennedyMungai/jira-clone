"use client";

import { useTaskId } from "@/features/tasks/hooks/use-task-id";

const TaskDetailsClient = () => {
  const taskId = useTaskId();

  return <div>{taskId}</div>;
};

export default TaskDetailsClient;
