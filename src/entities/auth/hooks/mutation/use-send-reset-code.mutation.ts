import {
  sendResetCode,
  SendResetCodeDto,
} from "./../../api/post/send-reset-code.api";
import { useMutation } from "@tanstack/react-query";

export const useSendCode = () => {
  return useMutation({
    mutationFn: (data: SendResetCodeDto) => sendResetCode(data),
  });
};
