import { apiClient } from "@/shared/config/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useCheckSubscription = (chatId?: string) => {
  return useQuery({
    queryKey: ["subscription-status", chatId],
    enabled: !!chatId,
    queryFn: async () => {
      const response = await apiClient.get(
        `/user/subscription-status/${chatId}`
      );
      return response.data;
    },
  });
};
