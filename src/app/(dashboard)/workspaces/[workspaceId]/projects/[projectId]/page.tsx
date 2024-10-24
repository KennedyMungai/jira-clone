import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import ProjectDetailsClient from "./_components/client";

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
    <ProjectDetailsClient workspaceId={workspaceId} projectId={projectId} />
  );
};

export default ProjectPage;
