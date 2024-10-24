import { ReactNode } from "react";

type Props = {
  label: string;
  children: ReactNode;
};

const OverviewProperty = ({ children, label }: Props) => {
  return <div>OverviewProperty</div>;
};

export default OverviewProperty;
