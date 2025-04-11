// hooks/usePatchPromocode.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchPromocode } from "../../api/patch/patch-promocode.api";

export const usePatchPromocode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      patchPromocode(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promocodes"] });
    },
  });
};
