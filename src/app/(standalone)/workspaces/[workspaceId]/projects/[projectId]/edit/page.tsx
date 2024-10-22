import { getCurrent } from "@/features/auth/queries";
import EditProjectForm from "@/features/projects/components/edit-project-form";
import { getProject } from "@/features/projects/queries";
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

  const initialValues = await getProject({ projectId });

  if (!user) redirect("/sign-in");

  return (
    <div className="w-full lg:max-w-xl">
      <EditProjectForm initialValues={initialValues} />
    </div>
  );
};

export default ProjectEditPage;
