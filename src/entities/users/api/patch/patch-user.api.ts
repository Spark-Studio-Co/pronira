import { apiClient } from "@/shared/config/apiClient";

export const patchUser = async (id: string, data: any): Promise<any> => {
  const response = await apiClient.patch(`/user/${id}`, data);
  return response.data;
};
