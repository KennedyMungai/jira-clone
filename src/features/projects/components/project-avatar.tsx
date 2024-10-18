import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
  image?: string;
  name: string;
  className?: string;
};

const ProjectAvatar = ({ name, className, image }: Props) => {
  if (image) {
    return (
      <div
        className={cn("relative size-10 overflow-hidden rounded-md", className)}
      ></div>
    );
  }

  return (
    <Avatar className={cn("size-10 rounded-md", className)}>
      <AvatarFallback className="bg-blue-600 text-lg font-semibold uppercase text-white">
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
};

export default ProjectAvatar;
