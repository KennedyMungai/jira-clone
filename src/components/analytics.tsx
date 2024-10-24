"use client";

import { ProjectAnalyticsResponseType } from "@/features/projects/api/use-get-project-analytics";

const Analytics = ({ data }: ProjectAnalyticsResponseType) => {
  if (!data) return null;

  return <div>Analytics</div>;
};

export default Analytics;
