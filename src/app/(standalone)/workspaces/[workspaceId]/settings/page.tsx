import { getCurrent } from "@/features/auth/actions";
import { getWorkspace } from "@/features/workspaces/actions";
import EditWorkspaceForm from "@/features/workspaces/components/edit-workspace-form";
import { redirect } from "next/navigation";

type Props = {
  params: {
    workspaceId: string;
  };
};

const WorkspaceSettingsPage = async ({ params: { workspaceId } }: Props) => {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  const initialValues = await getWorkspace({ workspaceId });

  if (!initialValues) redirect("/workspaces");

  return (
    <div>
      <EditWorkspaceForm initialValues={initialValues} />
    </div>
  );
};

export default WorkspaceSettingsPage;
