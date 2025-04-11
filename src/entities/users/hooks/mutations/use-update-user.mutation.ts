import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchUser } from "../../api/patch/patch-user.api";

export const usePatchUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      patchUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
