import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

type Props = {
  params: {
    workspaceId: string;
  };
};

const WorkspacePage = async ({ params: { workspaceId } }: Props) => {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return <div>{workspaceId}</div>;
};

export default WorkspacePage;
