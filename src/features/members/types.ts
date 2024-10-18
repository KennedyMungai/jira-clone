import { Models } from "node-appwrite";

export enum MemberRole {
  ADMIN = "admin",
  MEMBER = "member",
}

export type Project = Models.Document & {
  name: string;
  imageUrl: string;
  workspaceId: string;
};
