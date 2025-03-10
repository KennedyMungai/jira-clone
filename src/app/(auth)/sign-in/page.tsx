import { getCurrent } from "@/features/auth/queries";
import SignInCard from "@/features/auth/components/signin-card";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const user = await getCurrent();

  if (user) redirect("/");

  return <SignInCard />;
};

export default SignInPage;
