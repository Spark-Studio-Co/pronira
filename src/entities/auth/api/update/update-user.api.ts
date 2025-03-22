import { apiClient } from "@/shared/config/apiClient";

export const updateUser = (data: any) => {
  return apiClient.patch(`/user/${data.id}`, data);
};
