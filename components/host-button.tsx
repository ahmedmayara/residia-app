"use client";

import React from "react";

import { User } from "@prisma/client";

import { useHostDialog } from "@/hooks/useHostDialog";
import { useSignInDialog } from "@/hooks/useSignInDialog";

import { Button } from "@/components/ui/button";

interface MobileHostButtonProps {
  currentUser: User | null;
}

export function HostButton({ currentUser }: MobileHostButtonProps) {
  const signInDialog = useSignInDialog();
  const hostDialog = useHostDialog();

  const handleOpenHostDialog = () => {
    if (!currentUser) {
      signInDialog.onOpenChange(true);
      return;
    }

    hostDialog.onOpenChange(true);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="rounded-full"
      onClick={handleOpenHostDialog}
    >
      Become a host
    </Button>
  );
}
