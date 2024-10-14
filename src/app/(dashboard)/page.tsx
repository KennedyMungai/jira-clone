import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return <div className="space-y-4 p-4">Homepage</div>;
};

export default HomePage;
