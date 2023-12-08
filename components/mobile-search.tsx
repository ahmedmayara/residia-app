"use client";

import React from "react";

import { useFiltersDialog } from "@/hooks/useFiltersDialog";
import { SearchIcon } from "lucide-react";

export function MobileSearch() {
  const filtersDialog = useFiltersDialog();
  return (
    <div
      className="w-full cursor-pointer rounded-full border py-2 shadow-sm transition-all hover:shadow-md lg:hidden"
      onClick={() => filtersDialog.onOpenChange(true)}
    >
      <div className="flex flex-row items-center">
        <div className="flex flex-row items-center gap-2 pl-6">
          <div className="rounded-full bg-blue-900 p-2 text-white">
            <SearchIcon className="h-4 w-4" />
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="truncate px-6 text-sm font-medium">Anywhere</h2>
          <div className="flex gap-x-2 px-6">
            <h2 className="truncate text-xs text-muted-foreground">Any week</h2>
            <h2 className="truncate text-xs text-muted-foreground">·</h2>
            <h2 className="truncate text-xs text-muted-foreground">
              Any guests
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
