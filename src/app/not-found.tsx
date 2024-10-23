import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-y-4 bg-neutral-100">
      <Link href="/">
        <Image src="/logo.svg" width={328} height={96} alt="logo" />
      </Link>

      <h2 className="text-2xl font-bold text-muted-foreground">
        Page Not Found
      </h2>
      <Button asChild>
        <Link href="/">Go Back</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
