"use client";

import ResponsiveModal from "@/components/responsive-modal";
import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal";

const CreateTaskModal = () => {
  const { isOpen, setIsOpen } = useCreateTaskModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <div>TODO: Task form</div>
    </ResponsiveModal>
  );
};

export default CreateTaskModal;
