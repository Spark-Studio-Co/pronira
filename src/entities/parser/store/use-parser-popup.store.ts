import { create } from "zustand";

interface ParserPopupState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useParserPopupStore = create<ParserPopupState>((set) => ({
  isOpen: true,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
