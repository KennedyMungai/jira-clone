"use client";

type Props = {
  id: string;
  title: string;
  assignee: string;
  project: string;
  status: string;
};

const EventCard = ({ assignee, id, project, status, title }: Props) => {
  return <div>EventCard</div>;
};

export default EventCard;
