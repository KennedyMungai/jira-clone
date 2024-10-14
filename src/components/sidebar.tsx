import DottedSeparator from "@/components/dotted-separator";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/navigation";

const Sidebar = () => {
  return (
    <aside className="size-full border border-r bg-neutral-100 p-4">
      <Link href="/">
        <Image src="/logo.svg" width={164} height={48} alt="logo" />
      </Link>
      <DottedSeparator className="my-4" />
      <Navigation />
    </aside>
  );
};

export default Sidebar;
