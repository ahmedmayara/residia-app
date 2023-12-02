import { create } from "zustand";

type SignInDialogState = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const useSignInDialog = create<SignInDialogState>((set) => ({
  open: false,
  onOpenChange: (open) => set({ open }),
}));
