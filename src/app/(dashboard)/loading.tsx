import { LoaderIcon } from "lucide-react";

const DashboardLoading = () => {
  return (
    <div className="flex size-full items-center justify-center">
      <LoaderIcon className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
};

export default DashboardLoading;
