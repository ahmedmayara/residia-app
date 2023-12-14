"use client";

import React from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { FaGhost } from "react-icons/fa";

interface EmptyStateProps {
  title: string;
  description: string;
  showResetButton?: boolean;
}

export function EmptyState({
  title,
  description,
  showResetButton = false,
}: EmptyStateProps) {
  const router = useRouter();
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center gap-2">
      <FaGhost className="h-16 w-16 text-muted-foreground" />
      <h1 className="pt-1 text-2xl font-semibold text-foreground">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
      {showResetButton && (
        <Button
          className="mt-2"
          size="sm"
          variant="outline"
          onClick={() => router.push("/")}
        >
          Go back
        </Button>
      )}
    </div>
  );
}
