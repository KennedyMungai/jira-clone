import { client } from "@/lib/hc";
import { useQuery } from "@tanstack/react-query";

type Props = {
  workspaceId: string;
};

export const useGetProjects = ({ workspaceId }: Props) =>
  useQuery({
    queryKey: ["projects", workspaceId],
    queryFn: async () => {
      const response = await client.api.projects.$get({
        query: { workspaceId },
      });

      if (!response.ok) throw new Error("Failed to fetch projects");

      const { data } = await response.json();

      return data;
    },
  });
