import { apiClient } from "@/shared/config/apiClient";
import { useMutation } from "@tanstack/react-query";

interface ResetPasswordDto {
  userId: string;
  resetCode: string;
  newPassword: string;
}

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (dto: ResetPasswordDto) => {
      const { data } = await apiClient.post("/auth/reset-password", dto);
      return data;
    },
  });
};
