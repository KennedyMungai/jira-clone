import { client } from "@/lib/hc";
import { useQuery } from "@tanstack/react-query";

type Props = {
  workspaceId: string;
};

export const useGetWorkspaceInfo = ({ workspaceId }: Props) =>
  useQuery({
    queryKey: ["workspace-info", workspaceId],
    queryFn: async () => {
      const response = await client.api.workspaces[":workspaceId"].info.$get({
        param: { workspaceId },
      });

      if (!response.ok) throw new Error("Failed to fetch workspace info");

      const { data } = await response.json();

      return data;
    },
  });
