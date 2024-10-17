import { client } from "@/lib/hc";
import { useQuery } from "@tanstack/react-query";

type Props = {
  workspaceId: string;
};

export const useGetMembers = ({ workspaceId }: Props) =>
  useQuery({
    queryKey: ["members", workspaceId],
    queryFn: async () => {
      const response = await client.api.members.$get({
        query: { workspaceId },
      });

      if (!response.ok) throw new Error("Failed to fetch members");

      const { data } = await response.json();

      return data;
    },
  });
