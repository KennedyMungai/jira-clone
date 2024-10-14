"use client";

import DottedSeparator from "@/components/dotted-separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrent } from "@/features/auth/api/use-current";
import { useLogout } from "@/features/auth/api/use-logout";
import { LoaderIcon, LogOutIcon } from "lucide-react";

const UserButton = () => {
  const { data: user, isLoading: isUserLoading } = useCurrent();
  const { mutate: logout } = useLogout();

  if (isUserLoading) {
    return (
      <div className="flex size-10 items-center justify-center rounded-full border border-neutral-300 bg-neutral-200">
        <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) return null;

  const { name, email } = user;

  return (
    // The modal prop is useful incase the dropdown is rendered inside another dropdown or modal to avoid conflicts.
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className="relative outline-none">
        <Avatar className="size-10 border border-neutral-300 transition hover:opacity-75">
          <AvatarFallback className="flex items-center justify-center bg-neutral-200 font-medium text-neutral-500">
            {name
              ? name.charAt(0).toUpperCase()
              : (email.charAt(0).toUpperCase() ?? "U")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-60"
        sideOffset={10}
      >
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <Avatar className="size-[52px] border border-neutral-300">
            <AvatarFallback className="flex items-center justify-center bg-neutral-200 text-xl font-medium text-neutral-500">
              {name
                ? name.charAt(0).toUpperCase()
                : (email.charAt(0).toUpperCase() ?? "U")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-neutral-900">
              {name ?? "User"}
            </p>
            <p className="text-xs text-neutral-500">{email}</p>
          </div>
        </div>
        <DottedSeparator className="mb-1" />
        <DropdownMenuItem
          className="flex h-10 cursor-pointer items-center justify-center font-medium text-amber-700"
          onClick={logout}
        >
          <LogOutIcon className="mr-2 size-4" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
