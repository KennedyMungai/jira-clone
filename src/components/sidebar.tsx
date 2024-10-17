import DottedSeparator from "@/components/dotted-separator";
import Navigation from "@/components/navigation";
import Projects from "@/components/projects";
import WorkspaceSwitcher from "@/features/workspaces/components/workspace-switcher";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="size-full border border-r bg-neutral-100 p-4">
      <Link href="/">
        <Image src="/logo.svg" width={164} height={48} alt="logo" />
      </Link>
      <DottedSeparator className="my-4" />
      <WorkspaceSwitcher />
      <DottedSeparator className="my-4" />
      <Navigation />
      <Projects />
    </aside>
  );
};

export default Sidebar;
