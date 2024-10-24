import { useParams } from "next/navigation";

export const useProjectId = () => {
  const params = useParams;

  // @ts-expect-error The projectId string does not exist inside the params
  return params.projectId as string;
};
