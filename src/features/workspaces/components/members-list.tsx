"use client";

import DottedSeparator from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteMember } from "@/features/members/api/use-delete-member";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useUpdateMember } from "@/features/members/api/use-update-member";
import MembersAvatar from "@/features/members/components/members-avatar";
import { MemberRole } from "@/features/members/types";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import useConfirm from "@/hooks/use-confirm";
import { ArrowLeft, MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

const MembersList = () => {
  const workspaceId = useWorkspaceId();

  const [ConfirmDialog, confirm] = useConfirm(
    "Remove Member",
    "This member will be removed from the workspace",
    "destructive",
  );

  const { data: members, isPending: isMembersPending } = useGetMembers({
    workspaceId,
  });

  const { mutate: updateMember, isPending: isUpdatingMember } =
    useUpdateMember();

  const { mutate: deleteMember, isPending: isDeletingMember } =
    useDeleteMember();

  const handleUpdateMember = (memberId: string, role: MemberRole) =>
    updateMember({
      json: { role },
      param: { memberId },
    });

  const handleDeleteMember = async (memberId: string) => {
    const ok = await confirm();

    if (!ok) return;

    deleteMember(
      { param: { memberId } },
      {
        onSuccess: () => {
          window.location.reload();
        },
      },
    );
  };

  if (isMembersPending || isUpdatingMember || isDeletingMember) {
    return (
      <Card className="size-full border-none shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-4 space-y-0 p-7">
          <Button variant={"ghost"} size={"icon"} asChild>
            <Link href={`/workspaces/${workspaceId}`}>
              <ArrowLeft className="size-5" />
            </Link>
          </Button>
          <CardTitle className="text-xl font-bold">Members List</CardTitle>
        </CardHeader>
        <div className="px-7">
          <DottedSeparator />
        </div>
        <CardContent className="space-y-4 p-7">
          <div>
            <div className="my-2 flex w-full items-center gap-2">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex flex-col gap-y-1">
                <Skeleton className="h-6 w-64" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
            <Separator />
          </div>
          <div>
            <div className="my-2 flex w-full items-center gap-2">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex flex-col gap-y-1">
                <Skeleton className="h-6 w-64" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
            <Separator />
          </div>
          <div>
            <div className="my-2 flex w-full items-center gap-2">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex flex-col gap-y-1">
                <Skeleton className="h-6 w-64" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
            <Separator />
          </div>
          <div>
            <div className="my-2 flex w-full items-center gap-2">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex flex-col gap-y-1">
                <Skeleton className="h-6 w-64" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
            <Separator />
          </div>
          <div>
            <div className="my-2 flex w-full items-center gap-2">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex flex-col gap-y-1">
                <Skeleton className="h-6 w-64" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
            <Separator />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="size-full border-none shadow-none">
      <CardHeader className="flex flex-row items-center gap-x-4 space-y-0 p-7">
        <Button variant={"ghost"} size={"icon"} asChild>
          <Link href={`/workspaces/${workspaceId}`}>
            <ArrowLeft className="size-5" />
          </Link>
        </Button>
        <CardTitle className="text-xl font-bold">Members List</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        {members?.documents.map((member, index) => (
          <Fragment key={index}>
            <div className="my-2 flex w-full items-center gap-2">
              <MembersAvatar
                name={member.name}
                className="size-10"
                fallbackClassName="text-lg"
              />
              <div className="flex flex-col">
                <p className="text-sm font-medium">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.email}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"} size={"icon"} className="ml-auto">
                    <MoreVerticalIcon className="size-5 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end">
                  <DropdownMenuItem
                    className="font-medium"
                    onClick={() =>
                      handleUpdateMember(member.$id, MemberRole.ADMIN)
                    }
                    disabled={isUpdatingMember || isDeletingMember}
                  >
                    Set as administrator
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="font-medium"
                    onClick={() =>
                      handleUpdateMember(member.$id, MemberRole.MEMBER)
                    }
                    disabled={isUpdatingMember || isDeletingMember}
                  >
                    Set as member
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="font-medium text-amber-700 hover:text-amber-700"
                    onClick={() => handleDeleteMember(member.$id)}
                    disabled={false}
                  >
                    Remove {member.name}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {index < members.documents.length - 1 && <Separator />}
          </Fragment>
        ))}
      </CardContent>
      <ConfirmDialog />
    </Card>
  );
};

export default MembersList;
