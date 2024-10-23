import { client } from "@/lib/hc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.tasks.$post, 200>;
type RequestType = InferRequestType<typeof client.api.tasks.$post>;

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.tasks.$post({ json });

      if (!response.ok) throw new Error("Failed to create task");

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      router.refresh();

      toast.success("Task created successfully");
    },
    onError: () => toast.error("Failed to create task"),
  });

  return mutation;
};
