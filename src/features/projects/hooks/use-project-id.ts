import { useParams } from "next/navigation";

export const useProjectId = () => {
  const params = useParams;

  const { projectId } = params as unknown as {
    workspaceId: string;
    projectId: string;
  };

  return projectId;
};
