import { apiClient } from "@/shared/config/apiClient";

export const getUsers = async (): Promise<any[]> => {
  const response = await apiClient.get("/user");
  return response.data;
};
