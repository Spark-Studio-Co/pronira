import { apiClient } from "@/shared/config/apiClient";

export const deleteUser = async (id: string): Promise<any> => {
  const response = await apiClient.delete(`/user/${id}`);
  return response.data;
};
