import { parserApiClient } from "@/shared/config/apiClient";
import { useMutation } from "@tanstack/react-query";

interface StartByChatDto {
  chatId: string | number;
}

export const useStartParsersByChatId = () => {
  return useMutation({
    mutationFn: async (chatId: string | number) => {
      const { data } = await parserApiClient.post("/start-by-chat", {
        chatId: chatId,
      });
      return data;
    },
  });
};
