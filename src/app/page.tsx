"use client";

import { useCurrent } from "@/features/auth/api/use-current";
import UserButton from "@/features/auth/components/user-button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  const router = useRouter();

  const { data, isLoading } = useCurrent();

  useEffect(() => {
    if (!data && !isLoading) router.push("/sign-in");
  }, [data, isLoading, router]);

  return (
    <div className="space-y-4 p-4">
      Only visible to authorized users
      <UserButton />
    </div>
  );
};

export default HomePage;
