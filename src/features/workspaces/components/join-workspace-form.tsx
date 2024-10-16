"use client";

import DottedSeparator from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useJoinWorkspace } from "@/features/workspaces/api/use-join-workspace";
import { useInviteCode } from "@/features/workspaces/hooks/use-invite-code";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  initialValues: {
    name: string;
  };
};

const JoinWorkspaceForm = ({ initialValues: { name } }: Props) => {
  const { mutate: join, isPending: isJoining } = useJoinWorkspace();

  const router = useRouter();

  const inviteCode = useInviteCode();
  const workspaceId = useWorkspaceId();

  const onSubmit = () => {
    join(
      {
        param: { workspaceId },
        json: { code: inviteCode },
      },
      {
        onSuccess: ({ data }) => router.push(`/workspaces/${data.$id}`),
      },
    );
  };

  return (
    <Card className="size-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">Join Workspace</CardTitle>
        <CardDescription>
          You&apos;ve been invited to join <strong>{name}</strong> workspace
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
          <Button
            className="w-full lg:w-fit"
            variant={"secondary"}
            type="button"
            size="lg"
            disabled={isJoining}
            asChild
          >
            <Link href="/">Cancel</Link>
          </Button>
          <Button
            className="w-full lg:w-fit"
            size="lg"
            type="button"
            onClick={onSubmit}
            disabled={isJoining}
          >
            Join Workspace
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JoinWorkspaceForm;
