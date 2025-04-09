import { apiClient } from "@/shared/config/apiClient";
import { IAdminLoginDto } from "../dto/login.dto";

export const adminLogin = async (data: IAdminLoginDto): Promise<any> => {
  const response = await apiClient.post(`/auth/login`, data);
  return response.data;
};
