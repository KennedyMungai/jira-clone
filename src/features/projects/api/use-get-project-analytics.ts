import { client } from "@/lib/hc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

export type ProjectAnalyticsResponseType = InferResponseType<
  (typeof client.api.projects)[":projectId"]["analytics"]["$get"],
  200
>;

type Props = {
  projectId: string;
};

export const useGetProjectAnalytics = ({ projectId }: Props) =>
  useQuery({
    queryKey: ["project-analytics", projectId],
    queryFn: async () => {
      const response = await client.api.projects[":projectId"].analytics.$get({
        param: { projectId },
      });

      if (!response.ok) throw new Error("Failed to fetch project analytics");

      const { data } = await response.json();

      return data;
    },
  });
