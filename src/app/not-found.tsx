import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-y-4 bg-neutral-200">
      <Link href="/">
        <Image src="/logo.svg" width={164} height={48} alt="logo" />
      </Link>
      <Button asChild>
        <Link href="/">Go Back</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
