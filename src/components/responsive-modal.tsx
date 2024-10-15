"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { ReactNode } from "react";
import { useMedia } from "react-use";

type Props = {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ResponsiveModal = ({ children, open, onOpenChange }: Props) => {
  const isDesktop = useMedia("(min-width: 1024px)", true);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="hide-scrollbar max-h-[85vh] w-full overflow-y-auto border-none p-0 sm:max-w-lg">
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="hide-scrollbar max-h-[85vh] w-full overflow-y-auto border-none p-0 sm:max-w-lg">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveModal;
