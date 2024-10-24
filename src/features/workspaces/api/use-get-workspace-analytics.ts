import { client } from "@/lib/hc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

export type WorkspaceAnalyticsResponseType = InferResponseType<
  (typeof client.api.workspaces)[":workspaceId"]["analytics"]["$get"],
  200
>;

type Props = {
  workspaceId: string;
};

export const useGetWorkspaceAnalytics = ({ workspaceId }: Props) =>
  useQuery({
    queryKey: ["workspace-analytics", workspaceId],
    queryFn: async () => {
      const response = await client.api.workspaces[
        ":workspaceId"
      ].analytics.$get({
        param: { workspaceId },
      });

      if (!response.ok) throw new Error("Failed to fetch workspace analytics");

      const { data } = await response.json();

      return data;
    },
  });
