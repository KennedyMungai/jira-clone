import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

type Props = {
  params: {
    workspaceId: string;
    projectId: string;
  };
};

const ProjectEditPage = async ({
  params: { workspaceId, projectId },
}: Props) => {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return <div>ProjectEditPage</div>;
};

export default ProjectEditPage;
