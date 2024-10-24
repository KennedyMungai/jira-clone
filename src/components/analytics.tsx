"use client";

import AnalyticsCard from "@/components/analytics-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProjectAnalyticsResponseType } from "@/features/projects/api/use-get-project-analytics";

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
        </div>
      </div>
    </ScrollArea>
  );
};

export default Analytics;
