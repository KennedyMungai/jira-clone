"use client";

import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import EditWorkspaceForm from "@/features/workspaces/components/edit-workspace-form";

type Props = {
  workspaceId: string;
};

const WorkspaceSettingsClient = ({ workspaceId }: Props) => {
  const { data: initialValues, isPending: isWorkspacePending } =
    useGetWorkspace({ workspaceId });

  if (isWorkspacePending) return <PageLoader />;

  if (!initialValues) return <PageError message="Workspace not found" />;

  return (
    <div className="size-full">
      <EditWorkspaceForm initialValues={initialValues} />
    </div>
  );
};

export default WorkspaceSettingsClient;
