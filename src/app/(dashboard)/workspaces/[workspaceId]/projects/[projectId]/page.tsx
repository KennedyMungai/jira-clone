import { Button } from "@/components/ui/button";
import { getCurrent } from "@/features/auth/queries";
import ProjectAvatar from "@/features/projects/components/project-avatar";
import { getProject } from "@/features/projects/queries";
import TaskViewSwitcher from "@/features/tasks/components/task-view-switcher";
import { EditIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  params: {
    workspaceId: string;
    projectId: string;
  };
};

const ProjectPage = async ({ params: { projectId, workspaceId } }: Props) => {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  const initialValues = await getProject({
    projectId,
  });

  if (!initialValues) throw new Error("Project not found!");

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            name={initialValues.name}
            image={initialValues.image}
            className={"size-8"}
          />
          <p className="text-lg font-semibold">{initialValues.name}</p>
        </div>
        <div>
          <Button
            size="icon"
            variant="ghost"
            className="text-neutral-500"
            asChild
          >
            <Link
              href={`/workspaces/${workspaceId}/projects/${projectId}/edit`}
            >
              <EditIcon className="size-5" />
            </Link>
          </Button>
        </div>
      </div>
      <TaskViewSwitcher />
    </div>
  );
};

export default ProjectPage;
