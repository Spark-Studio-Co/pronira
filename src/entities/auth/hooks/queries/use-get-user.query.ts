import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/get/get-user.api";

export const useGetUser = (chatId: string | null) => {
  return useQuery({
    queryKey: ["me", chatId],
    queryFn: ({ queryKey }) => {
      const [_key, id] = queryKey;
      return getUser(id as string);
    },
    staleTime: 1000 * 60 * 10,
    retry: 2,
  });
};
