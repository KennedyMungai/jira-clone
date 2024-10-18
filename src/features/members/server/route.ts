import { DATABASE_ID, MEMBERS_ID } from "@/config";
import { MemberRole } from "@/features/members/types";
import { getMember } from "@/features/members/utils";
import { createAdminClient } from "@/lib/appwrite";
import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { Query } from "node-appwrite";
import { z } from "zod";

const app = new Hono()
  .get(
    "/",
    sessionMiddleware,
    zValidator("query", z.object({ workspaceId: z.string() })),
    async (c) => {
      const { users } = await createAdminClient();

      const databases = c.get("databases");
      const user = c.get("user");

      const { workspaceId } = c.req.valid("query");

      const member = await getMember({
        databases,
        userId: user.$id,
        workspaceId,
      });

      if (!member) return c.json({ error: "Unauthorized" }, 401);

      const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
        Query.equal("workspaceId", workspaceId),
      ]);

      const populatedMembers = await Promise.all(
        members.documents.map(async (member) => {
          const user = await users.get(member.userId);

          return {
            ...member,
            name: user.name,
            email: user.email,
          };
        }),
      );

      return c.json({
        data: {
          ...members,
          documents: populatedMembers,
        },
      });
    },
  )
  .patch(
    "/:memberId",
    sessionMiddleware,
    zValidator("param", z.object({ memberId: z.string() })),
    zValidator("json", z.object({ role: z.nativeEnum(MemberRole) })),
    async (c) => {
      const { memberId } = c.req.valid("param");
      const { role } = c.req.valid("json");

      const user = c.get("user");
      const databases = c.get("databases");

      const memberToDelete = await databases.getDocument(
        DATABASE_ID,
        MEMBERS_ID,
        memberId,
      );

      const allMembersInWorkspace = await databases.listDocuments(
        DATABASE_ID,
        MEMBERS_ID,
        [Query.equal("workspaceId", memberToDelete.workspaceId)],
      );

      const member = await getMember({
        databases,
        workspaceId: memberToDelete.workspaceId,
        userId: user.$id,
      });

      if (!member) return c.json({ error: "Unauthorized" }, 401);

      if (member.role !== MemberRole.ADMIN)
        return c.json({ error: "Unauthorized" }, 401);

      if (allMembersInWorkspace.total === 1)
        return c.json(
          {
            error: "Cannot downgrade the only member in the workspace",
          },
          400,
        );

      await databases.updateDocument(DATABASE_ID, MEMBERS_ID, memberId, {
        role,
      });

      return c.json({ data: { $id: memberToDelete.$id } });
    },
  )
  .delete(
    "/:memberId",
    sessionMiddleware,
    zValidator("param", z.object({ memberId: z.string() })),
    async (c) => {
      const { memberId } = c.req.valid("param");

      const user = c.get("user");
      const databases = c.get("databases");

      const memberToDelete = await databases.getDocument(
        DATABASE_ID,
        MEMBERS_ID,
        memberId,
      );

      const allMembersInWorkspace = await databases.listDocuments(
        DATABASE_ID,
        MEMBERS_ID,
        [Query.equal("workspaceId", memberToDelete.workspaceId)],
      );

      const member = await getMember({
        databases,
        workspaceId: memberToDelete.workspaceId,
        userId: user.$id,
      });

      if (!member) return c.json({ error: "Unauthorized" }, 401);

      if (member.$id !== memberToDelete.$id && member.role !== MemberRole.ADMIN)
        return c.json({ error: "Unauthorized" }, 401);

      if (allMembersInWorkspace.total === 1)
        return c.json(
          {
            error: "Cannot delete the only member in the workspace",
          },
          400,
        );

      await databases.deleteDocument(DATABASE_ID, MEMBERS_ID, memberId);

      return c.json({ data: { $id: memberToDelete.$id } });
    },
  );

export default app;