import { client } from "@/lib/hc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<typeof client.api.auth.login.$post>;
type RequestType = InferRequestType<typeof client.api.auth.login.$post>["json"];

export const useLogin = () =>
  useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.auth.login.$post({ json });

      return await response.json();
    },
    onSuccess: () => window.location.reload(),
  });
