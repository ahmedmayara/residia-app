import { create } from "zustand";

type HostDialogState = {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export const useHostDialog = create<HostDialogState>((set) => ({
  open: false,
  onOpenChange: (open) => set({ open }),
}));
