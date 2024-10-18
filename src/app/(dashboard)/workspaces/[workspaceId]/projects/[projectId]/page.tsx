type Props = {
  params: {
    workspaceId: string;
    projectId: string;
  };
};

const ProjectPage = ({ params: { projectId, workspaceId } }: Props) => {
  return (
    <div>
      <p>Project Id: {projectId}</p>
      <p>Workspace Id: {workspaceId}</p>
    </div>
  );
};

export default ProjectPage;
