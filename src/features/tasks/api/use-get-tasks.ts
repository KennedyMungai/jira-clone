import { client } from "@/lib/hc";
import { useQuery } from "@tanstack/react-query";

type Props = {
  workspaceId: string;
};

export const useGetTasks = ({ workspaceId }: Props) =>
  useQuery({
    queryKey: ["tasks", workspaceId],
    queryFn: async () => {
      const response = await client.api.tasks.$get({
        query: { workspaceId },
      });

      if (!response.ok) throw new Error("Failed to fetch tasks");

      const { data } = await response.json();

      return data;
    },
  });
