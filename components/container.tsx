"use client";

import React from "react";

import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function Container({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const params = useParams();

  const id = params?.id;
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1800px] px-4 sm:px-6 md:px-8",
        pathname === `/listings/${id}` ? "max-w-[1200px]" : "",
      )}
    >
      {children}
    </div>
  );
}
