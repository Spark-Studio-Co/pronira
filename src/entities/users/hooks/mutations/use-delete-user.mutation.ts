// hooks/useDeleteUser.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../api/delete/delete-user.api";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
