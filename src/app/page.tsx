"use client";

import { Button } from "@/components/ui/button";
import { useCurrent } from "@/features/auth/api/use-current";
import { useLogout } from "@/features/auth/api/use-logout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  const router = useRouter();

  const { data, isLoading } = useCurrent();
  const { mutate, isPending } = useLogout();

  useEffect(() => {
    if (!data && !isLoading) router.push("/sign-in");
  }, [data, isLoading, router]);

  return (
    <div className="space-y-4 p-4">
      Only visible to authorized users
      <Button onClick={mutate} disabled={isPending}>
        Logout
      </Button>
    </div>
  );
};

export default HomePage;
