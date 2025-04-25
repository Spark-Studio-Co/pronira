import { parserApiClient } from "@/shared/config/apiClient";

export interface SendResetCodeDto {
  userId: string;
}

export const sendResetCode = async (dto: SendResetCodeDto) => {
  const { data } = await parserApiClient.post("/bot/send-reset-code", dto);
  return data;
};
