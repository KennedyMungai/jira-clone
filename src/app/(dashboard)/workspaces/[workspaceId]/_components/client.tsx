"use client";

import Analytics from "@/components/analytics";
import DottedSeparator from "@/components/dotted-separator";
import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal";
import { Task } from "@/features/tasks/types";
import { useGetWorkspaceAnalytics } from "@/features/workspaces/api/use-get-workspace-analytics";
import { formatDistanceToNow } from "date-fns";
import { CalendarIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  workspaceId: string;
};

const WorkspaceDetailsClient = ({ workspaceId }: Props) => {
  const { data: workspaceAnalytics, isPending: isLoadingWorkspaceAnalytics } =
    useGetWorkspaceAnalytics({ workspaceId });
  const { data: tasks, isPending: isLoadingTasks } = useGetTasks({
    workspaceId,
  });
  const { data: projects, isPending: isLoadingProjects } = useGetProjects({
    workspaceId,
  });
  const { data: members, isPending: isLoadingMembers } = useGetMembers({
    workspaceId,
  });

  const { open: createProject } = useCreateProjectModal();

  const isLoading =
    isLoadingWorkspaceAnalytics ||
    isLoadingTasks ||
    isLoadingProjects ||
    isLoadingMembers;

  if (isLoading) return <PageLoader />;

  if (!workspaceAnalytics || !tasks || !projects || !members)
    return <PageError message="Failed to load workspace data" />;

  return (
    <div className="flex size-full flex-col space-y-4">
      <Analytics data={workspaceAnalytics} />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <TaskList
          data={tasks.documents}
          total={tasks.total}
          workspaceId={workspaceId}
        />
      </div>
    </div>
  );
};

export default WorkspaceDetailsClient;

type TaskListProps = {
  data: Task[];
  total: number;
  workspaceId: string;
};

export const TaskList = ({ data, total, workspaceId }: TaskListProps) => {
  const { open: createTask } = useCreateTaskModal();

  return (
    <div className="col-span-1 flex flex-col gap-y-4">
      <div className="rounded-lg bg-muted p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Tasks ({total})</p>
          <Button variant={"muted"} size="icon" onClick={createTask}>
            <PlusIcon className="size-4 text-neutral-400" />
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <ul className="flex flex-col gap-y-4">
          {data.map((task) => (
            <li key={task.$id}>
              <Link href={`/workspaces/${workspaceId}/tasks/${task.$id}`}>
                <Card className="rounded-lg shadow-none transition hover:opacity-75">
                  <CardContent className="p-4">
                    <p className="truncate text-lg font-medium">{task.name}</p>
                    <div className="flex items-center gap-x-2">
                      <p>{task.project?.name}</p>
                      <div className="size-1 rounded-full bg-neutral-300" />
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CalendarIcon className="mr-1 size-3" />
                        <span className="truncate">
                          {formatDistanceToNow(new Date(task.dueDate))}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
          <li className="hidden text-center text-sm text-muted-foreground first-of-type:block">
            No tasks found
          </li>
        </ul>
        <Button variant={"muted"} className="mt-4 w-full" asChild>
          <Link href={`/workspaces/${workspaceId}/tasks`}>Show All</Link>
        </Button>
      </div>
    </div>
  );
};
