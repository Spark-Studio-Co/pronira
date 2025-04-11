import { apiClient } from "@/shared/config/apiClient";

export const getPromocodes = async (): Promise<any[]> => {
  const response = await apiClient.get("/promocodes");
  return response.data;
};
