// hooks/useGetPromocodes.ts
import { useQuery } from "@tanstack/react-query";
import { getPromocodes } from "../../api/get/get-promocodes.api";

export const useGetPromocodes = () => {
  return useQuery({
    queryKey: ["promocodes"],
    queryFn: getPromocodes,
  });
};
