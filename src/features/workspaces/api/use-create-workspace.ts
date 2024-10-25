import { client } from "@/lib/hc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.workspaces.$post, 200>;
type RequestType = InferRequestType<typeof client.api.workspaces.$post>["form"];

export const useCreateWorkspace = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (form) => {
      const response = await client.api.workspaces.$post({ form });

      if (!response.ok) throw new Error("Failed to create workspace");

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      toast.success("Workspace created successfully");

      router.refresh();
    },
    onError: (error) => toast.error(error.message),
  });

  return mutation;
};
