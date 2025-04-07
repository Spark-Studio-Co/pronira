import { useMutation } from "@tanstack/react-query";
import { ILoginDto } from "../../api/post/dto/login.dto";
import { login } from "../../api/post/login.api";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: ILoginDto) => login(data),
  });
};
