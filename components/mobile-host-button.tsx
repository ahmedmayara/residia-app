"use client";

import React from "react";

import { User } from "@prisma/client";
import { PlusCircleIcon } from "lucide-react";

import { useHostDialog } from "@/hooks/useHostDialog";
import { useSignInDialog } from "@/hooks/useSignInDialog";

import { Button } from "@/components/ui/button";

interface MobileHostButtonProps {
  currentUser: User | null;
}

export function MobileHostButton({ currentUser }: MobileHostButtonProps) {
  const hostDialog = useHostDialog();
  const signInDialog = useSignInDialog();

  const handleClick = () => {
    if (!currentUser) {
      signInDialog.onOpenChange(true);
      return;
    }

    hostDialog.onOpenChange(true);
  };
  return (
    <Button
      className="h-[50px] w-[50px] rounded-full lg:hidden"
      variant="outline"
      size="icon"
      onClick={handleClick}
    >
      <PlusCircleIcon className="h-7 w-7 fill-blue-900 text-white" />
    </Button>
  );
}
