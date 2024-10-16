"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex size-full flex-col items-center justify-center bg-neutral-200">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="logo"
          width={200}
          height={50}
          className="mb-4"
        />
      </Link>
      <h2 className="mb-4 text-wrap text-lg">{error.message}</h2>
      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          variant={"destructive"}
        >
          Try again
        </Button>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    </div>
  );
}
