import { apiClient } from "@/shared/config/apiClient";
import { UpdateUserDTO } from "./dto/update-user.dto";

export const updateUser = (data: UpdateUserDTO) => {
  console.log("data is here:", data);
  return apiClient.patch(`/user/${data.chatId}`, data);
};
