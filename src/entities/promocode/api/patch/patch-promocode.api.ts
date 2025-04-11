import { apiClient } from "@/shared/config/apiClient";

export const patchPromocode = async (id: string, data: any): Promise<any> => {
  const response = await apiClient.patch(`/promocodes/${id}`, data);
  return response.data;
};
