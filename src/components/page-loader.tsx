import { LoaderIcon } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="size-screen flex items-center justify-center">
      <LoaderIcon className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
};

export default PageLoader;
