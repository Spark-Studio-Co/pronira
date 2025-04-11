import { apiClient } from "@/shared/config/apiClient";

export const getAdminMe = async () => {
  console.log("Sending getAdminMe request..."); // 👈

  const response = await apiClient.get("/admin/me");
  return response.data;
};
