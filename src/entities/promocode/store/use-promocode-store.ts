"use client";

import { create } from "zustand";

interface PromoCodeState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const usePromoCodeStore = create<PromoCodeState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
