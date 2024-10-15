import { getCurrent } from "@/features/auth/actions";
import CreateWorkspaceForm from "@/features/workspaces/components/create-workspace-form";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return (
    <div className="size-full space-y-4 p-4">
      <CreateWorkspaceForm />
    </div>
  );
};

export default HomePage;
