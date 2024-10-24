"use client";

import AnalyticsCard from "@/components/analytics-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ProjectAnalyticsResponseType } from "@/features/projects/api/use-get-project-analytics";
import DottedSeparator from "./dotted-separator";

const Analytics = ({ data }: ProjectAnalyticsResponseType) => {
  if (!data) return null;

  return (
    <ScrollArea className="w-full shrink-0 whitespace-nowrap rounded-lg border">
      <div className="flex w-full flex-row">
        <div className="flex flex-1 items-center">
          <AnalyticsCard
            title={"Total tasks"}
            value={data.tasksCount}
            variant={data.tasksDifference > 0 ? "up" : "down"}
            increaseValue={data.tasksDifference}
          />
          <DottedSeparator direction="vertical" />
        </div>
        <div className="flex flex-1 items-center">
          <AnalyticsCard
            title={"Assigned Tasks"}
            value={data.assignedTasksCount}
            variant={data.assignedTasksDifference > 0 ? "up" : "down"}
            increaseValue={data.assignedTasksDifference}
          />
          <DottedSeparator direction="vertical" />
        </div>
        <div className="flex flex-1 items-center">
          <AnalyticsCard
            title={"Completed Tasks"}
            value={data.completedTasksCount}
            variant={data.completedTasksDifference > 0 ? "up" : "down"}
            increaseValue={data.completedTasksDifference}
          />
          <DottedSeparator direction="vertical" />
        </div>
        <div className="flex flex-1 items-center">
          <AnalyticsCard
            title={"Overdue Tasks"}
            value={data.overdueTasksCount}
            variant={data.overdueTasksDifference > 0 ? "up" : "down"}
            increaseValue={data.overdueTasksDifference}
          />
          <DottedSeparator direction="vertical" />
        </div>
        <div className="flex flex-1 items-center">
          <AnalyticsCard
            title={"Incomplete Tasks"}
            value={data.incompleteTasksCount}
            variant={data.incompleteTasksDifference > 0 ? "up" : "down"}
            increaseValue={data.incompleteTasksDifference}
          />
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default Analytics;
