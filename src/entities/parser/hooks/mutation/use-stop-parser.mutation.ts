import { apiClient, parserApiClient } from "@/shared/config/apiClient";
import { useMutation } from "@tanstack/react-query";

export const useStopByChatId = () => {
  return useMutation({
    mutationFn: async (chatId: string) => {
      const response = await parserApiClient.post("/parser/stop-by-chat", {
        chatId,
      });
      return response.data;
    },
  });
};
