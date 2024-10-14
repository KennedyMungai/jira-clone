import { getCurrent } from "@/features/auth/actions";
import UserButton from "@/features/auth/components/user-button";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  console.log({ user });

  return (
    <div className="space-y-4 p-4">
      Only visible to authorized users
      <UserButton />
    </div>
  );
};

export default HomePage;
