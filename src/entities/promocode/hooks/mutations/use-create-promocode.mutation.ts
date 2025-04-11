// hooks/useCreatePromocode.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPromocode } from "../../api/create/create-promocode.api";

export const useCreatePromocode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPromocode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promocodes"] });
    },
  });
};
