import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import WorkspaceJoinPageClient from "./_components/client";

type Props = {
  params: {
    workspaceId: string;
    inviteCode: string;
  };
};

const WorkspaceJoinPage = async ({ params: { workspaceId } }: Props) => {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return <WorkspaceJoinPageClient workspaceId={workspaceId} />;
};

export default WorkspaceJoinPage;
