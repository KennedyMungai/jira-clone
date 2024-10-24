"use client";

import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { useGetProject } from "@/features/projects/api/use-get-project";
import EditProjectForm from "@/features/projects/components/edit-project-form";

type Props = {
  projectId: string;
};

const ProjectSettingsClient = ({ projectId }: Props) => {
  const { data: initialValues, isPending: isLoadingProject } = useGetProject({
    projectId,
  });

  if (isLoadingProject) return <PageLoader />;

  if (!initialValues) return <PageError message="Project not found" />;

  return (
    <div className="w-full lg:max-w-xl">
      <EditProjectForm initialValues={initialValues} />
    </div>
  );
};

export default ProjectSettingsClient;
