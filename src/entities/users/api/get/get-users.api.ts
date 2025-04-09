import { apiClient } from "@/shared/config/apiClient";

export const getUsers = async (): Promise<any[]> => {
  const response = await apiClient.get("/admin/users");
  return response.data;
};
