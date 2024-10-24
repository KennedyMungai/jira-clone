"use client";

import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { useGetProject } from "@/features/projects/api/use-get-project";
import ProjectAvatar from "@/features/projects/components/project-avatar";
import TaskViewSwitcher from "@/features/tasks/components/task-view-switcher";
import { EditIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  workspaceId: string;
  projectId: string;
};

const ProjectDetailsClient = ({ workspaceId, projectId }: Props) => {
  const { data: project, isPending: isProjectPending } = useGetProject({
    projectId,
  });

  if (isProjectPending) return <PageLoader />;

  if (!project) return <PageError message="Project not found" />;

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            name={project.name}
            image={project.image}
            className={"size-8"}
          />
          <p className="text-lg font-semibold">{project.name}</p>
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
      <TaskViewSwitcher hideProjectFilter />
    </div>
  );
};

export default ProjectDetailsClient;
