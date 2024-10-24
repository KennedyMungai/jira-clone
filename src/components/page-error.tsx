import { AlertTriangleIcon } from "lucide-react";

type Props = {
  message: string;
};

const PageError = ({ message = "Something went wrong" }: Props) => {
  return (
    <div className="flex size-full flex-col items-center justify-center">
      <AlertTriangleIcon className="mb-2 size-6 text-muted-foreground" />
      <p className="text-sm font-medium text-muted-foreground">{message}</p>
    </div>
  );
};

export default PageError;
