import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return <div className="h-full">{children}</div>;
};

export default DashboardLayout;
