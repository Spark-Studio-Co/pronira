import { apiClient } from "@/shared/config/apiClient";

export const deletePromocode = async (id: string): Promise<any> => {
  const response = await apiClient.delete(`/promocodes/${id}`);
  return response.data;
};
