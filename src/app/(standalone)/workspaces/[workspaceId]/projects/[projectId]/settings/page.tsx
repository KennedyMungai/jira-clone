import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import ProjectSettingsClient from "./_components/client";

type Props = {
  params: { projectId: string };
};

const ProjectSettings = async ({ params: { projectId } }: Props) => {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return (
    <div className="w-full lg:max-w-xl">
      <ProjectSettingsClient projectId={projectId} />
    </div>
  );
};

export default ProjectSettings;
