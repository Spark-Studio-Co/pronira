// hooks/useDeletePromocode.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePromocode } from "../../api/delete/delete-promocode.api";

export const useDeletePromocode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePromocode(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promocodes"] });
    },
  });
};
