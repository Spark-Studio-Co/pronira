import { apiClient } from "@/shared/config/apiClient";

interface ApplyPromocodeRequest {
  code: string;
  amount: number;
}

export const applyPromocode = async (
  data: ApplyPromocodeRequest
): Promise<any> => {
  const response = await apiClient.post("/promocodes/apply", data);
  return response.data;
};
