import { create } from "zustand";

type SignUpDialogState = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const useSignUpDialog = create<SignUpDialogState>((set) => ({
  open: false,
  onOpenChange: (open) => set({ open }),
}));
