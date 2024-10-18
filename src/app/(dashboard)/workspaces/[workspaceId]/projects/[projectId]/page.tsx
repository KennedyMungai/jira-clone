import { getCurrent } from "@/features/auth/queries";
import { getProject } from "@/features/projects/queries";
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

  const initialValues = await getProject({
    projectId,
  });

  return <div>{JSON.stringify(initialValues)}</div>;
};

export default ProjectPage;
