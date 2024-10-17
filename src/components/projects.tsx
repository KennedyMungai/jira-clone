"use client";

import { RiAddCircleFill } from "react-icons/ri";

const Projects = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Projects</p>
        <RiAddCircleFill
          className="size-5 cursor-pointer text-neutral-500 transition hover:opacity-75"
          onClick={() => console.log("Workspaces clicked!")}
        />
      </div>
    </div>
  );
};

export default Projects;
