"use client";

import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info";
import JoinWorkspaceForm from "@/features/workspaces/components/join-workspace-form";

type Props = {
  workspaceId: string;
};

const WorkspaceJoinPageClient = ({ workspaceId }: Props) => {
  const { data: initialValues, isPending: isWorkspaceInfoPending } =
    useGetWorkspaceInfo({ workspaceId });

  if (isWorkspaceInfoPending) return <PageLoader />;

  if (!initialValues) return <PageError message="Workspace info not found" />;

  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceForm initialValues={initialValues} />
    </div>
  );
};

export default WorkspaceJoinPageClient;
