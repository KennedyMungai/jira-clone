import { TaskStatus } from "@/features/tasks/types";
import { client } from "@/lib/hc";
import { useQuery } from "@tanstack/react-query";

type Props = {
  workspaceId: string;
  projectId?: string | null;
  status?: TaskStatus | null;
  assigneeId?: string | null;
  dueDate?: string | null;
  search?: string | null;
};

export const useGetTasks = ({
  workspaceId,
  assigneeId,
  dueDate,
  status,
  projectId,
  search,
}: Props) =>
  useQuery({
    queryKey: [
      "tasks",
      workspaceId,
      projectId,
      status,
      assigneeId,
      dueDate,
      search,
    ],
    queryFn: async () => {
      const response = await client.api.tasks.$get({
        query: {
          workspaceId,
          projectId: projectId ?? undefined,
          status: status ?? undefined,
          assigneeId: assigneeId ?? undefined,
          search: search ?? undefined,
          dueDate: dueDate ?? undefined,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch tasks");

      const { data } = await response.json();

      return data;
    },
  });
