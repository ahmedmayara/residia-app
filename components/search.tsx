"use client";

import { useFiltersDialog } from "@/hooks/useFiltersDialog";
import { SearchIcon } from "lucide-react";
import React from "react";

export function Search() {
  const filtersDialog = useFiltersDialog();
  return (
    <div
      className="hidden cursor-pointer rounded-full border py-2 shadow-sm transition-all hover:shadow-md lg:block lg:w-auto"
      onClick={() => filtersDialog.onOpenChange(true)}
    >
      <div className="flex flex-row items-center justify-between">
        <h2 className="truncate px-6 text-sm font-medium">Anywhere</h2>
        <div className="hidden flex-1 border-x px-6 text-center text-sm font-medium sm:block">
          <h2 className="truncate">Any week</h2>
        </div>
        <div className="flex flex-row items-center gap-3 pl-6 pr-4">
          <h2 className="truncate text-center text-sm font-medium text-muted-foreground">
            Add guests
          </h2>
          <div className="rounded-full bg-blue-900 p-2 text-white">
            <SearchIcon className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
