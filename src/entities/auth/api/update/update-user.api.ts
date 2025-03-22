import { apiClient } from "@/shared/config/apiClient";

export const updateUser = (data: any) => {
  return apiClient.patch("/parser/send-link", { data });
};
