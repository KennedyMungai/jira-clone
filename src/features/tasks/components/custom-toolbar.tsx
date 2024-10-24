"use client";

type Props = {
  date: Date;
  onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void;
};

const CustomToolbar = ({ date, onNavigate }: Props) => {
  return <div>CustomToolbar</div>;
};

export default CustomToolbar;
