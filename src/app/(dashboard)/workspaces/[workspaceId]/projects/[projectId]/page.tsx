import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import ProjectDetailsClient from "./_components/client";

const ProjectPage = async () => {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return <ProjectDetailsClient />;
};

export default ProjectPage;
