import { client } from "@/lib/hc";
import { useQuery } from "@tanstack/react-query";

export const useGetWorkspaces = () =>
  useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const response = await client.api.workspaces.$get();

      if (!response.ok) throw new Error("Failed to fetch workspaces");

      const { data } = await response.json();

      return data;
    },
  });
