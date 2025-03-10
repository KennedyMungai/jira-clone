"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  const pathname = usePathname();

  return (
    <main className="h-full overflow-y-auto bg-neutral-100">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.svg" alt="logo" width={152} height={56} />
          </Link>
          <Button variant={"secondary"} asChild>
            <Link href={pathname === "/sign-in" ? "/sign-up" : "/sign-in"}>
              {pathname === "/sign-in" ? "Sign Up" : "Login"}
            </Link>
          </Button>
        </nav>
        <div className="flex flex-col items-center justify-center pb-6 pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
