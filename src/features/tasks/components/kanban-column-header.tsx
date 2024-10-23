"use client";

import { TaskStatus } from "@/features/tasks/types";
import { snakeCaseToTitleCase } from "@/lib/utils";

type Props = {
  board: TaskStatus;
  taskCount: number;
};

const KanbanColumnHeader = ({ board, taskCount }: Props) => {
  return (
    <div className="flex items-center justify-between px-2 py-1.5">
      <div className="flex items-center gap-x-2">
        <h2>{snakeCaseToTitleCase(board)}</h2>
        <div>{taskCount}</div>
      </div>
    </div>
  );
};

export default KanbanColumnHeader;
