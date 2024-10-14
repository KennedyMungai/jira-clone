import { client } from "@/lib/hc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<typeof client.api.auth.register.$post>;
type RequestType = InferRequestType<
  typeof client.api.auth.register.$post
>["json"];

export const useRegister = () =>
  useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.auth.register.$post({ json });

      return await response.json();
    },
  });
