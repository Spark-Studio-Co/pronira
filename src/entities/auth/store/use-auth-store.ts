import reactQueryClient from "@/shared/api/query-client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  role: string | null;
  chatId: string | null;
  saveRole: (role: string) => void;
  removeRole: () => void;
  saveChatId: (id: string) => void;
  removeChatId: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      role: null,
      chatId: null,

      saveRole: (role: string) => {
        set({ role });
      },

      removeRole: () => {
        set({ role: null });

        setTimeout(() => {
          localStorage.removeItem("role");
          localStorage.setItem(
            "auth-storage",
            JSON.stringify({ state: get(), version: 0 })
          );
        }, 0);

        reactQueryClient.resetQueries();
        reactQueryClient.clear();
      },

      saveChatId: (id: string) => set({ chatId: id }),

      removeChatId: () => set({ chatId: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        role: state.role,
        chatId: state.chatId,
      }),
    }
  )
);
