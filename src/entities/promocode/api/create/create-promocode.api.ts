import { apiClient } from "@/shared/config/apiClient";

export const createPromocode = async (data: {
  code: string;
  usageCount: number;
  maxUsage: number;
  discount: number;
}): Promise<any> => {
  const response = await apiClient.post("/promocodes", data);
  return response.data;
};
