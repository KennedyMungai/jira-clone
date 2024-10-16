"use client";

import DottedSeparator from "@/components/dotted-separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDeleteWorkspace } from "@/features/workspaces/api/use-delete-workspace";
import { useResetInviteCode } from "@/features/workspaces/api/use-reset-invite-code";
import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";
import {
  createWorkspaceSchema,
  updateWorkspaceSchema,
} from "@/features/workspaces/schema";
import { Workspace } from "@/features/workspaces/types";
import useConfirm from "@/hooks/use-confirm";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, CopyIcon, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Props = {
  onCancel?: () => void;
  initialValues: Workspace;
};

const EditWorkspaceForm = ({ onCancel, initialValues }: Props) => {
  const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } =
    useUpdateWorkspace();
  const { mutate: deleteWorkspace, isPending: isDeletingWorkspace } =
    useDeleteWorkspace();
  const { mutate: resetInviteCode, isPending: isResettingInviteCode } =
    useResetInviteCode();

  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const [DeleteDialog, confirmDelete] = useConfirm(
    "Delete Workspace",
    "This action cannot be undone",
    "destructive",
  );

  const [ResetDialog, confirmReset] = useConfirm(
    "Reset Invite Link",
    "This will invalidate the current invite link",
    "destructive",
  );

  const form = useForm<z.infer<typeof updateWorkspaceSchema>>({
    resolver: zodResolver(updateWorkspaceSchema),
    defaultValues: {
      ...initialValues,
      image: initialValues.imageUrl ?? "/no-image.png",
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      form.setValue("image", file);
    }
  };

  const handleDelete = async () => {
    const ok = await confirmDelete();

    if (!ok) return;

    deleteWorkspace(
      { param: { workspaceId: initialValues.$id } },
      { onSuccess: () => (window.location.href = "/") },
    );
  };

  const handleReset = async () => {
    const ok = await confirmReset();

    if (!ok) return;

    resetInviteCode(
      { workspaceId: initialValues.$id },
      { onSuccess: () => toast.success("Invite link has been reset") },
    );
  };

  const onSubmit = (values: z.infer<typeof createWorkspaceSchema>) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : undefined,
    };

    updateWorkspace({
      form: finalValues,
      param: { workspaceId: initialValues.$id },
    });
  };

  const fullInviteLink = `${window.location.origin}/workspaces/${initialValues.$id}/join/${initialValues.inviteCode}`;

  return (
    <div className="flex flex-col gap-y-4">
      <Card className="size-full border-none shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-4 space-y-0 p-7">
          <Button
            size="icon"
            variant="ghost"
            onClick={onCancel ? onCancel : () => router.back()}
            className="size-10"
          >
            <ArrowLeftIcon className="size-5" />
          </Button>
          <CardTitle className="text-xl font-bold">
            {initialValues.name}
          </CardTitle>
        </CardHeader>
        <div className="px-7">
          <DottedSeparator />
        </div>
        <CardContent className="p-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-neutral-500">
                        Workspace Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter workspace name"
                          disabled={isUpdatingWorkspace || isDeletingWorkspace}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <div className="flex flex-col gap-y-2">
                      <div className="flex items-center gap-x-5">
                        {field.value ? (
                          <div className="relative size-[72px] overflow-hidden rounded-md">
                            <Image
                              src={
                                field.value instanceof File
                                  ? URL.createObjectURL(field.value)
                                  : field.value
                              }
                              fill
                              className="object-cover"
                              alt="workspace-logo"
                            />
                          </div>
                        ) : (
                          <Avatar className="size-[72px]">
                            <AvatarFallback>
                              <ImageIcon className="size-[36px] text-neutral-400" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex flex-col">
                          <p className="text-sm">Workspace Icon</p>
                          <p className="text-xs text-muted-foreground">
                            JPG, PNG, SVG, JPEG, GIF, max 1mb
                          </p>
                          <input
                            type="file"
                            className="hidden"
                            accept=".jpg, .jpeg, .png, .svg, .gif"
                            ref={inputRef}
                            disabled={
                              isUpdatingWorkspace || isDeletingWorkspace
                            }
                            onChange={handleImageChange}
                          />
                          {field.value ? (
                            <Button
                              type="button"
                              disabled={
                                isUpdatingWorkspace || isDeletingWorkspace
                              }
                              variant={"destructive"}
                              size="xs"
                              className="mt-2 w-fit"
                              onClick={() => {
                                field.onChange(null);

                                if (inputRef.current) {
                                  inputRef.current.value = "";
                                }
                              }}
                            >
                              Remove Image
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              disabled={
                                isUpdatingWorkspace || isDeletingWorkspace
                              }
                              variant={"tertiary"}
                              size="xs"
                              className="mt-2 w-fit"
                              onClick={() => inputRef.current?.click()}
                            >
                              Upload Image
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                />
              </div>
              <DottedSeparator className="py-7" />
              <div className="flex flex-col items-center gap-2 lg:flex-row lg:justify-between">
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  onClick={onCancel}
                  disabled={isUpdatingWorkspace || isDeletingWorkspace}
                  className={cn(!onCancel && "invisible")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isUpdatingWorkspace || isDeletingWorkspace}
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="size-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold">Invite Members</h3>
            <p className="text-sm text-muted-foreground">
              Use the invite link to add members to your workspace
            </p>
            <div className="mt-4">
              <div className="relative flex items-center gap-x-2">
                <Input disabled value={fullInviteLink} className="pr-10" />
                <CopyIcon
                  className="absolute right-2 size-5 cursor-pointer text-neutral-800"
                  onClick={() =>
                    navigator.clipboard
                      .writeText(fullInviteLink)
                      .then(() =>
                        toast.success("Invite link copied successfully"),
                      )
                  }
                />
              </div>
            </div>
            <DottedSeparator className="py-7" />
            <Button
              variant={"destructive"}
              className="ml-auto mt-6 w-fit"
              size="sm"
              type="button"
              disabled={isUpdatingWorkspace || isDeletingWorkspace}
              onClick={handleReset}
            >
              Reset Invite link
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="size-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold">Danger Zone</h3>
            <p className="text-sm text-muted-foreground">
              Deleting a workspace is irreversible and will remove all
              associated data
            </p>
            <DottedSeparator className="py-7" />
            <Button
              variant={"destructive"}
              className="ml-auto mt-6 w-fit"
              size="sm"
              type="button"
              disabled={isUpdatingWorkspace || isDeletingWorkspace}
              onClick={handleDelete}
            >
              Delete Workspace
            </Button>
          </div>
        </CardContent>
      </Card>
      <DeleteDialog />
      <ResetDialog />
    </div>
  );
};

export default EditWorkspaceForm;
