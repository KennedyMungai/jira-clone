import { client } from "@/lib/hc";
import { useQuery } from "@tanstack/react-query";

export const useCurrent = () =>
  useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const response = await client.api.auth.current.$get();

      if (!response.ok) return null;

      const { data } = await response.json();

      return data;
    },
  });
