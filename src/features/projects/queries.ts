import { DATABASE_ID, PROJECTS_ID } from "@/config";
import { Project } from "@/features/members/types";
import { getMember } from "@/features/members/utils";
import { createSessionClient } from "@/lib/appwrite";

type GetWorkspaceProps = {
  projectId: string;
};

export const getProject = async ({ projectId }: GetWorkspaceProps) => {
  try {
    const { account, databases } = await createSessionClient();

    const user = await account.get();

    const project = await databases.getDocument<Project>(
      DATABASE_ID,
      PROJECTS_ID,
      projectId,
    );

    const member = await getMember({
      databases,
      userId: user.$id,
      workspaceId: project.workspaceId,
    });

    if (!member) return null;

    return project;
  } catch {
    return null;
  }
};