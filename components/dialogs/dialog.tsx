"use client";

import { useCallback, useEffect, useState } from "react";
import { LoaderIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DialogProps {
  open?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

export function Dialog({
  open,
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  footer,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}: DialogProps) {
  const [showDialog, setShowDialog] = useState(open);

  useEffect(() => {
    setShowDialog(open);
  }, [open]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowDialog(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  if (!open) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-800/70 backdrop-blur-sm">
        <div className="relative mx-auto my-6 h-full w-full md:h-auto md:w-4/6 lg:h-auto lg:w-3/6 xl:w-2/5">
          <div
            className={cn(
              "translate h-full duration-300",
              showDialog ? "opacity-100" : "opacity-0",
              showDialog ? "translate-y-0" : "translate-y-full",
            )}
          >
            <div className="translate relative flex h-full w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none md:h-auto lg:h-auto">
              <div className="relative flex items-center justify-center rounded-t border-b p-6">
                <button
                  className="absolute left-9 rounded-lg border-0 p-1 transition hover:bg-muted"
                  onClick={handleClose}
                >
                  <XIcon size={18} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              <div className="relative flex-auto p-6">{body}</div>
              <div className="flex flex-col gap-2 p-6">
                <div
                  className="
                    flex 
                    w-full 
                    flex-row 
                    items-center 
                    gap-4
                  "
                >
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      disabled={disabled}
                      onClick={handleSecondaryAction}
                      variant="outline"
                      className="w-full"
                    >
                      {secondaryActionLabel}
                    </Button>
                  )}
                  <Button
                    disabled={disabled}
                    onClick={handleSubmit}
                    className="w-full"
                  >
                    {disabled ? (
                      <div className="flex items-center justify-center">
                        <LoaderIcon className="h-4 w-4 animate-spin" />
                      </div>
                    ) : (
                      actionLabel
                    )}
                  </Button>
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
