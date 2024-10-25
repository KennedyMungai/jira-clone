import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import WorkspaceDetailsClient from "./_components/client";

type Props = {
  params: {
    workspaceId: string;
  };
};

const WorkspacePage = async ({ params: { workspaceId } }: Props) => {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return <WorkspaceDetailsClient workspaceId={workspaceId} />;
};

export default WorkspacePage;
