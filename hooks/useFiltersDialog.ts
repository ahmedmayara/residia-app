import { create } from "zustand";

type FiltersDialogState = {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export const useFiltersDialog = create<FiltersDialogState>((set) => ({
  open: false,
  onOpenChange: (open) => set({ open }),
}));
