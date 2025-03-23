import { apiClient } from "@/shared/config/apiClient";

export const getUser = (chatId: string): Promise<any> => {
  return apiClient.get(`/user/${chatId}`);
};
