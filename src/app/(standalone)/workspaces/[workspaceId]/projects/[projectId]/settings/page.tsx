import { getCurrent } from "@/features/auth/queries";
import { getProject } from "@/features/projects/queries";
import { redirect } from "next/navigation";

type Props = {
  params: { projectId: string };
};

const ProjectSettings = async ({ params: { projectId } }: Props) => {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  const initialValues = await getProject({ projectId });

  return <div className="w-full lg:max-w-xl">ProjectSettings</div>;
};

export default ProjectSettings;
