import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import WorkspaceSettingsClient from "./_components/client";

type Props = {
  params: {
    workspaceId: string;
  };
};

const WorkspaceSettingsPage = async ({ params: { workspaceId } }: Props) => {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return <WorkspaceSettingsClient workspaceId={workspaceId} />;
};

export default WorkspaceSettingsPage;
