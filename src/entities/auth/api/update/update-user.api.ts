import { apiClient } from "@/shared/config/apiClient";
import { UpdateUserDTO } from "./dto/update-user.dto";

export const updateUser = (data: UpdateUserDTO) => {
  return apiClient.patch(`/user/${data.chatId}`, data);
};
