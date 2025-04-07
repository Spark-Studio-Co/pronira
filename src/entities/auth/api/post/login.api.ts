import { apiClient } from "@/shared/config/apiClient";
import { ILoginDto } from "./dto/login.dto";

export const login = async (data: ILoginDto): Promise<any> => {
  const response = await apiClient.post(`/auth/login`, data);
  return response.data;
};
