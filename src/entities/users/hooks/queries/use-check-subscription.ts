import { useAuthStore } from "@/entities/auth/store/use-auth-store";
import { apiClient } from "@/shared/config/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useCheckSubscription = (chatId?: string) => {
  const removeRole = useAuthStore((state) => state.removeRole);
  const removeChatId = useAuthStore((state) => state.removeChatId);

  return useQuery({
    queryKey: ["subscription-status", chatId],
    enabled: !!chatId,
    queryFn: async () => {
      try {
        const response = await apiClient.get(
          `/user/subscription-status/${chatId}`
        );
        return response.data;
      } catch (error: any) {
        if (error.response?.status === 404) {
          removeRole();
          removeChatId();
        }
        throw error; // пробрасываем ошибку для react-query
      }
    },
  });
};
