type Props = {
  params: {
    workspaceId: string;
  };
};

const WorkspacePage = ({ params: { workspaceId } }: Props) => {
  return <div>{workspaceId}</div>;
};

export default WorkspacePage;
