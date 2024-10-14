"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoaderIcon } from "lucide-react";
import { useCurrent } from "@/features/auth/api/use-current";

const UserButton = () => {
  const { data: user, isLoading: isUserLoading } = useCurrent();

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
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    <Avatar className="size-10 border border-neutral-300 transition hover:opacity-75">
      <AvatarImage src="" alt="user name" />
      <AvatarFallback className="flex items-center justify-center bg-neutral-200 font-medium text-neutral-500">
        {name
          ? name.charAt(0).toUpperCase()
          : (email.charAt(0).toUpperCase() ?? "U")}
      </AvatarFallback>
    </Avatar>
    //   </DropdownMenuTrigger>
    // </DropdownMenu>
  );
};

export default UserButton;
