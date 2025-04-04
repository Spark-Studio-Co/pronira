import { create } from "zustand";

interface ParserPopupState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useParserPopupStore = create<ParserPopupState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
