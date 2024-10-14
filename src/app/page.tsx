"use client";

import { useCurrent } from "@/features/auth/api/use-current";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  const { data, isLoading } = useCurrent();

  const router = useRouter();

  useEffect(() => {
    if (!data && !isLoading) router.push("/sign-in");
  }, [data, isLoading, router]);

  return <div className="space-y-4 p-4">Only visible to authorized users</div>;
};

export default HomePage;
