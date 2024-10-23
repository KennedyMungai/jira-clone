import { client } from "@/lib/hc";
import { useQuery } from "@tanstack/react-query";

type Props = {
  taskId: string;
};

export const useGetTask = ({ taskId }: Props) =>
  useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const response = await client.api.tasks[":taskId"].$get({
        param: { taskId },
      });

      if (!response.ok) throw new Error("Failed to fetch task");

      return await response.json();
    },
  });
