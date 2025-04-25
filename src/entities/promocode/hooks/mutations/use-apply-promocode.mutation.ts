import { useMutation } from "@tanstack/react-query";
import { applyPromocode } from "../../api/create/apply-promocode.api";

export const useApplyPromocode = () => {
  return useMutation({
    mutationFn: applyPromocode,
  });
};
