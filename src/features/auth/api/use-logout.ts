import { client } from "@/lib/hc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<typeof client.api.auth.logout.$post>;
type RequestType = InferRequestType<typeof client.api.auth.logout.$post>;

export const useLogout = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async () => {
      const response = await client.api.auth.logout.$post();

      return await response.json();
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["current-user"] }),
  });

  return mutation;
};
  