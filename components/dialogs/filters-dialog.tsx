"use client";

import React from "react";

import { Dialog } from "./dialog";
import { useFiltersDialog } from "@/hooks/useFiltersDialog";

export function FiltersDialog() {
  const filtersDialog = useFiltersDialog();
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <Dialog
      open={filtersDialog.open}
      disabled={isLoading}
      title="Filters"
      actionLabel="Apply"
      onSubmit={() => {}}
      onClose={() => filtersDialog.onOpenChange(false)}
    />
  );
}
