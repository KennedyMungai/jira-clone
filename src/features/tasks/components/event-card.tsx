"use client";

import { Project } from "@/features/members/types";
import { TaskStatus } from "@/features/tasks/types";

type Props = {
  id: string;
  title: string;
  assignee: unknown;
  project: Project;
  status: TaskStatus;
};

const EventCard = ({ assignee, id, project, status, title }: Props) => {
  return <div>EventCard</div>;
};

export default EventCard;
