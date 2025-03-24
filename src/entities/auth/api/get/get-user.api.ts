import { apiClient } from "@/shared/config/apiClient";
import { IGetUserDto } from "./dto/get-user.dto";

export const getUser = async (chatId: string): Promise<IGetUserDto> => {
  const response = await apiClient.get(`/user/${chatId}`);
  return response.data;
};
