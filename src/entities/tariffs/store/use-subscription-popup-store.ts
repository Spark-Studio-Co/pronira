import { create } from "zustand";

interface SubscriptionPopupStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useSubscriptionPopupStore = create<SubscriptionPopupStore>(
  (set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
  })
);
