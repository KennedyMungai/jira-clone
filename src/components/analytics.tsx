"use client";

type Props = {
  data?: {
    tasksCount: number;
    tasksDifference: number;
    assignedTasksCount: number;
    assignedTasksDifference: number;
    incompleteTasksCount?: number;
    incompleteTasksDifference?: number;
    completedTasksCount: number;
    completedTasksDifference: number;
    overdueTasksCount: number;
    overdueTasksDifference: number;
    projectCount?: number;
    projectDifference?: number;
  };
};

const Analytics = ({ data }: Props) => {
  if (!data) return null;

  return <div>Analytics</div>;
};

export default Analytics;
