import TaskDetailsClient from "@/app/(dashboard)/workspaces/[workspaceId]/tasks/[taskId]/_components/client";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

const TaskDetailsPage = async () => {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return <TaskDetailsClient />;
};

export default TaskDetailsPage;
