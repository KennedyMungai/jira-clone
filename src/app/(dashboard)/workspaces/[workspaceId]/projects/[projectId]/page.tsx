import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

type Props = {
  params: {
    workspaceId: string;
    projectId: string;
  };
};

const ProjectPage = async ({ params: { projectId, workspaceId } }: Props) => {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return (
    <div>
      <p>Project Id: {projectId}</p>
      <p>Workspace Id: {workspaceId}</p>
    </div>
  );
};

export default ProjectPage;
