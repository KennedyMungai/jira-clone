"use client";

import ResponsiveModal from "@/components/responsive-modal";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

const useConfirm = (
  title: string,
  message: string,
  variant: ButtonProps["variant"] = "primary",
) => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () => new Promise((resolve) => setPromise({ resolve }));

  const handleClose = () => setPromise(null);

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmationDialog = () => {
    return (
      <ResponsiveModal open={promise !== null} onOpenChange={handleClose}>
        <Card className="size-full border-none shadow-none">
          <CardContent className="pt-8">
            <CardHeader className="p-0">
              <CardTitle>{title}</CardTitle>
              <CardDescription>{message}</CardDescription>
            </CardHeader>
            <div className="flex w-full flex-col items-center justify-end gap-2 pt-4 lg:flex-row">
              <Button
                onClick={handleCancel}
                variant={"outline"}
                className="w-full lg:w-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                variant={variant}
                className="w-full lg:w-auto"
              >
                Confirm
              </Button>
            </div>
          </CardContent>
        </Card>
      </ResponsiveModal>
    );
  };

  return [ConfirmationDialog, confirm];
};

export default useConfirm;