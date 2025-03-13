import { create } from "zustand";

interface ProfilePopupState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useInstructionPopupStore = create<ProfilePopupState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
