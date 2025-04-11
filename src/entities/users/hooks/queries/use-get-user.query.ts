// hooks/useGetUser.ts
import { getUser } from "@/entities/auth/api/get/get-user.api";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });
};
