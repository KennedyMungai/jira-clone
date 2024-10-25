import { Models } from "node-appwrite";

export enum MemberRole {
  ADMIN = "admin",
  MEMBER = "member",
}

export type Member = Models.Document & {
  workspaceId: string;
  userId: string;
  role: MemberRole;
};
