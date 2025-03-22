import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../api/update/update-user.api";

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: (data: any) => updateUser(data),
  });
};
